<?php

namespace App\Http\Controllers\Product;
use Illuminate\Support\Facades\Storage;
use App\Traits\SlugTrait;
use App\Traits\FileTrait;
use App\Models\Product;
use App\Models\Media;
use App\Models\Category;
use App\Models\Tag;
use Carbon\Carbon;

class ProductHelper{
    use SlugTrait , FileTrait;

    /**
     * construct constant variables from env file
     */
    public function __construct(){
        // files resolution (sizes)
        $this->large_images_size = json_decode(env('LARGE_IMAGES_SIZE'));
        $this->large_thumbnail_images_size = json_decode(env('LARGE_THUMBNAIL_IMAGES_SIZE'));
        $this->small_images_size = json_decode(env('SMALL_IMAGES_SIZE'));
        $this->small_thumbnail_images_size = json_decode(env('SMALL_THUMBNAIL_IMAGES_SIZE'));
        // max number allowed for images , videos , cateogries , tags
        $this->allowed_images_number = env('ALLOWED_IMAGES_NUMBER');
        $this->max_product_categories = env('MAX_PRODUCT_CATEGORIES');
        $this->max_product_tags = env('MAX_PRODUCT_TAGS');
        // publish days
        $this->product_cost = env('PRODUCT_COST');
        $this->special_product_cost = env('SPECIAL_PRODUCT_COST');
        $this->publish_days = env('PUBLISH_DAYS');
        $this->special_publish_days = env('SPECIAL_PUBLISH_DAYS');
        $this->max_products_number = env('MAX_PRODUCTS_NUMBER');
    }

    /**
     * @code 0
     * validation
     */
    public function request_validation ($addition = []) {
        $req = request()->validate(array_merge([
            'title' => 'required|max:255',
            'pref_description' => 'required|max:255' ,
            'price' => 'required|numeric|min:0|max:999999999',
            'categories' => 'array|max:'.$this->max_product_categories,
            'tags' => 'array|max:'.$this->max_product_tags,
            'media' => 'array',
            'media.*' => 'mimes:jpeg,png,jpg|max:2048',
            'old_price' => 'numeric|nullable|min:0|max:999999999',
            'quantity' => 'min:0|max:65535|integer|nullable' ,
            'file_str' => 'json|max:3000' ,
        ] , $addition));

        if(request()->has('categories') && Category::whereIn('id' , request('categories'))->count() < count(request('categories')) )
            throw new \Exception('categories not found' , 10);
        if(request()->has('tags') && Tag::whereIn('id' , request('tags'))->count() < count(request('tags')) )
            throw new \Exception('tags not found' , 11);

        return $req;
    }


    /**
     * @code 3
     * get file path
     */
    public function files_dir_path($type , $id){
        switch($type){
            case 'dir' :
                return '/products/' . $id . '/';
            case 'json' :
                return '/products/' . $id . '/json.json';
            case 'videos' :
                return '/products/' . $id . '/videos/';
            case 'large_images' :
                return '/products/' . $id . '/large_images/';
            case 'small_images' :
                return '/products/' . $id . '/small_images/';
            case 'large_thumbnails' :
                return '/products/' . $id . '/large_thumbnails/';
            default:
                return '/products/' . $id . '/small_thumbnails/';
        }
    }

