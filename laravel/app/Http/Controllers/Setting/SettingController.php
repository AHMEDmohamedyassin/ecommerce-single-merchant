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

    /**
     * helper function to get value of setting slug
     * if setting not recorded in database returning the default value in env file
     * if setting not recorded in env file and database throw error
     */
    public function valueSetting ($slug) {
        $val = Setting::where('slug' , $slug)->first()?->value;
        if($val == null) $val = env($slug);

        if($val == null) throw new CustomException('setting is not registered' , 9);

        return $val;
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
            
            $settings = Setting::where([
                'updatable' => 1
            ])->get();

            return $this->SuccessResponse($settings);
        }catch(\Exception $e){
            return $this->ErrorResponse(19002 , $e->getCode() , $e->getMessage());
        }
    }
}
