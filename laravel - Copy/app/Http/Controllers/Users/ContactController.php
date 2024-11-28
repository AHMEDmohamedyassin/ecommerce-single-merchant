<?php

namespace App\Http\Controllers\Users;

use App\Exceptions\CustomException;
use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Traits\PaginateTrait;
use App\Traits\ResponseTrait;
use App\Traits\SlugTrait;
use Illuminate\Validation\Rule;

class ContactController extends Controller
{
    use ResponseTrait , PaginateTrait , SlugTrait;


    /**
     * @error 15001
     * create contact 
     * requires token to get user data 
     * if token not provided needs name , phone , email (optional) 
     * msg required in all cases
     */
    public function CreateContact () {
        try{
            $req = request()->validate([
                'token' => ['nullable'] , 
                'name' => ['max:255' , Rule::requiredIf(request('token') == null)] ,
                'email' => ['max:255' , 'email'] ,
                'phone' => ['max:20' , Rule::requiredIf(request('token') == null)] ,
                'msg' => 'required|max:255'
            ]);


            $contact = null ;

            // check if token is provided and check if token is valid
            if(request()->has('token')){
                $user = auth()->setToken(request('token'))->user() ?? throw new CustomException('token is invalid' , 3);
                
                $contact = $user->contact()->create([
                    'msg' => request('msg') , 
                    'slug' => $this->MultiTextSlug($user->phone , $user->name , request('msg'))
                ]);
            }else 
                // create contact with name , phone , email if token not provided
                $contact = Contact::create($req + [
                    'slug' => $this->MultiTextSlug(request("phone") , request("name") , request('msg'))
                ]);
            
            return $this->SuccessResponse($contact);
        }catch(\Exception $e){
            return $this->ErrorResponse(15001 , $e->getCode() , $e->getMessage());
        }
    }



    /**
     * @error 15002
     * listing contacts
     * @Admin
     */
    public function ListContact () {
        try{
            request()->validate([
                'search' => "nullable"
            ]);

            $contacts = Contact::query();

            // check if search provided
            if(request()->has('search'))
                $contacts->where('slug' , 'like' , '%'. request('search') .'%');

            $contacts->orderby('id' , 'desc');

            return $this->SuccessResponse($this->paginate($contacts));
        }catch(\Exception $e){
            return $this->ErrorResponse(15001 , $e->getCode() , $e->getMessage());
        }
    }
}
