<?php

namespace App\Http\Controllers\Filters;

use App\Traits\ResponseTrait;
use App\Traits\PaginateTrait;
use App\Traits\SlugTrait;
use App\Models\Category;
use Illuminate\Support\Facades\Storage;

class TopCategoryController{
    use ResponseTrait , PaginateTrait , SlugTrait;
    
    public $file_path = '/top_categories/json.json';

    /**
     * @code : 2001
     * create top category
     * @Admin
     */
    public function CreateTopCategory () {
        try{
            request()->validate([
                'title' => 'required|string' ,
                'ids' => 'nullable|array' , 
                'ids.*' => 'exists:categories,id' 
            ]);

            $content = null ;

            // the new appended content
            $appended = [
                request('title') => [
                    'ids' => request('ids') ?? [],
                ]
            ];

            // check if file exists to create new content or appending content
            if(Storage::exists($this->file_path)){
                $content = json_decode(Storage::read($this->file_path) , true);

                // prevent creation of new collection and prevent delete previous with its data 
                if(!isset($content[request('title')]))
                    $content = array_merge($content , $appended);
            }else
                // create new content
                $content = $appended;

            // save new content to file
            Storage::put($this->file_path , json_encode($content));

            return $this->SuccessResponse($content);
        }catch(\Exception $e){
            return $this->ErrorResponse(2001 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * @code : 2002
     * append category to top category
     * @Admin
     */
    public function AppendCategory() {
        try{
            request()->validate([
                'title' => 'required' , 
                'append' => 'boolean' , 
                'ids' => 'required|array' , 
                'ids.*' => 'exists:categories,id' 
            ]);

            // check if file is exists or create new file if not exists
            if(!Storage::exists($this->file_path)) return $this->CreateTopCategory();

            // get content of file
            $content = json_decode(Storage::read($this->file_path) , true);

            if(isset($content[request('title')])){
                $ids = $content[request('title')]['ids'] ?? [];

                // append or prepend
                if(request('append'))
                    $ids = array_merge($ids , request('ids'));
                else $ids = array_diff($ids , request('ids'));

                $content[request('title')]['ids'] = array_values(array_unique($ids));
            }else 
                return $this->CreateTopCategory();

            Storage::write($this->file_path , json_encode($content));

            return $this->SuccessResponse($content);
        }catch(\Exception $e){
            return $this->ErrorResponse(2002 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * @code : 2003
     * delete top category
     * @Admin
     */
    public function DeleteTopCategory() {
        try{
            request()->validate([
                'title' => 'required'
            ]);

            // check if file is exists or create new file if not exists
            if(!Storage::exists($this->file_path)) return $this->SuccessResponse();

            // get content of file
            $content = json_decode(Storage::read($this->file_path) , true);

            if(isset($content[request('title')]))
                unset($content[request('title')]);

            Storage::write($this->file_path , json_encode($content));

            return $this->SuccessResponse($content);
        }catch(\Exception $e){
            return $this->ErrorResponse(2003 , $e->getCode() , $e->getMessage());
        }
    }


    
    /**
     * @code : 2004
     * read top category and thier related categories
     */
    public function ReadTopCategory() {
        try{

            // check if file is exists or create new file if not exists
            if(!Storage::exists($this->file_path)) return $this->SuccessResponse();

            // get content of file
            $content = json_decode(Storage::read($this->file_path) , true);

            $data = [];
            $ids = [];

            foreach($content as $key => $val){
                $item = [];
                $item['title'] = $key;
                $item['categories'] = Category::select('id' , 'title')->whereIn('id' , $val['ids'])->get();
                $ids = array_merge($ids  , $val['ids']);
                $data[] = $item;
            }

            $ids = array_values(array_unique($ids));
            $data[] = [
                'title' => 'other' ,
                'categories' => Category::select('id' , 'title')->whereNotIn('id' , $ids)->get()
            ];

            return $this->SuccessResponse($data);
        }catch(\Exception $e){
            return $this->ErrorResponse(2004 , $e->getCode() , $e->getMessage());
        }
    }
}