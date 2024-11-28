<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\StoreAddress;
use App\Traits\PaginateTrait;
use App\Traits\ResponseTrait;
use App\Traits\SlugTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class StoreController extends Controller
{
    use ResponseTrait , PaginateTrait , SlugTrait;

    /**
     * @error 18001
     */
    public function CreateStore () {
        try{
            $req = request()->validate([
                'address' => 'required|max:255' , 
                'primary' => 'boolean|nullable' , 
                'json' => 'array|max:10000'
            ]);

            // check if store is the primary store , makes other stores not primary
            if(request('primary'))
                StoreAddress::where('primary' , 1)->update([
                    'primary' => 0
                ]);

            // creating new store
            $store = StoreAddress::create($req);

            // creating json file and appending the json to response
            if(request()->has('json')){
                Storage::put("stores/{$store->id}/json.json" , json_encode(request('json')));

                $store['json'] = request('json');
            }

            return $this->SuccessResponse($store);
        }catch(\Exception $e){
            return $this->ErrorResponse(18001 , $e->getCode() , $e->getMessage());
        }
    }



    /**
     * @error 18002
     */
    public function UpdateStore () {
        try{
            $req = request()->validate([
                'id' => 'required|exists:store_addresses,id',
                'address' => 'max:255' , 
                'primary' => 'boolean|nullable' , 
                'json' => 'array|max:10000'
            ]);

            // check if store is the primary store , makes other stores not primary
            if(request('primary'))
                StoreAddress::where('primary' , 1)->update([
                    'primary' => 0
                ]);

            // update store
            $store = StoreAddress::find(request('id'));
            $store->update($req);


            // update or create json file 
            $path = "stores/{$store->id}/json.json";
            if(request()->has('json'))
                Storage::put($path , json_encode(request('json')));

            // appending the json to response
            if(Storage::exists($path))
                $store['json'] = json_decode(Storage::read($path));

            return $this->SuccessResponse($store);
        }catch(\Exception $e){
            return $this->ErrorResponse(18002 , $e->getCode() , $e->getMessage());
        }
    }



    /**
     * @error 18003
     * delete store
     */
    public function DeleteStore () {
        try{
            $req = request()->validate([
                'id' => 'required|exists:store_addresses,id',
            ]);

            $store = StoreAddress::find(request('id'));
            $store->delete();

            // deleting json file if exists 
            $path = "stores/{$store->id}";
            if(Storage::directoryExists($path))
                Storage::deleteDirectory($path);

            return $this->SuccessResponse($store);
        }catch(\Exception $e){
            return $this->ErrorResponse(18003 , $e->getCode() , $e->getMessage());
        }
    }



    /**
     * @error 18004
     * list store
     */
    public function ListStore () {
        try{

            $stores = StoreAddress::orderby('primary' , 'desc')
            ->orderby('id' , 'desc')->take(20)->get()             // limiting 20 results
            ->each(function ($store) {
                $path = "stores/{$store->id}/json.json";
                if(Storage::exists($path))
                    $store->json = json_decode(Storage::read($path));
                return $store;
            });


            return $this->SuccessResponse($stores);
        }catch(\Exception $e){
            return $this->ErrorResponse(18004 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * @error 18005
     * read store
     */
    public function ReadStore () {
        try{
            request()->validate([
                'id' => 'required|exists:store_addresses,id'
            ]);

            $store = StoreAddress::find(request('id'));

            $path = "stores/{$store->id}/json.json";
            if(Storage::exists($path))
                $store["json"] = json_decode(Storage::read($path));

            return $this->SuccessResponse($store);
        }catch(\Exception $e){
            return $this->ErrorResponse(18005 , $e->getCode() , $e->getMessage());
        }
    }
}
