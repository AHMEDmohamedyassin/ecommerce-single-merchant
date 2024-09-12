<?php

namespace App\Http\Controllers\Credit;

use App\Models\Coupon;
use App\Models\User;
use App\Traits\PaginateTrait;
use App\Traits\ResponseTrait;
use App\Traits\EncryptionTrait;
use Illuminate\Support\Facades\DB;


/**
 * coupon class
 * provide create , read (with search) , delete ,  use methods
 * no update method , not important
 */
class CouponController{
    use ResponseTrait , PaginateTrait , EncryptionTrait;

    public $elements = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    public $coupon_elements = 10;

    /**
     * @code : 8001
     * coupon create method
     * for create coupons for ADMIN
     */
    public function CreateCoupon(){
        try{
            request()->validate([
                'value' => 'required|integer|between:0,'.env('COUPON_MAX_VALUE' , 100) ,
                'count' => 'integer|min:1'
            ]);
            $data = [];
            $count = request()->has('count') ? request('count') : 1;

            for($j = 0 ; $j < 10 ; $j++){
                $coupon = '';
                for($i = 0 ; $i < $this->coupon_elements ; $i ++ ){
                    $coupon .= $this->elements[random_int(0 , strlen($this->elements) - 1)];
                }

                $data[] = [
                    'coupon' => $this->encrypt($coupon),
                    'value' => $this->encrypt(request('value'))
                ];
            }

            $coupon = Coupon::insert($data);

            return $this->SuccessResponse($data);
        }catch(\Exception $e){
            return $this->ErrorResponse(code:8001 , msg:$e->getMessage());
        }
    }


    /**
     * code : 8002
     * delete coupon if coupon not paid or coupon paid and used
     * not delete coupon if coupon paid and not used
     * for Admin
     */
    public function DeleteCoupon(){
        try{
            request()->validate(['id' => 'required']);

            $coupon = Coupon::find(request('id'));
            if(!$coupon) throw new \Exception('coupon not found' , 18);

            // check if coupon paid but still not used
            if($coupon->paid && !$coupon->user_id)
                throw new \Exception('coupon paid and not used');

            // delete coupon
            $coupon->delete();

            return $this->SuccessResponse();
        }catch(\Exception $e){
            return $this->ErrorResponse(code:8002 , msg:$e->getMessage());
        }
    }

    /**
     * code : 8003
     * showing the coupon for admin
     * showing the decrypted value and coupon
     * @var paid : boolean , @var page , @var used : boolean , @var coupon , @var value
     */
    public function ReadCoupon(){
        try{
            $coupon = new Coupon();

            if(request()->has('coupon'))
                $coupon = $coupon->where('coupon' , $this->encrypt(request('coupon')));

            if(request()->has('value'))
                $coupon = $coupon->where('value' , $this->encrypt(request('value')));

            if(request()->has('paid'))
                $coupon = $coupon->where('paid' , request('paid'));

            if(request()->has('used')){
                if(request('used')) $coupon = $coupon->where('user_id' , '!=' , null);
                if(!request('used')) $coupon = $coupon->whereNull('user_id');
            }

            $coupon = $coupon->orderBy('paid')->orderBy('created_at' , 'desc');
            $coupon = $this->paginate($coupon);

            // decrypt coupons and its values
            $items = [];
            foreach($coupon['items'] as $item){
                $item->coupon = $this->decrypt($item->coupon);
                $item->value = $this->decrypt($item->value);
                $items[] = $item;
            }
            $coupon['items'] = $items;

            return $this->SuccessResponse($coupon);
        }catch(\Exception $e){
            return $this->ErrorResponse(code:8003 , msg:$e->getMessage());
        }
    }

    /**
     * code : 8004
     * using coupon method for users
     * coupon will not work if it is used
     * coupon will work if it is not used
     * @var token , @var coupon
     */
    public function UseCoupon(){
        try{
            // validation
            request()->validate(['token' => 'required' , 'coupon' => 'required']);

            // get user from token
            $user = auth()->setToken(request('token'))->user();
            if(!$user) throw new \Exception('bad token' , 5);


            // check if coupon exists , not used , if not paid coupon will not work it should set be paid to work
            if(!$coupon = Coupon::where('coupon' , $this->encrypt(request('coupon')))->first()) throw new \Exception('coupon is not valid' , 20);
            if($coupon->user_id) throw new \Exception('coupon expired' , 21);


            // begin transaction
            DB::beginTransaction();

            $user->update([
                'money' => $this->encrypt((int)$this->decrypt($user->money) + (int)$this->decrypt($coupon->value))
            ]);

            $coupon->update([
                'user_id' => $user->id,
            ]);

            // commit transaction
            DB::commit();

            $user['money'] = $this->decrypt($user->money);

            return $this->SuccessResponse($user);
        }catch(\Exception $e){
            DB::rollBack();
            return $this->ErrorResponse(code:9004 , msg:$e->getMessage() , msg_code:$e->getCode());
        }
    }
}
