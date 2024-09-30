<?php

namespace App\Http\Controllers\Admin;

use App\Exceptions\CustomException;
use App\Http\Controllers\Controller;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class StaticController extends Controller
{
    use ResponseTrait ;

    /**
     * create json files for static pages
     */
    public function CreateStatic () {
        try{
            request()->validate([
                'type' => 'required|in:faq,about,policy,contact',
                "json" => 'array|required|max:5000'
            ]);

            $path = '/static/' . request('type') . '/json.json';

            Storage::put($path , json_encode(request('json')));
            
            return $this->SuccessResponse(request('json'));
        }catch(\Exception $e){
            return $this->ErrorResponse(22001 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * read json files for static pages
     */
    public function ReadStatic () {
        try{
            request()->validate([
                'type' => 'required|in:faq,about,policy,shipping,contact',
            ]);

            $path = '/static/' . request('type') . '/json.json';

            if(!Storage::exists($path))
                throw new CustomException('not found' , 24);

            $json = Storage::read($path);

            $json = json_decode($json);
            
            return $this->SuccessResponse($json);
        }catch(\Exception $e){
            return $this->ErrorResponse(22001 , $e->getCode() , $e->getMessage());
        }
    }
}
