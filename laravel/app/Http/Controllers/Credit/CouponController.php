<?php

namespace App\Http\Controllers\Credit;

use App\Exceptions\CustomException;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Setting\SettingController;
use App\Models\Coupon;
use App\Traits\EncryptionTrait;
use App\Traits\PaginateTrait;
use App\Traits\ResponseTrait;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CouponController extends Controller
{
    use ResponseTrait , PaginateTrait , EncryptionTrait;
    
    private $elements = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789";
    private $coupon_length = 10;

    /**
     * @error 12001
     * create coupon
     * @Admin
     */
    public function CreateCoupon () {
        try{
            $max_days = (new SettingController())->valueSetting('coupon_valid_days');
            $max_value = (new SettingController())->valueSetting('coupon_max_value');

            $req = request()->validate([
                'value' => "numeric|required|min:1|max:{$max_value}" ,
                'expire_date' => "nullable|numeric|min:1|max:{$max_days}"
            ]);

            // creating coupon
            $uuid = '';
            for($i=0 ; $i < $this->coupon_length; $i++)
                $uuid .= $this->elements[rand(0 , strlen($this->elements) - 1 )];

            // encrypting the coupon
            $coupon_encrypt = $this->encrypt($uuid , env('ENCRYPTION_PASSWORD'));
            $coupon_hashed = hash('sha256', $uuid);

            // save coupon to database
            $coupon = Coupon::create([
                'coupon_encrypt' => $coupon_encrypt,
                'coupon_hash' => $coupon_hashed,
                'value' => request('value'),
                'expire_date' => Carbon::now()->addDays(request('expire_date' , $max_days))
            ]);

            return $this->SuccessResponse($coupon);
        }catch(\Exception $e){
            return $this->ErrorResponse(12001 , $e->getCode() , $e->getMessage());
        }
    }


    
    /**
     * @error 12002
     * Delete coupon
     * @Admin
     */
    public function DeleteCoupon () {
        try{
            request()->validate(['id' => 'required|exists:coupons,id']);

            $coupon = Coupon::select('id' , 'paid' , 'user_id' , 'value' , 'expire_date')->where([
                'id' => request('id') ,
                'paid' => 0,
                'user_id' => null
            ])->first();

            if(!$coupon)
                throw new CustomException('coupon not found' , 12);

            $coupon->delete();

            return $this->SuccessResponse($coupon);
        }catch(\Exception $e){
            return $this->ErrorResponse(12002 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * @error 12003
     * change paid status of coupon
     * @Admin
     */
    public function PaidStatusCoupon () {
        try{
            request()->validate([
                'id' => ['exists:coupons,id'],
            ]);

            $coupon = Coupon::select('id' , 'value' , 'paid')->find(request('id'));

            $coupon->update([
                'paid' => !$coupon->paid
            ]);

            return $this->SuccessResponse($coupon);
        }catch(\Exception $e){
            return $this->ErrorResponse(12003 , $e->getCode() , $e->getMessage());
        }
    }



    /**
     * @error 12004
     * Read coupon
     * getting coupon data by the coupon itself if it is not used or expired
     * getting coupon data by its id 
     * @Admin
     */
    public function ReadCoupon () {
        try{
            request()->validate([
                'id' => ['exists:coupons,id' , Rule::requiredIf(request('coupon') == null)],
                'coupon' => [Rule::requiredIf(request('id') == null)]
            ]);

            $coupon = new Coupon();

            if(request()->has('id'))
                $coupon = $coupon->find(request('id'));
            else 
                $coupon = $coupon->where('coupon_hash' , hash('sha256', request('coupon')) )
                                    ->where('user_id' , null)
                                    ->where('expire_date' , '>' , Carbon::now())->first();

            
            if(!$coupon)
                throw new CustomException('coupon not found or expired' , 23);
            
            // check if customer reusing the used coupon 
            if(request('coupon') && $coupon->is_used)
                throw new CustomException('coupon not found or expired' , 23);

            $data = [
                "value" => $coupon->value,
                "coupon" => $this->decrypt($coupon->coupon_encrypt , env('ENCRYPTION_PASSWORD'))
            ];


            return $this->SuccessResponse($data);
        }catch(\Exception $e){
            return $this->ErrorResponse(12004 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * @error 12005
     * list coupon
     * @Admin
     */
    public function ListCoupon () {
        try{
            request()->validate([
                'orderby' => 'nullable|in:paid,is_used,value,id,created_at,updated_at,expire_date',
                'order' => 'nullable|in:desc,asc'
            ]);

            $coupon = new Coupon();

            return $this->SuccessResponse($this->paginate($coupon->orderby(request('orderby' , "id") , request('order' , 'desc'))));
        }catch(\Exception $e){
            return $this->ErrorResponse(12005 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * using coupon
     * routless method
     * @var the_cop : coupon , @var user_id user id if available
     */
    public function UseCoupon ($the_cop = null , $user_id = null) {
        $coupon = Coupon::whereNull('user_id')->where('is_used' , 0)
            ->where('expire_date' , '>' , Carbon::now())
            ->where('coupon_hash' , hash('sha256', $the_cop) )->first();
        if(!$coupon)
            return false;

        // update coupon status as used
        $coupon->update([
            'is_used' => 1,
            'user_id' => $user_id
        ]);

        return $coupon;
    }



}
