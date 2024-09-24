<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class ProductImageController extends Controller
{
    use ResponseTrait;


    /**
     * @error 8001
     * upload image for product and relate color to image
     * @Admin
     */
    public function UploadImageProduct () {
        try{
            request()->validate([
                "id" => "required|exists:products,id",
                "image" => "mimes:jpg,jpeg,png|file|max:2048",
                "color" => "string|nullable" 
            ]);

            $product = Product::find(request('id'));

            // retreaving json file if exits
            $json_path = '/products/' . $product->id . '/json/json.json';
            $json = [];
            if(Storage::exists($json_path))
                $json = json_decode(Storage::read($json_path) , true);


            // uploading image if exists
            $image_name = null;
            if(request()->has('image')){
                $img = request()->file('image');
    
                $image_name = time() . '_' . rand(0 , 999999) . '.' . $img->getClientOriginalExtension();
    
                $img->storeAs('/products/' . $product->id . '/images/' . $image_name);
                

                // images key in json file appending new image
                if(isset($json['images']))
                    $json['images'] = array_merge($json['images'] , [$image_name => request('color')]);
                else $json['images'] = [$image_name => request('color')];
            }


            // colors key in json file appending new color
            if(request()->has('color')){
                if(isset($json['colors']))
                    $json['colors'] = array_values(array_unique(array_merge($json['colors'] , [request('color')])));
                else $json['colors'] = [request('color')];
            }

            // saving changes to json
            Storage::put($json_path , json_encode($json));

            return $this->SuccessResponse($json);
        }catch(\Exception $e){
            return $this->ErrorResponse(8001 , $e->getCode() , $e->getMessage());
        }
    }



    /**
     * @error 8002
     * delete image form product
     * @Admin
     */
    public function DeleteImageProduct () {
        try{
            request()->validate([
                "id" => "required|exists:products,id",
                "image" => "required",
            ]);

            $product = Product::find(request('id'));

            // deleting image directory
            $image_path = '/products/' . $product->id . '/images/' . request('image');
            Storage::delete($image_path);


            // retreaving json file if exits and updating it
            $json_path = '/products/' . $product->id . '/json/json.json';
            if(!Storage::exists($json_path))
                return $this->SuccessResponse();
        
            $json = [];
            $json = json_decode(Storage::read($json_path) , true);

            if(isset($json['images']))
                unset($json['images'][request('image')]);
            else $json['images'] = [];

            // saving changes to json
            Storage::put($json_path , json_encode($json));

            return $this->SuccessResponse();
        }catch(\Exception $e) {
            return $this->ErrorResponse(8002 , $e->getCode() , $e->getMessage());
        }
    }


}
