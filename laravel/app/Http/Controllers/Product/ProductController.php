<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Models\Category;
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
        "serial" => "nullable|max:255|string",
        "description" => "nullable|max:255|string",
        "old_price" => "nullable|max:999999.99" ,
        "quantity" => "nullable|max:65535" ,
        "publish_date" => "nullable|date_format:d-m-Y H:i" ,
        "categories" => "array|nullable",
        "categories.*" => "numeric|exists:categories,id",
        "json" => "nullable|array" ,
    ]; 

    // writing json
    public function WritingJson ($product) {
        if(request()->has('json')){
            Storage::put('/products/' . $product->id . '/json/json.json' , json_encode(request('json')));
            $product['json'] = request('json');
        }

        return $product;
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
            $req = request()->validate([
                "title" => "required|max:255|string",
                "price" => "required|max:999999.99" 
            ] + $this->validation);

            // creating product
            $product = Product::create(array_merge($req , [
                'slug' => $this->MultiTextSlug(request('serial') , request('title') , request('price') , request('description')) ,
                'publish_date' => request('publish_date' , null) ? Carbon::parse(request('publish_date'))->format('Y-m-d H:i:s') : Carbon::now()
            ]));
            
            // sync cateogries
            $product->category()->sync(request('categories'));

            // writing json file and appending it with response
            $product = $this->WritingJson($product);

            return $this->SuccessResponse($product->load('category'));
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
                "id" => "required|exists:products,id",
                "title" => "max:255|string",
                "price" => "max:999999.99" 
            ] + $this->validation);

            $product = Product::find(request('id'));

            $product->update(array_merge($req , [
                'slug' => $this->MultiTextSlug(request("serial" , $product->serial) , request('title' , $product->title) , request('price' , $product->price) , request('description' , $product->description)) ,
                'publish_date' => request('publish_date') ? Carbon::parse(request('publish_date')) : $product->publish_date
            ]));

            // sync cateogries
            $product->category()->sync(request('categories'));

            // rewriting json file
            $product = $this->WritingJson($product);

            return $this->SuccessResponse($product->load('category'));
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
                "id" => "required|exists:products,id"
            ]);

            $product = Product::find(request('id'));

            $product->delete();

            Storage::deleteDirectory('/products/' . request('id'));

            return $this->SuccessResponse($product);
        }catch(\Exception $e){
            return $this->ErrorResponse(7003 , $e->getCode() , $e->getMessage());
        }
    }

    
    /**
     * @error 7004
     * searching product
     * @Admin
     */
    public function SearchProduct () {
        try{
            request()->validate([
                'search' => 'nullable|max:255' , 
                'orderby' => 'in:publish_date,price,ratting,quantity,reviews,views,old_price,id,created_at,title,paid_quantity,updated_at|nullable' , 
                'order' => 'in:asc,desc',
                "categories" => "array|nullable",
                "categories.*" => "numeric|exists:categories,id"
            ]);

            $orderby = request('orderby' , 'id');
            $order = request('order' , 'desc');

            $product = Product::query();

            if(request()->has('categories')){
                $categories = request('categories');
                $product->whereHas('category' , function ($query) use ($categories) {
                    $query->whereIn('category_id' , $categories);
                });
            }

            $product = $product->where('slug' , 'LIKE' , '%' . $this->CreateSlug(request('search')) . '%')
                            ->orderBy($orderby , $order);

            return $this->SuccessResponse($this->paginate($product));
        }catch(\Exception $e){
            return $this->ErrorResponse(7004 , $e->getCode() , $e->getMessage());
        }
    }

    
    /**
     * @error 7005
     * Read all product data
     * @Admin
     */
    public function ReadProduct () {
        try{
            request()->validate([
                "id" => "required|exists:products,id"
            ]);

            $product = Product::find(request('id'));

            $product->update([
                'views' => $product->views + 1
            ]);

            // retriving json of product
            $json_path = '/products/' . $product->id . '/json/json.json';
            if(Storage::exists($json_path))
                $product['json'] = json_decode(Storage::read($json_path , true));
            

            return $this->SuccessResponse($product->load('category'));
        }catch(\Exception $e){
            return $this->ErrorResponse(7005 , $e->getCode() , $e->getMessage());
        }
    }


}
