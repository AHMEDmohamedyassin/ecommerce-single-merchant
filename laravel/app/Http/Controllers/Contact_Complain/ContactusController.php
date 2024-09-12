<?php

namespace App\Http\Controllers\Contact_Complain;

use App\Models\Contact;
use App\Models\User;
use App\Traits\PaginateTrait;
use App\Traits\ResponseTrait;

/**
 * contact controller
 * have methods : create , delete , read(with search)
 * no need for update method
 * error code : 6000
 */
class ContactusController{
    use ResponseTrait , PaginateTrait;

    /**
     * code : 6001
     * create contact us
     * in case of not authenticated user params : phone , name , content  . must be give
     * in case of authenticated user params : token , content  . must be give
     * @var name , @var content , @var phone , @var token
     */
    public function CreateContact(){
        try{
            // validation incase of token and not
            if(!request('token'))
                request()->validate(['phone' => 'required|max:20' , 'name' => 'required|max:20' , 'content' => 'required|max:500']);
            request()->validate(['content' => 'required|max:500']);

            $data = [];

            if(request('token')){
                $user = auth()->setToken(request('token'))->user();
                if(!$user) throw new \Exception('bad token' , 5);
                $data = ['phone' => $user->phone , 'name' => $user->name , 'user_id' => $user->id];
            }else
                $data = ['phone' => request('phone') , 'name' => request('name') ];

            $data['content'] = request('content');

            $contact = Contact::create($data);

            return $this->SuccessResponse($contact);
        }catch(\Exception $e){
            return $this->ErrorResponse(code:6001 , msg:$e->getMessage() , msg_code:$e->getCode());
        }
    }


    /**
     * code : 6002
     * get all contact us messages in pagination for admin
     * if request(read ) not assigned all contacts will be retreived
     * @var search , @var read : boolean
     */
    public function ReadContact(){
        try{
            request()->validate(['search' => 'max:255' , 'read' => 'boolean']);

            $contact = new Contact();
            $search = request('search');

            // select read or not
            if(request()->has('read'))
                $contact = $contact->where('read' , request('read'));

            // search for text
            if(request('search')){
                $contact = $contact->where(function ($query) use($search){
                    $query->where('phone' , 'LIKE' , '%'.request('search').'%')
                    ->orWhere('name' , 'LIKE' , '%'.request('search').'%')
                    ->orWhere('content' , 'LIKE' , '%'.request('search').'%');
                });
            }

            $contact = $contact->orderBy('created_at' , 'desc');

            return $this->SuccessResponse($this->paginate($contact));
        }catch(\Exception $e){
            return $this->ErrorResponse(code:6002 , msg:$e->getMessage());
        }
    }

    /**
     * code : 6003
     * delete Contact  for admin
     * @var id
     */
    public function DeleteContact(){
        try{
            request()->validate(['id' => 'required']);

            $contact = Contact::find(request('id'));
            if(!$contact) throw new \Exception('contact not found' ,);

            $contact->delete();

            return $this->SuccessResponse();
        }catch(\Exception $e){
            return $this->ErrorResponse(code:6003 , msg:$e->getMessage());
        }
    }


    /**
     * code : 6004
     * mark contact as read
     * @var id
     */
    public function MarkReadContact(){
        try{
            request()->validate(['id' => 'required']);

            $contact = Contact::find(request('id'));
            if(!$contact) throw new \Exception('contact not found' ,);

            $contact->update([
                'read' => $contact->read == 1 ? 0 : 1
            ]);

            return $this->SuccessResponse($contact);
        }catch(\Exception $e){
            return $this->ErrorResponse(code:6003 , msg:$e->getMessage());
        }
    }
}
