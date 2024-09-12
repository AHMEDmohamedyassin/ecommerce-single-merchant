<?php

namespace App\Http\Controllers\Filters;

use App\Traits\ResponseTrait;
use App\Traits\PaginateTrait;
use App\Traits\SlugTrait;
use App\Traits\FileTrait;
use App\Models\Category;

class CategoryController{
    use ResponseTrait , PaginateTrait , SlugTrait , FileTrait;

    public $image_path = 'categories_images/';
    public $images_size = [100 , 0];

    public function __construct(){
        $this->images_size = json_decode(env('Categories_images_size'));
    }

    /**
     * @code : 3001
     * create category
     * @Admin
     */
    public function CreateCategory () {
        try{
            request()->validate([
                'title' => 'required|max:255',
                'description' => 'max:255',
                'image' => 'file|mimes:jpeg,png,jpg|max:1024'
            ]);

            $category = Category::create([
                'title' => request('title'),
                'description' => request('description') ,
                'slug' => $this->MultiTextSlug(request('title') , request('description')) ,
            ]);

            // store and resize image
            $category['image'] = $this->StoreResizeImage(request()->file('image') , $this->image_path . $category->id , $this->images_size);

            return $this->SuccessResponse($category);
        }catch(\Exception $e){
            return $this->ErrorResponse(3001 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * @code 3002
     * update category
     * @Admin
     */
    public function UpdateCategory(){
        try{
            $req = request()->validate([
                'id' => 'required',
                'title' => 'max:255|required',
                'description' => 'max:255|required',
                'image' => 'file|mimes:jpeg,png,jpg|max:1024'
            ]);

            $category = Category::find(request('id'));

            if(!$category) throw new \Exception('category not found' , 10);

            // update data of category
            $category->update([
                'title' => request('title'),
                'description' => request('description'),
                'slug' => $this->MultiTextSlug(request('title') , request('description'))
            ]);

            // store and resize image
            $category['image'] = $this->StoreResizeImage(request()->file('image') , $this->image_path . $category->id , $this->images_size);

            return $this->SuccessResponse($category);
        }catch(\Exception $e){
            return $this->ErrorResponse(3002 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * @code : 3003
     * delete category image
     * @var id : category id
     */
    public function DeleteImageCategory(){
        try{
            request()->validate(['id' => 'required']);

            $category = Category::find(request('id'));

            if(!$category) throw new \Exception('category not found' , 10);

            // delete image
            $this->DeleteFile($this->image_path . $category->id . '.jpg');

            return $this->SuccessResponse($category);
        }catch(\Exception $e){
            return $this->ErrorResponse(3003 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * @code 3004
     * delete category
     * @var id : category id
     */
    public function DeleteCategory(){
        try{
            request()->validate(['id' => 'required']);

            $category = Category::find(request('id'));

            if(!$category) throw new \Exception('category not found' , 10);

            // delete image
            $this->DeleteFile($this->image_path . $category->id . '.jpg');

            $category->delete();

            return $this->SuccessResponse();
        }catch(\Exception $e){
            return $this->ErrorResponse(3004 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * @code 3005
     * read category
     * @var id : category id
     */
    public function ReadCategory(){
        try{
            request()->validate(['id' => 'required']);

            $category = Category::find(request('id'));

            if(!$category) throw new \Exception('category not found' , 10);

            $category['image'] = $this->FileUrl($this->image_path . $category->id . '.jpg');

            return $this->SuccessResponse($category);
        }catch(\Exception $e){
            return $this->ErrorResponse(3005 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * @code 3006
     * search category
     * @var search : search in slug
     */
    public function SearchCategory(){
        try{
            request()->validate([
                'search' => 'max:255' ,
                'withproducts' => 'boolean|nullable'
            ]);

            $category = new Category();

            if(request('withproducts'))
                $category = $category->whereHas('product' , function ($query) {
                    $query->where('expire_date' , '>=' , \Carbon\Carbon::now());
                });

            $category = $category->where('slug' , 'LIKE' , '%'.$this->CreateSlug(request('search')).'%')->orderBy('id' , 'desc');

            $data = $this->paginate($category);

            $items = [];
            foreach($data['items'] as $item){
                $item['image'] = $this->FileUrl($this->image_path . $item['id'] . '.jpg');
                $items[] = $item;
            }
            $data['items'] = $items;

            return $this->SuccessResponse($data);
        }catch(\Exception $e){
            return $this->ErrorResponse(3006 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * @code 3007
     * with ids category
     * @var search : search in slug
     */
    public function WithIdsCategory(){
        try{
            request()->validate(['ids' => 'array|nullable']);

            if(!request('ids')) return $this->SuccessResponse();

            $category = Category::whereIn('id' , request('ids'));

            return $this->SuccessResponse($this->paginate($category));
        }catch(\Exception $e){
            return $this->ErrorResponse(3007 , $e->getCode() , $e->getMessage());
        }
    }
}
