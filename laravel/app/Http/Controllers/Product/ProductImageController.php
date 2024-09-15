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
            Storage::deleteDirectory($image_path);


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


    /**
     * @error 8003
     * retriving image of product
     * getting required image by product id , name of image , the width
     * getting any image of product by product id , order of image in images folder , the width
     */
    public function ImageRetrieveProduct(){
        try{
            $req = request()->validate([
                'id' => 'numeric|required', 
                'image' => [Rule::requiredIf(request('order') == null) ,'nullable' , 'string' , 'max:255'] ,
                'order' => [Rule::requiredIf(request('image') == null) ,'numeric' , 'nullable' , 'in:0,1'] ,
                'width' => 'nullable|numeric|in:100,200,300,400,500,600,700,800,900,1000'
            ]);

            header('Content-Type: image/png');

            $id = request('id');
            $filename = request('image');
            $width = request('width') ?? 100;

            if(!request()->has('image')){
                $images = Storage::allFiles("/products/{$id}/images");
                if(count($images))
                    $filename = basename($images[request('order') ?? 0]);
            }

            if(!$filename)
                throw new \Exception();

            $filepath = Storage::path("/products/{$id}/images/{$filename}");

            $cache_key = "product_image_{$filename}_{$id}_{$width}";

            // if cache exists get image from it
            if(Cache::has($cache_key)){
                echo Cache::get($cache_key);
                return ;
            }

            $image = new \Imagick($filepath);
            $originalWidth = $image->getImageWidth();
            $originalHeight = $image->getImageHeight();
            $aspectRatio = $originalHeight / $originalWidth;
            $height = $width * $aspectRatio;
            $image->resizeImage($width, (int)$height, \Imagick::FILTER_LANCZOS, 1);

            Cache::put($cache_key ,  $image->getImageBlob() , now()->addDays(env('CACHE_IMAGE_DAYS' , 5)));

            $image->clear();
            $image->destroy();


            echo Cache::get($cache_key);
        }catch(\Exception $e) {
            return response()->file(Storage::path('/settings/images/default.jpg'));
        }
    }


}
