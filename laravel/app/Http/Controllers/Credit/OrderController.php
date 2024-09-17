<?php

namespace App\Http\Controllers\Credit;

use App\Exceptions\CustomException;
use App\Http\Controllers\Controller;
use App\Http\Controllers\UserExperience\CartController;
use App\Models\Order;
use App\Models\User;
use App\Traits\ResponseTrait;
use Carbon\Carbon;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    use ResponseTrait;


    /**
     * @error 13001
     * create order by user
     */
    public function UserCreateOrder () {
        try{
            request()->validate([
                "shipping_address_id" => "nullable|exists:addresses,id|numeric" ,
                "pay_on_diliver" => "boolean|nullable" ,
                "coupon" => "nullable|string"
            ]);

            // getting products in cart to add it to order and then delete it from cart 
            $cart = request('user')->cart;
            request('user')->cart()->sync([]);

            // handle data
            $data = [];
            $sync_data = [];
            $cart_total = 0;

            foreach($cart as $item){
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

            // creating order
            $order = request('user')->order()->create([
                "cart_total" => $cart_total, 
                "status" =>  request('pay_on_diliver') ? 'ready' : 'pending', 
                "pay_on_diliver" => request('pay_on_diliver') ?? 0 , 
                "shipping_address_id" => request('shipping_address_id')  
            ]);
            
            // syncing products to order
            $order->product()->sync($sync_data);

            // adds products to return order data
            $order['products'] = $data;

            return $this->SuccessResponse($order);
        }catch(\Exception $e){
            return $this->ErrorResponse(13001 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * @error 13001
     * cancel order by user
     * canceling orders only with status ( pending or ready )
     */
    public function UserCancelOrder () {
        try{
            request()->validate([
                'id' => 'required|exists:orders,id' , 
                'restore_cart' => "boolean"
            ]);

            // getting order and check if it is exists
            $order = request('user')->order()->where(['id' => request('id')])->whereIn('status' , ['pending' , 'ready'])->first();

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

            // change order status to be canceled 
            $order->update([
                'status' => 'canceled'
            ]);

            return $this->SuccessResponse($order);
        }catch(\Exception $e){
            return $this->ErrorResponse(13001 , $e->getCode() , $e->getMessage());
        }
    }


}
