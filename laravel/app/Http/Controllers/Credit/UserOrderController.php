<?php

namespace App\Http\Controllers\Credit;

use App\Events\OrderCancelEvent;
use App\Exceptions\CustomException;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Setting\SettingController;
use App\Jobs\OrderAdminNotification;
use App\Traits\PaginateTrait;
use App\Traits\ResponseTrait;
use Carbon\Carbon;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class UserOrderController extends Controller
{
    use ResponseTrait , PaginateTrait;


    /**
     * @error 13001
     * create order by user
     */
    public function UserCreateOrder () {
        try{
            request()->validate([
                "shipping_address_id" => "required|exists:addresses,id|numeric" ,
                "pay_on_diliver" => "boolean|nullable" ,
                "coupon" => "nullable|string"
            ]);

            // check if the online payment is allowed
            if(!(new SettingController)->valueSetting('allow_paymentgateway')){
                request()->merge([
                    'pay_on_diliver' => true
                ]);
            }

            // getting products in cart to add it to order
            $cart = request('user')->cart;

            // handle data
            $data = [];
            $sync_data = [];
            $cart_total = 0;
            $coupon_id = null;

            foreach($cart as $item){

                if($item->quantity < $item->pivot->quantity)
                    throw new CustomException("order quantity of products is larger than available" , 17 , ["product" => $item->collection->title]);

                // sum total price of order
                $cart_total += $item->price * $item->pivot->quantity;
                // handle return data , and used for payment gateway bills
                $data[] = [
                    'id' => $item->id ,
                    'title' => $item->title ,
                    'price' => $item->price ,
                    'quantity' => $item->pivot->quantity
                ];
                // handle syncing data that will be recorded in database , relate products to order
                $sync_data[$item->id] = [
                    'price' => $item->price ,
                    'quantity' => $item->pivot->quantity , 
                    'created_at' => Carbon::now() ,
                    'updated_at' => Carbon::now() ,
                ];
            }


            // detach products from cart 
            request('user')->cart()->sync([]);


            // checking coupon if provided
            if(request()->has('coupon')){
                $coupon = (new CouponController)->UseCoupon(request('coupon') , request('user')->id);
                if($coupon){
                    $cart_total -= $coupon->value;
                    $coupon_id = $coupon->id;
                }
            }

            // checking if cart total less than zero 
            if($cart_total < 0)
                $cart_total = 0;

            // creating order
            $order = request('user')->order()->create([
                "coupon_id" => $coupon_id ,
                "cart_total" => $cart_total, 
                "status" =>  request('pay_on_diliver') || $cart_total <= 0 ? 'ready' : 'pending', 
                "pay_on_diliver" => request('pay_on_diliver') ?? 0 , 
                "shipping_address_id" => request('shipping_address_id')  
            ]);
            
            // syncing products to order
            $order->product()->sync($sync_data);

            // adds products to return order data
            $order['products'] = $data;

            // update orders count
            SettingController::updateCreateSetting(SettingController::$orders_count);

            // create job of notification
            OrderAdminNotification::dispatch($order);

            return $this->SuccessResponse($order);
        }catch(\Exception $e){
            return $this->ErrorResponse(13001 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * @error 13002
     * cancel order by user
     * canceling orders only with status ( pending or ready )
     * if user will paid for order using payment gateway , the status of order will be ( canceled without refund ) , to make order reviced with admin
     * if user will pay for order after delivery , the status of order will be ( canceled )
     */
    public function UserCancelOrder () {
        try{
            request()->validate([
                'id' => 'required|exists:orders,id' , 
                'restore_cart' => "boolean"
            ]);

            // getting order and check if it is exists
            $order = request('user')->order()
                ->where(['id' => request('id')])->whereIn('status' , ['pending' , 'ready'])->first();

            if(!$order)
                throw new CustomException('order not found or canceled before' , 13);

            // restore order products to cart if needded
            if(request()->has('restore_cart') && request('restore_cart')){
                // getting order products and appending it to user cart
                $order_products = $order->product()->get();
                // looping order products
                foreach($order_products as $product){
                    $product_order_quantity = $product->pivot->quantity;
                    $cart_product = request('user')->cart()->where('products.id' , $product->id);
                    // check if product exists in cart to increase quantity
                    if($cart_product->count())
                        $cart_product->update(['carts.quantity' => $cart_product->first()->pivot->quantity + $product_order_quantity]);
                    else 
                        // if product not found in cart create new one with quantity in the order 
                        request('user')->cart()->attach([
                            $product->id => [
                                'quantity' => $product_order_quantity
                            ]
                        ]);
                }

            }

            // cancel order event 
            Event::dispatch(new OrderCancelEvent($order));

            return $this->SuccessResponse($order);
        }catch(\Exception $e){
            return $this->ErrorResponse(13002 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * @error 13003
     * listing orders of user 
     */
    public function UserListOrder () {
        try{
            $orders = request('user')->order()->orderby('id' , 'desc');

            return $this->SuccessResponse($this->paginate($orders));
        }catch(\Exception $e){
            return $this->ErrorResponse(13003 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * @error 13004
     * reading order data , like products , used coupons 
     */
    public function UserReadOrder () {
        try{
            request()->validate([
                'id' => 'required|exists:orders,id'
            ]);
            
            $order = request('user')->order()
                ->where('orders.id' , request('id'))
                ->with('product.collection')->with('coupon')
                ->first();

            if(!$order)
                throw new CustomException("order not found" , 15);

            // appending additional data to order
            $path = "/orders/{$order->id}/json.json";
            if(Storage::fileExists($path)){
                $additional = Storage::read($path);
                $order['additional'] = json_decode($additional);
            }


            return $this->SuccessResponse($order);
        }catch(\Exception $e){
            return $this->ErrorResponse(13004 , $e->getCode() , $e->getMessage());
        }
    }


}
