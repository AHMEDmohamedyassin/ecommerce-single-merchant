<?php

namespace App\Http\Controllers\Users;

use App\Exceptions\CustomException;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Setting\SettingController;
use App\Models\Address;
use App\Models\Setting;
use App\Models\User;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AddressController extends Controller
{
    use ResponseTrait;
    
    /**
     * @error 6001
     * create address for user
     */
    public function CreateAddress () {
        try{
            $req = request()->validate([
                'address' => 'required|max:255' ,
                'default' => 'boolean' ,
                'json' => 'nullable|array|max:3000'
            ]);

            $max_address = (new SettingController() )->valueSetting('max_user_addresses');

            if($max_address <= request('user')->address()->count() ) 
                throw new CustomException('reached maximum address number' , 10);

            // check if the new address needed to be default address , makes all previous user address not default
            if(request('default'))
                request('user')->address()->update(['default' => 0]);

            // creating new address
            $address = request('user')->address()->create($req);

            // writing json file
            $json_path = '/addresses/' . $address->id . '/json.json';
            if(request('json'))
                Storage::put($json_path , json_encode(request('json')) );

            // appending json data to response
            if(Storage::exists($json_path))
                $address['json'] = json_decode(Storage::read($json_path));

            return $this->SuccessResponse($address);
        }catch(\Exception $e){
            return $this->ErrorResponse(6001 , $e->getCode() , $e->getMessage());
        }
    }

    
    
    /**
     * @error 6002
     * update address for user
     */
    public function UpdateAddress () {
        try{
            $req = request()->validate([
                'id' => 'required|exists:addresses,id' ,
                'address' => 'max:255' ,
                'default' => 'boolean' ,
                'json' => 'nullable|array|max:3000'
            ]);

            // check if user own the address of provided id
            $address = request('user')->address()->find(request('id'));

            if(!$address) throw new CustomException('address not found' , 11);

            // check if the new address needed to be default address , makes all previous user address not default
            if(request('default'))
                request('user')->address()->update(['default' => 0]);
            
            // writing json file
            $json_path = '/addresses/' . $address->id . '/json.json';
            if(request('json'))
                Storage::put($json_path , json_encode(request('json')) );

            // updating address
            $address->update($req);

            // appending json data to response
            if(Storage::exists($json_path))
                $address['json'] = json_decode(Storage::read($json_path));

            return $this->SuccessResponse($address);
        }catch(\Exception $e){
            return $this->ErrorResponse(6002 , $e->getCode() , $e->getMessage());
        }
    }

    
    /**
     * @error 6003
     * delete address for user
     */
    public function DeleteAddress () {
        try{

            return $this->SuccessResponse();
        }catch(\Exception $e){
            return $this->ErrorResponse(6003 , $e->getCode() , $e->getMessage());
        }
    }

    
    /**
     * @error 6004
     * listing addresses for user
     */
    public function ListAddress () {
        try{

            return $this->SuccessResponse();
        }catch(\Exception $e){
            return $this->ErrorResponse(6004 , $e->getCode() , $e->getMessage());
        }
    }

    
    /**
     * @error 6005
     * read certain address data of user
     */
    public function ReadAddress () {
        try{

            return $this->SuccessResponse();
        }catch(\Exception $e){
            return $this->ErrorResponse(6005 , $e->getCode() , $e->getMessage());
        }
    }


}
