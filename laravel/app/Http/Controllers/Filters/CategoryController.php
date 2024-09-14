<?php

namespace App\Http\Controllers\Filters;

use App\Traits\ResponseTrait;
use App\Traits\PaginateTrait;
use App\Traits\SlugTrait;
use App\Models\Category;
use Illuminate\Support\Facades\Storage;

class CategoryController{
    use ResponseTrait , PaginateTrait , SlugTrait;


    public function storeCategoryImage ($category) {
        $image = request()->file('image');

        if(!$image) return;

        $image_name = 'image.'.$image->getClientOriginalExtension();
        $image->storeAs('/categories/'.$category->id.'/'.$image_name);
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

            // storing image
            $this->storeCategoryImage($category);

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
                'id' => 'required|exists:categories,id',
                'title' => 'max:255',
                'description' => 'max:255',
                'image' => 'file|mimes:jpeg,png,jpg|max:1024'
            ]);

            $category = Category::find(request('id'));

            // update data of category
            $category->update($req + [
                'slug' => $this->MultiTextSlug(request('title') ?? $category->title , request('description') ?? $category->description)
            ]);

            // storing image
            $this->storeCategoryImage($category);

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
            request()->validate(['id' => 'required|exists:categories,id']);

            $category = Category::find(request('id'));

            // delete image
            Storage::deleteDirectory('/categories/'.$category->id);

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
            request()->validate(['id' => 'required|exists:categories,id']);

            $category = Category::find(request('id'));

            // delete image
            Storage::deleteDirectory('/categories/'.$category->id);

            $category->delete();

            return $this->SuccessResponse($category);
        }catch(\Exception $e){
            return $this->ErrorResponse(3004 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * @code 3005
     * with ids category
     */
    public function ReadCategory(){
        try{
            $validatedData = request()->validate([
                'id' => 'array|nullable',
                'id.*' => 'integer|exists:categories,id'
            ]);
        
            // Retrieve the 'ids' parameter
            $id = $validatedData['id'] ?? [];
        
            if (empty($id)) 
                return $this->SuccessResponse();
            
            $category = Category::whereIn('id', $id);

            return $this->SuccessResponse($this->paginate($category));
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
            ]);

            $category = new Category();

            $category = $category->where('slug' , 'LIKE' , '%'.$this->CreateSlug(request('search')).'%')->orderBy('id' , 'desc');

            $data = $this->paginate($category);

            return $this->SuccessResponse($data);
        }catch(\Exception $e){
            return $this->ErrorResponse(3006 , $e->getCode() , $e->getMessage());
        }
    }

}
