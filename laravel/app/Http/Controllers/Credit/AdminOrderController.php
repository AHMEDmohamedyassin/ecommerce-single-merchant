<?php

namespace App\Http\Controllers\Credit;

use App\Exceptions\CustomException;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use App\Traits\PaginateTrait;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdminOrderController extends Controller
{
    use ResponseTrait , PaginateTrait;

    // "user_id" , 
    // "shipping_address_id" , 
    // "billing_address_id" , 
    // "coupon_id" , 
    // "cart_total" , 
    // "currency" , 
    // "pay_on_diliver" , 
    // "status" , 


    /**
     * @error 14001
     * Admin Creating Order
     * pay_on_diliver always true : as admin creates order for user pay form store or wants order to be sent to home
     * status : preparing -> for home delivery , success -> for store order 
     */
    public function CreateOrder(){
        try{
            $req = request()->validate([
                "user_id" => "nullable|exists:users,id" , 
                "shipping_address_id" => "nullable|exists:addresses,id" , 
                "billing_address_id" => "nullable|exists:store_addresses,id" , 
                // "pay_on_diliver" => "boolean|nullable", 
                // "status" => "in:pending,ready,preparing,success,canceled,canceled without refund", 
                "status" => "in:preparing,success", 
                "coupon" => "nullable" , 
                "products" => "array|required" ,
                "products.*" => "array" ,
                "products.*.id" => "required|exists:products,id|numeric" ,
                "products.*.price" => "required|numeric" ,
                "products.*.quantity" => "required|numeric" , 
                "additional" => "array|nullable" ,
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
                "status" => request('status'),
                "pay_on_diliver" => true ,
                "cart_total" => $cart_total < 0 ? 0 : $cart_total
            ]);

            // attach products to order
            $order->product()->attach($sync_data);


            // save additional content to json file related to order
            if(request()->has('additional'))
                Storage::put("/orders/{$order->id}/json.json" , json_encode(request('additional')));

            // adjusting response data
            $order['additional'] = request('additional');
            $order['product'] = request('products');

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
                "status" => "required|in:pending,ready,preparing,success,canceled,canceled without refund", 
            ]);

            $order = Order::find(request('id'))->update([
                'status' => request('status')
            ]);
            
            return $this->SuccessResponse($order);
        }catch(\Exception $e){
            return $this->ErrorResponse(14001 , $e->getCode() , $e->getMessage());
        }
    }

}
