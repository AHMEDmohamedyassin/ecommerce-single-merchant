<?php

namespace App\Http\Controllers\Setting;

use App\Exceptions\CustomException;
use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{

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
}
