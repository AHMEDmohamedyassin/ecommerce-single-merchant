<?php

namespace App\Http\Controllers\UserExperience;

use App\Exceptions\CustomException;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Setting\SettingController;
use App\Models\Collection;
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
        $collection = Collection::find($review->collection_id);
        $collection->update([
            'ratting' => $collection->reviews > 1 ? abs(( ( $collection->ratting * $collection->reviews ) - $review->ratting ) / ( $collection->reviews - 1 )) : 0 ,
            'reviews' => $collection->reviews ? $collection->reviews - 1 : 0
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
                'id' => 'required|exists:collections,id'
            ]);

            $collection = Collection::find(request('id'));

            // check if user have paid for any product of the collection
            $hasPaidForProduct = request('user')->order()->whereHas('product', function ($query) use ($collection) {
                $query->where('collection_id', $collection->id);
            })->exists();


            if(!$hasPaidForProduct)
                throw new CustomException('product not paid by user' , 21);

            // check if user have reviewed the product before
            if(request('user')->review()->where('collection_id' , request('id'))->count())
                throw new CustomException('product has been reviewed before' , 20);

            // check setting if it set to auto publish review without admin checking content of review it
            $publish_review = (new SettingController() )->valueSetting('auto_public_review');

            // creating review for the product 
            $review = request('user')->review()->create(array_merge($req , [
                'collection_id' => request('id'),
                'slug' => $this->MultiTextSlug(request('ratting') , request('comment')),
                'public' => (int) $publish_review
            ]));

            // updating product average reviews
            $collection->update([
                'ratting' => ( ( $collection->ratting * $collection->reviews ) + request('ratting') ) / ( $collection->reviews + 1 ) ,
                'reviews' => $collection->reviews + 1
            ]);

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

            $review = request('user')->review()->with('collection')->where('reviews.id' , request('id'))->first();

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

            $reviews = request('user')->review()->orderBy('reviews.id' , 'desc')->with('collection');

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
                'id' => 'required|exists:collections,id'
            ]);

            $reviews = Collection::find(request("id"))
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

            $reviews = Review::query()->with('user')->with('collection');

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

            $review = Review::find(request('id'))->load('collection');

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
