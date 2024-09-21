<?php

namespace App\Http\Controllers\Setting;

use App\Http\Controllers\Controller;
use App\Traits\ResponseTrait;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class ImageController extends Controller
{
    use ResponseTrait ;

    private $defaultImage = "/settings/images/default.jpg";

    private function ProductImagePath() {
        $id = request('id');
        $image = request('image');

        $filename = "/products/{$id}/images/{$image}";

        if(!request()->has('image')){
            $images = Storage::allFiles("/products/{$id}/images");
            
            // check if there is any image
            if(!count($images)) throw new Exception();

            // check if required image number is exists or not , if not gets the first image order
            if(count($images) > request('order' , 0) )
                $filename = $images[request('order' , 0)];
            else
                $filename = $images[0];
        }

        return $filename;
    }

    private function UserImagePath() {
        $id = request('id');
        $image = request('image');
        $path = "/users/{$id}/{$image}";
        return $path;
    }

    private function CategoryImagePath() {
        $id = request('id');
        $image = request('image');
        $path = "/categories/{$id}/{$image}";
        return $path;
    }

    private function TopCategoryImagePath() {
        $image = request('image');
        $path = "/top_categories/{$image}";
        return $path;
    }

    private function StaticImagePath() {
        $image = request('image');
        $page_name = request('page_name');
        $path = "/{$page_name}/images/{$image}";
        return $path;
    }

    private function StoreImagePath() {
        $id = request('id');
        $image = request('image');
        $path = "/stores/{$id}/{$image}";
        return $path;
    }

    private function SwitchImagePath () {
        $filename = '';

        switch(request('type')){
            case "product" : 
                $filename = $this->ProductImagePath();
                break; 
            case "user" : 
                $filename = $this->UserImagePath();
                break; 
            case "category" : 
                $filename = $this->CategoryImagePath();
                break; 
            case "top_category" : 
                $filename = $this->TopCategoryImagePath();
                break; 
            case "static" : 
                $filename = $this->StaticImagePath();
                break; 
            case "store" : 
                $filename = $this->StoreImagePath();
                break; 
            default :
                $filename = $this->defaultImage;
        }

        // check if image exists
        if(!Storage::fileExists($filename))
            throw new Exception();

        return Storage::path($filename);
    }

    /**
     * @error 21,001
     * image method
     * get images from any where in application with selected resolution
     */
    public function ImageSetting () {
        header('Content-Type: image/png');
        try{
            request()->validate([
                'width' => 'nullable|numeric|in:100,200,300,400,500,600,700,800' , 
                'type' => 'required|in:product,user,category,top_category,static,store,setting' , 
                'id' => [Rule::requiredIf( in_array(request('type') , ["product" , "user" , "category" , "store"]) ) , "numeric"],
                "image" => [Rule::requiredIf( request("type") != "product" || ( request("type") == "product" && request('order') == null)  )] , 
                "page_name" => [Rule::requiredIf(request('type') == 'static')] , 
                "order" => [Rule::requiredIf(request('type') == 'product' && request("image") == null ) , 'numeric']
            ]);

            $filepath =  $this->SwitchImagePath();
            $width = request('width' , 100);
            $cache_key = "image_{$filepath}_".request('type')."_{$width}";

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
        }catch(\Exception $e){
            // check if default image is exists
            if(!Storage::exists($this->defaultImage))
                return $this->ErrorResponse(21001 , $e->getCode() , $e->getMessage());

            // if default image exists it will return it with required size
            request()->merge([
                "type" => "setting"
            ]);
            return $this->ImageSetting();
        }
    }
}
