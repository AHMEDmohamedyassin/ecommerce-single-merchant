<?php

namespace App\Http\Controllers\Setting;

use App\Exceptions\CustomException;
use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Traits\PaginateTrait;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    use ResponseTrait , PaginateTrait;

    public static $user_count = 'user_count' ; 
    public static $visits_count = 'visits_count';
    public static $reviews_count = 'reviews_count';
    public static $products_count = 'products_count';
    public static $orders_count = 'orders_count';

    /**
     * helper function to get value of setting slug
     * if setting not recorded in database returning the default value in env file
     * if setting not recorded in env file and database throw error
     * not routed
     */
    public function valueSetting ($slug) {
        $val = Setting::where('slug' , $slug)->first()?->value;
        if($val == null) $val = env($slug);

        if($val == null) throw new CustomException('setting is not registered' , 9);

        return $val;
    }

    /**
     * updating the settings values 
     * if element not found it will create one
     * not routed
     */
    public static function updateCreateSetting ($label , $increase = true) {
        $setting = Setting::where('slug' , $label)->first();

        // decrease state
        if(!$increase){
            if($setting && $setting->value > 0){
                $setting->update(['value' => $setting->value - 1]);
                return $setting->value;
            }
            return 0;
        }

        // increase state
        if($setting){
            $setting->update(['value' => $setting->value + 1]);
            return $setting->value;
        }

        Setting::create([
            'slug' => $label,
            'value' => 1 , 
        ]);
    }


    /**
     * @error 19,001
     */
    public function UpdateSetting () {
        try{
            request()->validate([
                'id' => 'required|exists:settings,id' ,
                'value' => 'required|max:255|numeric|min:0'
            ]);
            
            // check if setting is updatable
            $setting = Setting::where([
                'id' => request('id') ,
                'updatable' => 1
            ])->first();

            if(!$setting)
                throw new CustomException('setting not found or can not be updated' , 16);

            // update setting
            $setting->update([
                'value' => request('value')
            ]);

            return $this->SuccessResponse($setting);
        }catch(\Exception $e){
            return $this->ErrorResponse(19001 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * @error 19,002
     */
    public function ListSetting () {
        try{

            request()->validate([
                'private' => 'nullable|boolean'
            ]);
            
            $settings = Setting::query();

            if(!request('private' , 0))
                $settings->where('private' , request('private' , 0));

            return $this->SuccessResponse($settings->get());
        }catch(\Exception $e){
            return $this->ErrorResponse(19002 , $e->getCode() , $e->getMessage());
        }
    }
}
