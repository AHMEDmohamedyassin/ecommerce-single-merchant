<?php

namespace App\Http\Middleware;

use App\Exceptions\CustomException;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Traits\ResponseTrait;

class EmailVerifyMiddleware
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
            // get request('user') from TokenRequiredMiddleware
            // email verification check
            
            if(env('REQUIRE_EMAIL_VERIFY') && !request('user')->email_verified_at)
                throw new CustomException('email needs to be verified' , 4);
    
            return $next($request);

        }catch(\Exception $e){
            return $this->ErrorResponse(3000 , $e->getCode() , $e->getMessage());
        }
    }
}
