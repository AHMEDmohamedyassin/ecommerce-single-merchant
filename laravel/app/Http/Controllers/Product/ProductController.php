<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Setting\SettingController;
use App\Models\Category;
use App\Models\Collection;
use App\Models\Product;
use App\Traits\PaginateTrait;
use App\Traits\ResponseTrait;
use App\Traits\SlugTrait;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    use ResponseTrait , SlugTrait , PaginateTrait;

    // muilti used validation 
    public $validation = [
        "serial" => "nullable|max:255|string|unique:collections,serial",
        "description" => "nullable|max:255|string",
        "publish_date" => "nullable|date_format:d-m-Y H:i" ,
        "categories" => "array|nullable",
        "categories.*" => "numeric|exists:categories,id",
        "json" => "nullable|array" ,
        "products.*.size" => "required|max:255" ,
        "products.*.color" => "required|max:255" ,
        "products.*.price" => "required|max:999999.99|min:0" ,
        "products.*.old_price" => "nullable|max:999999.99|min:0" ,
        "products.*.quantity" => "nullable|max:65535|min:0" ,
    ]; 

    // writing json
    public function WritingJson ($collection) {
        if(request()->has('json')){
            Storage::put('/products/' . $collection->id . '/json/json.json' , json_encode(request('json')));
            $collection['json'] = request('json');
        }

        return $collection;
    }

    // reading json content
    public function ReadingJson ($product){
        $json_path = '/products/' . $product->id . '/json/json.json';
        if(!Storage::exists($json_path)) return [];

        return json_decode($json_path , true);
    }

    /**
     * @error 7001
     * creating product
     * @Admin
     */
    public function CreateProduct () {
        try{
            $req = request()->validate(array_merge([
                "title" => "required|max:255|string",
                "products" => "array|required"
            ] , $this->validation));

            // creating the collection of products
            $collection = Collection::create(array_merge($req , [
                'slug' => $this->MultiTextSlug(request('serial') , request('title') , request('description')) ,
                'publish_date' => request('publish_date' , null) ? Carbon::parse(request('publish_date'))->format('Y-m-d H:i:s') : Carbon::now()
            ]));


            // creating product 
            foreach(request('products') as $product){
                $collection->product()->create($product);
            }
            
            // sync cateogries
            $collection->category()->sync(request('categories'));

            // writing json file and appending it with response
            $collection = $this->WritingJson($collection);

            // update products count
            SettingController::updateCreateSetting(SettingController::$products_count);

            return $this->SuccessResponse($collection->load('category')->load('product'));
        }catch(\Exception $e){
            return $this->ErrorResponse(7001 , $e->getCode() , $e->getMessage());
        }
    }
    
    
    /**
     * @error 7002
     * updating product
     * @Admin
     */
    public function UpdateProduct () {
        try{
            $req = request()->validate([
                "id" => "required|exists:collections,id",
                "title" => "max:255|string",
                "products" => "array|nullable"
            ] + $this->validation);


            $collection = Collection::find(request('id'));

            // update collection data
            $collection->update(array_merge($req , [
                'slug' => $this->MultiTextSlug(request("serial" , $collection->serial) , request('title' , $collection->title) , request('price' , $collection->price) , request('description' , $collection->description)) ,
                'publish_date' => request('publish_date') ? Carbon::parse(request('publish_date')) : $collection->publish_date
            ]));


            // appending products product 
            foreach(request('products' , []) as $product){
                $collection->product()->create($product);
            }

            // sync cateogries
            $collection->category()->sync(request('categories'));

            // rewriting json file
            $collection = $this->WritingJson($collection);

            return $this->SuccessResponse($collection->load('category')->load('product'));
        }catch(\Exception $e){
            return $this->ErrorResponse(7002 , $e->getCode() , $e->getMessage());
        }
    }

    
    /**
     * @error 7003
     * deleting product
     * @Admin
     */
    public function DeleteProduct () {
        try{
            request()->validate([
                "id" => "required|exists:collections,id"
            ]);

            $product = Collection::find(request('id'));

            $product->delete();

            Storage::deleteDirectory('/products/' . request('id'));
            
            // update products count
            SettingController::updateCreateSetting(SettingController::$products_count , false);

            return $this->SuccessResponse($product);
        }catch(\Exception $e){
            return $this->ErrorResponse(7003 , $e->getCode() , $e->getMessage());
        }
    }

    
    /**
     * @error 7004
     * searching product
     */
    public function SearchProduct () {
        try{
            request()->validate([
                'search' => 'nullable|max:255' , 
                // 'orderby' => 'in:publish_date,price,ratting,quantity,reviews,views,old_price,id,created_at,title,paid_quantity,updated_at,description|nullable' , 
                'orderby' => 'in:publish_date,ratting,reviews,views,id,created_at,title,updated_at,description|nullable' , 
                'order' => 'in:asc,desc',
                "categories" => "array|nullable",
                "categories.*" => "numeric|exists:categories,id" ,
                'with_products' => "boolean|nullable"
            ]);

            $orderby = request('orderby' , 'id');
            $order = request('order' , 'desc');

            $collection = Collection::query();

            // getting products of collection
            if(request('with_products' , false))
                $collection->with('product');

            if(request()->has('categories')){
                $categories = request('categories');
                $collection->whereHas('category' , function ($query) use ($categories) {
                    $query->whereIn('category_id' , $categories);
                });
            }

            $collection = $collection->where('slug' , 'LIKE' , '%' . $this->CreateSlug(request('search')) . '%')
                            ->orderBy($orderby , $order);

            return $this->SuccessResponse($this->paginate($collection));
        }catch(\Exception $e){
            return $this->ErrorResponse(7004 , $e->getCode() , $e->getMessage());
        }
    }

    
    /**
     * @error 7005
     * Read all product data
     */
    public function ReadProduct () {
        try{
            request()->validate([
                "id" => "required|exists:collections,id"
            ]);

            $collection = Collection::find(request('id'));

            $collection->update([
                'views' => $collection->views + 1
            ]);

            // retriving json of product
            $json_path = '/products/' . $collection->id . '/json/json.json';
            if(Storage::exists($json_path))
                $collection['json'] = json_decode(Storage::read($json_path , true));
        
        
        
            // retrieving product images 
            $images_path = '/products/' . $collection->id . '/images';
            if(Storage::directoryExists($images_path)){
                $all_files = Storage::allFiles($images_path);
                $all_files_name = [];
                // getting only the name of image
                foreach($all_files as $file){
                    $path_array = explode('/' , $file);
                    $all_files_name[] = $path_array[count($path_array) - 1];
                }
                // appending images to response
                $collection['images'] = $all_files_name;
            }
            

            return $this->SuccessResponse($collection->load('category')->load('product'));
        }catch(\Exception $e){
            return $this->ErrorResponse(7005 , $e->getCode() , $e->getMessage());
        }
    }

    
    /**
     * @error 7006
     * Read essential product data using serial
     * @Admin
     */
    public function SerialReadProduct () {
        try{
            request()->validate([
                "serial" => "required|exists:collections,serial"
            ]);

            $collection = Collection::with('product')->where('serial' , request('serial'))->first();
            
            return $this->SuccessResponse($collection);
        }catch(\Exception $e){
            return $this->ErrorResponse(7005 , $e->getCode() , $e->getMessage());
        }
    }


    
    /**
     * @error 7007
     * update sub product
     * @Admin
     */
    public function UpdateSubProduct () {
        try{
            $req = request()->validate([
                "id" => "required|exists:products,id" , 
                "size" => "nullable|max:255" ,
                "color" => "nullable|max:255" ,
                "price" => "nullable|max:999999.99|min:0" ,
                "old_price" => "nullable|max:999999.99|min:0" ,
                "quantity" => "nullable|max:65535|min:0" ,
                "image"  => "nullable|max:255"
            ]);

            $product = Product::find(request('id'));

            $product->update($req);
            
            return $this->SuccessResponse($product);
        }catch(\Exception $e){
            return $this->ErrorResponse(7007 , $e->getCode() , $e->getMessage());
        }
    }

    
    /**
     * @error 7008
     * delete sub product
     * @Admin
     */
    public function DeleteSubProduct () {
        try{
            request()->validate([
                "id" => "required|exists:products,id" , 
            ]);

            $product = Product::find(request('id'));

            $product->delete();
            
            return $this->SuccessResponse($product);
        }catch(\Exception $e){
            return $this->ErrorResponse(7008 , $e->getCode() , $e->getMessage());
        }
    }


}
