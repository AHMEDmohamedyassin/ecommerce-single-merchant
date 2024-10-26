<?php

namespace App\Http\Controllers\UserExperience;

use App\Http\Controllers\Controller;
use App\Models\Collection;
use App\Traits\PaginateTrait;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    use ResponseTrait , PaginateTrait;
    
    /**
     * @error 9001
     * attach and detach favorite products to user
     */
    public function SyncFavorite () {
        try{
            request()->validate([
                'id' => 'required|exists:collections,id'
            ]);

            $fav = request('user')->favorite()->with('product');

            $fav->toggle([request('id')]);

            return $this->SuccessResponse($this->paginate($fav->orderby('favorites.id' , 'desc')));
        }catch(\Exception $e){
            return $this->ErrorResponse(9001 , $e->getCode() , $e->getMessage());
        }
    }
    
    
    /**
     * @error 9002
     * listing favorite products to user
     */
    public function ListFavorite () {
        try{

            $fav = request('user')->favorite()->with('product');

            return $this->SuccessResponse($this->paginate($fav->orderby('favorites.id' , 'desc')));
        }catch(\Exception $e){
            return $this->ErrorResponse(9002 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * @error 9003
     * check if product in user favorites
     */
    public function CheckFavorite () {
        try{
            request()->validate([
                'id' => 'required|exists:collections,id'
            ]);

            $favorite = request('user')->favorite->where('id' , request('id'))->count();

            return $this->SuccessResponse($favorite);
        }catch(\Exception $e){
            return $this->ErrorResponse(9003 , $e->getCode() , $e->getMessage());
        }
    }

}
