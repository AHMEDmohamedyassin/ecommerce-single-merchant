<?php

namespace App\Http\Middleware;

use App\Exceptions\CustomException;
use App\Http\Controllers\Setting\SettingController;
use App\Traits\ResponseTrait;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CouponAvailabilityMiddleware
{
    use ResponseTrait;
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        try{
            
            if(! (new SettingController)->valueSetting('allow_coupon'))
                throw new CustomException('coupons not allowed' , 31);

            return $next($request);
        }catch(\Exception $e){
            return $this->ErrorResponse(5000 , $e->getCode() , $e->getMessage());
        }
    }
}
