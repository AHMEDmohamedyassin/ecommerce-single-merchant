<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Setting\ImageController;
use App\Models\Collection;
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
     * (upload image for product)<->(only_works) ( and relate color to image )<->( deprecated )
     * @Admin
     */
    public function UploadImageProduct () {
        try{
            request()->validate([
                "id" => "required|exists:collections,id",
                "image" => "mimes:jpg,jpeg,png|file|max:2048|required",
                "color" => "string|nullable" 
            ]);

            $collection = Collection::find(request('id'));

            // retreaving json file if exits
            // $json_path = '/products/' . $collection->id . '/json/json.json';
            // $json = [];
            // if(Storage::exists($json_path))
            //     $json = json_decode(Storage::read($json_path) , true);


            // uploading image if exists
            $image_name = null;
            if(request()->has('image')){
                $img = request()->file('image');
    
                $image_name = time() . '_' . rand(0 , 999999) . '.' . $img->getClientOriginalExtension();
    
                $img->storeAs('/products/' . $collection->id . '/images/' . $image_name);
                

                // // images key in json file appending new image
                // if(isset($json['images']))
                //     $json['images'] = array_merge($json['images'] , [$image_name => request('color')]);
                // else $json['images'] = [$image_name => request('color')];
            }


            // // saving changes to json
            // Storage::put($json_path , json_encode($json));

            // return $this->SuccessResponse($json);

            return $this->SuccessResponse();
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
                "id" => "required|exists:collections,id",
                "image" => "required",
            ]);

            $collection = Collection::find(request('id'));

            // deleting image directory
            $image_path = '/products/' . $collection->id . '/images/' . request('image');
            Storage::delete($image_path);

            // update product that contains delete image
            $collection->product()->where('image' , request('image'))->update(['image' => null]);


            // // // // // // // // //  retreaving json file if exits and updating it // // // // // // // // // 
            // $json_path = '/products/' . $collection->id . '/json/json.json';
            // if(!Storage::exists($json_path))
            //     return $this->SuccessResponse();
        
            // $json = [];
            // $json = json_decode(Storage::read($json_path) , true);

            // if(isset($json['images']))
            //     unset($json['images'][request('image')]);
            // else $json['images'] = [];

            // // saving changes to json
            // Storage::put($json_path , json_encode($json));

            // remove image from cache
            (new ImageController)->ImageClearCache('product');

            return $this->SuccessResponse();
        }catch(\Exception $e) {
            return $this->ErrorResponse(8002 , $e->getCode() , $e->getMessage());
        }
    }


}
