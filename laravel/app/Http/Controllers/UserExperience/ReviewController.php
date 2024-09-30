<?php

namespace App\Http\Controllers\UserExperience;

use App\Exceptions\CustomException;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Setting\SettingController;
use App\Models\Order;
use App\Models\Product;
use App\Models\Review;
use App\Traits\PaginateTrait;
use App\Traits\ResponseTrait;
use App\Traits\SlugTrait;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    use ResponseTrait , SlugTrait , PaginateTrait;


    // updating product average reviews ( subtraction review from the average )
    public function ProductDecreaseReview($review) {
        $product = Product::find($review->product_id);
        $product->update([
            'ratting' => $product->reviews > 1 ? abs(( ( $product->ratting * $product->reviews ) - $review->ratting ) / ( $product->reviews - 1 )) : 0 ,
            'reviews' => $product->reviews ? $product->reviews - 1 : 0
        ]);
    }


    /**
     * @error 11001
     * creating review by user
     */
    public function CreateReview () {
        try{
            $req = request()->validate([
                'comment' => 'string|max:255',
                'ratting' => 'required|numeric|in:1,2,3,4,5',
                'id' => 'required|exists:products,id'
            ]);

            // check if user paid for the product
            $productId = request('id'); // Assuming this is the product ID
            $hasPaidForProduct = Order::where('user_id', request('user')->id)->where('status', 'success') 
                ->whereHas('product', function ($query) use ($productId) {
                    $query->where('products.id', $productId);
                })->exists();


            if(!$hasPaidForProduct)
                throw new CustomException('product not paid by user' , 21);

            // check if user have reviewed the product before
            if(request('user')->review()->where('product_id' , request('id'))->count())
                throw new CustomException('product has been reviewed before' , 20);

            // check setting if it set to auto publish review without admin checking content of review it
            $publish_review = (new SettingController() )->valueSetting('auto_public_review');

            // creating review for the product 
            $review = request('user')->review()->create($req + [
                'product_id' => request('id'),
                'slug' => $this->MultiTextSlug(request('ratting') , request('comment')),
                'public' => (int) $publish_review
            ]);

            // updating product average reviews
            $product = Product::find(request('id'));
            $product->update([
                'ratting' => ( ( $product->ratting * $product->reviews ) + request('ratting') ) / ( $product->reviews + 1 ) ,
                'reviews' => $product->reviews + 1
            ]);

            // $reviews = request('user')->review()->with('product')->orderby('reviews.id' , 'desc');

            // record reviews count
            SettingController::updateCreateSetting(SettingController::$reviews_count);

            return $this->SuccessResponse($review);
        }catch(\Exception $e){
            return $this->ErrorResponse(11001 , $e->getCode() , $e->getMessage());
        }
    }

    

    /**
     * @error 11002
     * delete review by user
     */
    public function DeleteReview () {
        try{
            request()->validate([
                'id' => 'required|exists:reviews,id'
            ]);

            $review = request('user')->review()->where('reviews.id' , request('id'))->first()->load('product');

            $review->delete();

            // updating average product reviews
            $this->ProductDecreaseReview($review);

            // record reviews count
            SettingController::updateCreateSetting(SettingController::$reviews_count , false);

            return $this->SuccessResponse($review);
        }catch(\Exception $e){
            return $this->ErrorResponse(11002 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * @error 11003
     * list reviews owned by user
     */
    public function ListReview () {
        try{

            $reviews = request('user')->review()->orderBy('reviews.id' , 'desc');

            return $this->SuccessResponse($this->paginate($reviews));
        }catch(\Exception $e){
            return $this->ErrorResponse(11003 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * @error 11004
     * admin List Product review
     * @Admin
     */
    public function ListProductReview () {
        try{
            request()->validate([
                'id' => 'required|exists:products,id'
            ]);

            $reviews = Product::find(request("id"))
                        ->review()->where('public' , 1)
                        ->orderby('reviews.id' , 'desc');

            return $this->SuccessResponse($this->paginate($reviews));
        }catch(\Exception $e){
            return $this->ErrorResponse(11004 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * @error 11005
     * admin List review
     * @Admin
     */
    public function AdminListReview () {
        try{
            request()->validate(['search' => 'nullable|string']);

            $reviews = Review::query()->with('user')->with('product');

            if(request()->has('search'))
                $reviews->where('slug' , 'LIKE' , '%'.request('search').'%');

            $reviews->orderBy('reviews.id' , 'desc');

            return $this->SuccessResponse($this->paginate($reviews));
        }catch(\Exception $e){
            return $this->ErrorResponse(11005 , $e->getCode() , $e->getMessage());
        }
    }



    /**
     * @error 11006
     * admin makes review public or hidden review
     * @Admin
     */
    public function AdminPublishReview () {
        try{
            request()->validate([
                'id' => 'required|exists:reviews,id' , 
            ]);

            $review = Review::find(request('id'));

            $review->update([
                'public' => !$review->public
            ]);

            return $this->SuccessResponse($review);
        }catch(\Exception $e){
            return $this->ErrorResponse(11006 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * @error 11007
     * admin Delete review
     * @Admin
     */
    public function AdminDeleteReview () {
        try{
            request()->validate(['id' => 'required|exists:reviews,id']);

            $review = Review::find(request('id'))->load('product');

            $review->delete();

            // updating average product reviews
            $this->ProductDecreaseReview($review);

            // record reviews count
            SettingController::updateCreateSetting(SettingController::$reviews_count , false);

            return $this->SuccessResponse($review);
        }catch(\Exception $e){
            return $this->ErrorResponse(11007 , $e->getCode() , $e->getMessage());
        }
    }



}
