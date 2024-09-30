<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Users\AddressController;
use App\Http\Controllers\Users\AuthController;
use App\Models\User;
use App\Traits\PaginateTrait;
use App\Traits\ResponseTrait;
use App\Traits\SlugTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Storage;
use Ramsey\Uuid\Uuid;
use Illuminate\Support\Str;

class UserController extends Controller
{
    use ResponseTrait , PaginateTrait , SlugTrait;
    
    /**
     * @error 17,001
     * create user 
     */
    public function CreateUser () {
        try{
            $data = request()->validate([
                'name' => 'required|max:255|string',
                'email' => 'nullable|email|max:255|unique:users',
                'phone' => 'max:11|required|string|unique:users' ,

                'address' => 'nullable|max:255' ,
                'default' => 'boolean|nullable' ,
                'json' => 'nullable|array|max:3000'
            ]);

            // other validations
            (new AuthController)->HelperValidationMethodAuth();

            $slug = $this->MultiTextSlug(request('phone') , request('name') , request('email'));


            $user = User::create($data + [
                'slug' => $slug , 
                'password' => (string) Uuid::uuid4()
            ]);


            // creating new address
            if(request()->has('address') && request('address')){
                $address = $user->address()->create($data);
    
                // writing json file
                $json_path = '/addresses/' . $address->id . '/json.json';
                if(request('json'))
                    Storage::put($json_path , json_encode(request('json')) );
    
                // appending json data to response
                if(Storage::exists($json_path))
                    $address['json'] = json_decode(Storage::read($json_path));

                $user['address'] = $address;
            }

            return $this->SuccessResponse($user);
        }catch(\Exception $e){
            return $this->ErrorResponse(17001 , $e->getCode() , $e->getMessage());
        }
    }

    
    
    /**
     * @error 17,002
     * create user 
     */
    public function UpdateUser () {
        try{
            $data = request()->validate([
                'id' => 'required|exists:users,id' ,
                'name' => 'nullable|max:255|string',
                'email' => 'nullable|email|max:255|unique:users',
                'phone' => 'max:11|nullable|string|unique:users' ,
            ]);

            $user = User::find(request('id'));
            
            $user->update($data + [
                'slug' => $this->MultiTextSlug(request('phone' , $user->phone) , request('name' , $user->name) , request('email' , $user->email))
            ]);

            return $this->SuccessResponse($user);
        }catch(\Exception $e){
            return $this->ErrorResponse(17002 , $e->getCode() , $e->getMessage());
        }
    }

    
    /**
     * @error 17,003
     * create user 
     */
    public function RestPasswordUser () {
        try{
            request()->validate([
                'id' => 'required|exists:users,id'
            ]);

            $user = User::find(request('id'));

            $token = Password::createToken($user);
            
            $url = env('APP_URL') . '/auth/password/reset?token=' . $token . '&phoneORemail=' . $user->phone;

            return $this->SuccessResponse($url);
        }catch(\Exception $e){
            return $this->ErrorResponse(17003 , $e->getCode() , $e->getMessage());
        }
    }

    
    /**
     * @error 17,004
     * create user 
     */
    public function DeleteUser () {
        try{
            request()->validate([
                'id' => 'required|exists:users,id'
            ]);

            $user = User::find(request('id'));

            $user->delete();

            $path = "/users/{$user->id}";
            if(Storage::directoryExists($path))
                Storage::deleteDirectory($path);

            return $this->SuccessResponse($user);
        }catch(\Exception $e){
            return $this->ErrorResponse(17004 , $e->getCode() , $e->getMessage());
        }
    }

    
    /**
     * @error 17,005
     * create user 
     */
    public function ListUser () {
        try{
            request()->validate([
                'search' => 'nullable|max:255'
            ]);

            $users = User::query();

            if(request()->has('search'))
                $users->where('slug' , 'like' , '%'.$this->CreateSlug(request('search')).'%');

            $users->orderby('id' , 'desc');

            return $this->SuccessResponse($this->paginate($users));
        }catch(\Exception $e){
            return $this->ErrorResponse(17005 , $e->getCode() , $e->getMessage());
        }
    }

    
    /**
     * @error 17,006
     * create user 
     */
    public function ReadUser () {
        try{
            request()->validate([
                'id' => 'required|exists:users,id'
            ]);

            $user = User::with('role')->with('permission')
                ->find(request('id'));

            return $this->SuccessResponse($user);
        }catch(\Exception $e){
            return $this->ErrorResponse(17006 , $e->getCode() , $e->getMessage());
        }
    }

    
    /**
     * @error 17,007
     * create user 
     */
    public function DetailUser () {
        try{
            request()->validate([
                'id' => 'required|exists:users,id' , 
                'detail' => 'required|in:coupon,order,review,contact,block,favorite,cart,transaction,address'
            ]);

            $user = User::find(request('id'));

            // check if the required details is the address to handle different logic of adding json data to each address item
            if(request('detail') == 'address'){
                $address = $user->address();
                $address = $this->paginate($address);

                // getting addressess items and adding the json content to it
                $addresses = [];
                foreach($address['items'] as $item){
                    $path = "/addresses/{$item->id}/json.json";
                    if(Storage::exists($path)) 
                        $addresses[] = array_merge($item->toArray() , (array)json_decode(Storage::read($path)) );
                }
                
                // replacing the address items with new items ($addresses) which containing the content of json file of each address 
                $address['items'] = $addresses;
                $user['address'] = $address;
            }elseif (request('detail') == 'order') {
                // get details of user orders and getting details of shipping address and billing address
                $detail = $user->order()->with('store_address')->with('address')->with('coupon');
                $detail = $this->paginate($detail);
    
                $user[request('detail')] = $detail;
            }else {
                // get details of user and appending it to user object
                $detail_type = request()->input('detail');
                $detail = $user->$detail_type();
                $detail = $this->paginate($detail);
    
                $user[request('detail')] = $detail;
            }


            return $this->SuccessResponse($user);
        }catch(\Exception $e){
            return $this->ErrorResponse(17007 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * @error 17,008
     * create user  address
     */
    public function AddAddressUser () {
        try{
            request()->validate([
                'id' => 'required|exists:users,id' 
            ]);

            $user = User::find(request('id'));

            request()->merge([
                'user' => $user
            ]);

            return (new AddressController)->CreateAddress();
        }catch(\Exception $e){
            return $this->ErrorResponse(17008 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * @error 17,009
     * delete user address 
     */
    public function DeleteAddressUser () {
        try{
            request()->validate([
                'user_id' => 'required|exists:users,id' ,
                'address_id' => 'required' ,
            ]);

            $user = User::find(request('user_id'));

            request()->merge([
                'user' => $user ,
                'id' => request('address_id')
            ]);

            return (new AddressController)->DeleteAddress();

        }catch(\Exception $e){
            return $this->ErrorResponse(17009 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * @error 17,010
     * delete user address 
     */
    public function UpdateAddressUser () {
        try{
            request()->validate([
                'user_id' => 'required|exists:users,id' ,
                'address_id' => 'required' ,
            ]);

            $user = User::find(request('user_id'));

            request()->merge([
                'user' => $user ,
                'id' => request('address_id')
            ]);

            return (new AddressController)->UpdateAddress();

        }catch(\Exception $e){
            return $this->ErrorResponse(17010 , $e->getCode() , $e->getMessage());
        }
    }


}
