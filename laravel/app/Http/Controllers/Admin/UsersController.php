<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Traits\ResponseTrait;
use App\Traits\PaginateTrait;
use App\Traits\EncryptionTrait;
use App\Traits\SlugTrait;
use \Carbon\Carbon;

class UsersController extends Controller
{
    use ResponseTrait , PaginateTrait , EncryptionTrait , SlugTrait;

    /**
     * @code 9001
     * listing users with search feature
     * @var page , @var search
     */
    public function ListUser () {
        try{
            request()->validate(['page' => 'integer' , 'search' => 'nullable']);

            $users = new User();

            if(request('search')){
                $users = $users->where('name' , 'LIKE' , '%'.request('search').'%')
                ->orWhere('phone' , 'LIKE' , '%'.request('search').'%')
                ->orWhere('whatsapp' , 'LIKE' , '%'.request('search').'%')
                ->orWhere('email' , 'LIKE' , '%'.request('search').'%');
            }

            $users = $users->orderBy('id' , 'desc');

            $data = $this->paginate($users , request('page'));

            // decrypt money filed
            $items = [];
            foreach($data['items'] as $item){
                $item['money'] = $this->decrypt($item['money']);
                $items[] = $item;
            }

            return $this->SuccessResponse($data);
        }catch(\Exception $e){
            return $this->ErrorResponse(9001 , msg:$e->getMessage());
        }
    }

    /**
     * @code 9002
     * getting user data
     * method parameters user_id , and details
     * if details value is 1 the method will reture all users details as products , transactions , coupons , ......
     * @var id : user id , @var details : boolean to get details or not
     */
    public function ReadUser(){
        try{
            request()->validate(['id' => 'required|integer' , 'details' => 'boolean']);

            $user = User::find(request('id'));
            if(!$user) throw new \Exception('no user found' , 29);

            if(request()->has('details') && request('details')){
                $details = [];
                $details['blocks'] = $user->block()->orderBy('created_at' , 'desc')->get();
                $details['products'] = $user->product()->orderBy('created_at' , 'desc')->get();
                $details['contact_us'] = $user->contact()->orderBy('created_at' , 'desc')->get();
                $details['complain'] = $user->complain()->orderBy('created_at' , 'desc')->get();
                $details['coupon'] = $user->coupon()->orderBy('created_at' , 'desc')->get();

                $user['details'] = $details;
            }

            return $this->SuccessResponse($user);
        }catch(\Exception $e){
            return $this->ErrorResponse(code:9002 , msg:$e->getMessage());
        }
    }


    /**
     * @code 9003
     * update all user column data
     * adding and subtracting money and encrypt it
     * change store_title and make slug to it
     * @var id , @var columns , @var store_title, @var money
     */
    public function UpdateUser(){
        try{
            $params = request()->validate([
                'id' => 'required|integer' ,
                'columns' => 'array' ,
                'store_title' => 'max:255',
                'money' => 'numeric|max:1000',
            ]);

            if(!$user = User::find(request('id'))) throw new \Exception('user not found');

            $update_array = [];

            if(request('columns'))
                $update_array = array_intersect_key(request('columns') , array_flip(["name","email","phone","whatsapp","is_vendor"]));

            // update on users money
            if(request()->has('money')){
                $update_array['money'] = $this->encrypt((int)request('money') + (int)$this->decrypt($user->money));
            }

            // update store title
            if(request()->has('store_title')){
                $update_array['store_title'] = request('store_title');
                $update_array['store_title_slug'] = $this->CreateSlug(request('store_title'));
            }

            // save updates
            $user->update($update_array);

            // decrypt user money
            $user['money'] = $this->decrypt($user->money);

            return $this->SuccessResponse($user);
        }catch(\Exception $e){
            return $this->ErrorResponse(code: 9003 , msg:$e->getMessage());
        }
    }


    /**
     * @code : 9004
     *  delete user
     * @var id
     */
    public function DeleteUser(){
        try{
            request()->validate(['id' => 'required']);

            $user = User::find(request('id'));
            if(!$user) throw new \Exception('user not found');

            $user->delete();

            return $this->SuccessResponse();
        }catch(\Exception $e){
            return $this->ErrorResponse(code:9004 , msg:$e->getMessage());
        }
    }


    /**
     * Add User To Block List
     * allow optional params : reason , days (no. of block days)
     * allow mandatory params : id (of user)
     * the default number of block days is 30 days
     * @var id , @var reason , @var days
     */
    public function BlockUser(){
        try{
            request()->validate(['id' => 'required|integer' , 'reason' => 'max:255' ,'days' => 'integer']);

            $user = User::find(request('id'));
            if(!$user) throw new \Exception('user not found');

            $date = \Carbon\Carbon::now()->addDays(env('BLOCK_USER_DAYS'));

            if(request('days'))
                $date = \Carbon\Carbon::now()->addDays(request('days'));

            // create block in database
            $user->block()->create([
                'reason' => request('reason')?? null,
                'expire_date' => $date,
            ]);

            $user['blocks'] = $user->block()->orderBy('id' , 'desc')->get();

            return $this->SuccessResponse($user);
        }catch(\Exception $e){
            return $this->ErrorResponse(code: 9005 , msg:$e->getMessage());
        }
    }


    /**
     * remove only the block from user table
     * but the blocks in the user_block table still exists
     */
    public function UnblockUser(){
        try{
            request()->validate(['id' => 'required']);

            $user = User::find(request('id'));
            if(!$user) throw new \Exception('user not found');

            $user->block()->where('expire_date' , '>=' , Carbon::now())->update([
                'expire_date' => Carbon::now()
            ]);

            $user['blocks'] = $user->block()->orderBy('id' , 'desc')->get();

            return $this->SuccessResponse($user);
        }catch(\Exception $e){
            return $this->ErrorResponse(code:9006 , msg:$e->getMessage());
        }
    }
}
