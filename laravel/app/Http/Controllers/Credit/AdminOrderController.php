<?php

namespace App\Http\Controllers\Credit;

use App\Events\OrderCancelEvent;
use App\Events\OrderReadyEvent;
use App\Exceptions\CustomException;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Setting\SettingController;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use App\Traits\PaginateTrait;
use App\Traits\ResponseTrait;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Storage;

class AdminOrderController extends Controller
{
    use ResponseTrait , PaginateTrait;

    /**
     * @error 14001
     * Admin Creating Order
     * pay_on_diliver always true : as admin creates order for user pay form store or wants order to be sent to home
     * status : preparing -> for home delivery , success -> for store order 
     */
    public function CreateOrder(){
        try{
            // check if cachier option is allowed
            if(!(new SettingController)->valueSetting('allow_cachier'))
                throw new CustomException('cachier not allowed' , 32);

            $req = request()->validate([
                "user_id" => "nullable|exists:users,id" , 
                "shipping_address_id" => "nullable|exists:addresses,id" , 
                "billing_address_id" => "nullable|exists:store_addresses,id" , 
                // "pay_on_diliver" => "boolean|nullable", 
                // "status" => "in:pending,ready,preparing,success,canceled,canceled without refund", 
                "status" => "in:preparing,success", 
                "coupon" => "nullable" , 
                "products" => "required_without:additional|array" ,
                "products.*" => "array" ,
                "products.*.id" => "required|exists:products,id|numeric" ,
                "products.*.price" => "required|numeric" ,
                "products.*.quantity" => "required|numeric" , 
                "additional" => "required_without:products|array" ,
                "additional.*" => "array" ,
                "additional.*.price" => "numeric|required" ,
                "additional.*.quantity" => "numeric|required" ,
            ]);

            // check if provided address related to user AND check if address provided without user id provided
            if(( request()->has('user_id') && request()->has('shipping_address_id') ) && !User::find(request('user_id'))->address()->find(request('shipping_address_id')))
                throw new CustomException('address not found' , 11);
            if(!request()->has('user_id') && request()->has('shipping_address_id'))
                throw new CustomException('user id required' , 14);

            // initial variables values
            $cart_total = 0;
            $sync_data = [];

            // preparing cart total and sync product data to be recorded in product_order
            foreach(request('products' , []) as $product){
                $id = $product['id'];

                // check if order product quantity is larger than available
                $product_database = Product::find($id);
                if($product_database->quantity < $product['quantity'])
                    throw new CustomException('order quantity of products is larger than available' , 17);

                unset($product['id']);
                $sync_data[$id] = $product;
                $cart_total += $product['price'] * $product['quantity'];
            }

            // preparing cart total from addtional items
            foreach(request('additional' , []) as $item)
                $cart_total += $item['price'] * $item['quantity'];

            // checking coupon if provided
            $coupon = (new CouponController)->UseCoupon(request('coupon') , request('user_id'));
            if($coupon)
                $cart_total -= $coupon->value;
            
            // creating order
            $order = Order::create([
                "user_id" => request('user_id'),
                "shipping_address_id" => request('shipping_address_id'),
                "billing_address_id" => request('billing_address_id'),
                "coupon_id" => $coupon ? $coupon->id : null,
                "pay_on_diliver" => true ,
                "cart_total" => $cart_total < 0 ? 0 : $cart_total
            ]);

            // attach products to order
            $order->product()->attach($sync_data);


            // save additional content to json file related to order
            if(request()->has('additional'))
                Storage::put("/orders/{$order->id}/json.json" , json_encode(request('additional')));

            // order event ready fire
            Event::dispatch(new OrderReadyEvent($order , request('status')));

            // adjusting response data
            $order['additional'] = request('additional');
            $order['product'] = request('products');


            // update orders count
            SettingController::updateCreateSetting(SettingController::$orders_count);

            return $this->SuccessResponse($order);
        }catch(\Exception $e){
            return $this->ErrorResponse(14001 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * @error 14002
     * update order status
     */
    public function StatusOrder () {
        try{
            request()->validate([
                "id" => "required|exists:orders,id" ,
                "status" => "required|in:ready,preparing,success,canceled,canceled without refund", 
            ]);

            $order = Order::find(request('id'));

            // events handle 
            if(in_array(request('status') , ["canceled","canceled without refund"]))
                Event::dispatch(new OrderCancelEvent($order , request('status')));
            else
                Event::dispatch(new OrderReadyEvent($order , request('status')));
            
            return $this->SuccessResponse($order);
        }catch(\Exception $e){
            return $this->ErrorResponse(14002 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * @error 14003
     * listing orders
     */
    public function ListOrder () {
        try {
            request()->validate([
                'status' => "nullable|in:pending,ready,preparing,success,canceled,canceled without refund,all" , 
                'orderby' => "nullable|in:status,quantity,cart_total,pay_on_diliver,id,created_at,updated_at",
                "desc" => "in:desc,asc"
            ]);

            $orders = Order::query();

            if(request()->has("status") && request('status') != 'all') $orders->where('status' , request('status'));
            
            $orders->with('user')->with('store_address')->with('address')->with('coupon');
            $orders->orderby(request('orderby' , 'id') , request('desc', 'desc'));

            return $this->SuccessResponse($this->paginate($orders));
        }catch(\Exception $e){
            return $this->ErrorResponse(14003 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * @error 14004
     * read order details with its products and coupons
     */
    public function ReadOrder () {
        try{
            request()->validate([
                'id' => 'required|exists:orders,id'
            ]);

            // getting order with all related data
            $order = Order::with(['product' => function ($query) {
                $query->withTrashed();
            } , 'product.collection' => function ($query) {
                $query->withTrashed();
            } , 'coupon' , 'user' , 'address' , 'store_address' , 'transaction'])->find(request('id'));
            

            // getting additional informations in json file
            $path = "/orders/{$order->id}/json.json";
            if(Storage::exists($path))
                $order['additional'] = json_decode(Storage::read($path));

            return $this->SuccessResponse($order);
        }catch(\Exception $e){
            return $this->ErrorResponse(14004 , $e->getCode() , $e->getMessage());
        }
    }

}