    /**
     * @code 3
     * product images upload
     * counting the old images and subtract it from total allowed
     * in case of creating product (old_count = 0) , the thumbnails is created from first image
     * @var product
     */
    public function media_upload ($product) {
        $id = $product->id;
        $files = request()->file('media');
        if(!$files) return;
        $old_count = count($this->GetDirFiles($this->files_dir_path('small_images' , $id)));
        $count = min(count($files) , $this->allowed_images_number - $old_count);
        $paths = [];

        if($old_count){
            $paths['small_thumbnails'] = $this->GetDirFiles($this->files_dir_path('small_thumbnails' , $id));
            // $paths['large_thumbnails'] = $this->GetDirFiles($this->files_dir_path('large_thumbnails' , $id));
            $paths['small_images'] = $this->GetDirFiles($this->files_dir_path('small_images' , $id));
            // $paths['large_images'] = $this->GetDirFiles($this->files_dir_path('large_images' , $id));
        }

        for ($i = 0 ; $i < $count ; $i ++){
            $file = $files[$i];
            $file_name = rand(0 , 9999);

            // if($i == 0 && !$old_count){
            // }
            $paths['small_thumbnails'][] = $this->StoreResizeImage($file , $this->files_dir_path('small_thumbnails' , $id) . $file_name  , $this->small_thumbnail_images_size );
            // $paths['large_thumbnails'][] = $this->StoreResizeImage($file , $this->files_dir_path('large_thumbnails' , $id) . $file_name  , $this->large_thumbnail_images_size );
            $paths['small_images'][] = $this->StoreResizeImage($file , $this->files_dir_path('small_images' , $id) . $file_name  , $this->small_images_size );
            // $paths['large_images'][] = $this->StoreResizeImage($file , $this->files_dir_path('large_images' , $id) . $file_name  , $this->large_images_size );
        }

        return $paths;
    }


    /**
     * @code 4
     * creating json file for product
     * @var text , @var product
     */
    public function Product_json_file ($text , $product) {
        $path = $this->files_dir_path('json' , $product->id);
        Storage::put($path , $text);
        return Storage::url($path);
    }


    /**
     *
     */
    public function Product_Files ($product , $only_thumbnails = false) {
        $id = $product->id;
        $paths=[];
        $paths['small_thumbnails'] = $this->GetDirFiles($this->files_dir_path('small_thumbnails' , $id));
        $paths['large_thumbnails'] = $this->GetDirFiles($this->files_dir_path('large_thumbnails' , $id));
        if(!$only_thumbnails){
            $paths['small_images'] = $this->GetDirFiles($this->files_dir_path('small_images' , $id));
            $paths['large_images'] = $this->GetDirFiles($this->files_dir_path('large_images' , $id));
            $paths['json'] = $this->FileUrl($this->files_dir_path('json' , $id));
        }
        $product['paths'] = $paths;
        return $product;
    }


    /**
     * code 5
     * un expired product retreaving
     */
    public function unexpired_product($product) {
        return $product->where(function ($item) {
            $item->where('expire_date', '>=' , Carbon::now())
            ->orWhere('special_expire_date' , '>=' , Carbon::now());
        });
    }


    /**
     * cdoe 6
     * filtering products with categories and tags
     */
    public function filter_product($product){
        request()->validate([
            'tag_id' => 'max:3|array|nullable' ,
            'category_id' => 'max:3|array|nullable',
            'tag_id.*' => 'exists:tags,id',
            'category_id.*' => 'exists:categories,id',
            'fromPrice' => 'numeric|nullable',
            'toPrice' => 'numeric|nullable',
            'availableOnly' => 'boolean|nullable'
        ]);

        $categories = request('category_id');
        $tags = request('tag_id');

        // categories filter
        if($categories){
            $product = $product->whereHas('category' , function ($query) use($categories) {
                $query->whereIn('categories.id' , $categories);
            });
        }

        // tags filter
        if($tags){
            $product = $product->whereHas('tag' , function ($query) use($tags) {
                $query->whereIn('tags.id' , $tags);
            });
        }

        // price filtering
        if(request('fromPrice') && !request('toPrice'))
            $product = $product->where('price' , ">=",  request('fromPrice'));
        if(request('toPrice') && !request('fromPrice'))
            $product = $product->where('price' , "<=",  request('toPrice'));
        if(request('toPrice') && request('fromPrice'))
            $product = $product->whereBetween('price' ,  [request('fromPrice') , request('toPrice')]);

        // availibilty
        if(request('availableOnly'))
            $product = $product->where('quantity' , '>' , 0);

        return $product;
    }
}
