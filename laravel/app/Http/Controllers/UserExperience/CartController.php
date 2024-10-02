<?php

namespace App\Http\Controllers\UserExperience;

use App\Exceptions\CustomException;
use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Traits\PaginateTrait;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;

class CartController extends Controller
{
    use ResponseTrait , PaginateTrait;


    /**
     * @error 10001
     * listing favorite products to user
     */
    public function AddToCart () {
        try{
            request()->validate([
                'id' => 'required|exists:products,id'
            ]);

            $cart = request('user')->cart();

            // adding quantity of products in cart if it is previously exists
            $product = $cart->where('products.id' , request('id'));
            if ($product->count()){

                // check if product quantity less than required quantity
                if($product->first()->quantity <= $product->first()->pivot->quantity)
                    throw new CustomException("reached maximum available product quantity" , 18);

                $product->update([
                    'carts.quantity' => $product->first()->pivot->quantity + 1
                ]);
            }
            // attach product to cart if it is not previously exists
            else{

                // check if product quantity less than required quantity
                if(Product::find(request('id'))->quantity <= 0 )
                    throw new CustomException("reached maximum available product quantity" , 18);

                $cart->attach([request('id')]);
            }

            return $this->SuccessResponse($this->paginate(request('user')->cart()->with('collection')->orderby('carts.id' , 'desc')));
        }catch(\Exception $e){
            return $this->ErrorResponse(10001 , $e->getCode() , $e->getMessage());
        }
    }
    

    /**
     * @error 10002
     * listing favorite products to user
     */
    public function SubFromCart () {
        try{
            request()->validate([
                'id' => 'required|exists:products,id'
            ]);

            $cart = request('user')->cart();

            $product = $cart->where('products.id' , request('id'));

            // check if product exists
            if($product->first()){
                $quantity = $product->first()->pivot->quantity;
                // check if quantity is less than one to delete product from cardt
                if($quantity <= 1)
                    $cart->detach([request('id')]);
                // decrease product quantity if it is larger than one
                else
                    $cart->update(['carts.quantity' => $quantity - 1 ]);
            }

            return $this->SuccessResponse($this->paginate(request('user')->cart()->with('collection')->orderby('carts.id' , 'desc')));
        }catch(\Exception $e){
            return $this->ErrorResponse(10002 , $e->getCode() , $e->getMessage());
        }
    }

    /**
     * @error 10003
     * listing favorite products to user
     */
    public function DeleteFromCart () {
        try{
            request()->validate([
                'id' => 'required|exists:products,id'
            ]);

            $cart = request('user')->cart()->with('collection');

            $cart->detach([request('id')]);

            return $this->SuccessResponse($this->paginate($cart->orderby('carts.id' , 'desc')));
        }catch(\Exception $e){
            return $this->ErrorResponse(10003 , $e->getCode() , $e->getMessage());
        }
    }

    /**
     * @error 10004
     * listing favorite products to user
     */
    public function DeleteCart () {
        try{

            request('user')->cart()->sync([]);

            return $this->SuccessResponse();
        }catch(\Exception $e){
            return $this->ErrorResponse(10004 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * @error 10005
     * listing favorite products to user
     */
    public function ListCart () {
        try{
            $cart = request('user')->cart()->with('collection')->orderby('carts.id' , 'desc');

            return $this->SuccessResponse($this->paginate($cart));
        }catch(\Exception $e){
            return $this->ErrorResponse(10005 , $e->getCode() , $e->getMessage());
        }
    }

}
