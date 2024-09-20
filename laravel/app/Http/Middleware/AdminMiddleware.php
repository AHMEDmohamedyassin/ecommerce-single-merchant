<?php

namespace App\Http\Middleware;

use App\Exceptions\CustomException;
use App\Traits\ResponseTrait;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    use ResponseTrait;

    public function handle(Request $request, Closure $next , $permission): Response
    {

        try{

            // get token from header or from request body
            $token = $request->header('token');
            if(!$token) $token = request('token');

            // check if token is provided
            if(!$token)
                throw new CustomException('token is required' , 2);
    
            // check if token is valid
            $user = auth()->setToken($token)->user();
            if(!$user) throw new CustomException('token is invalid' , 3);
    
            // check if user able to open dashboard
            if(!$user->role()->where('slug' , 'dashboard')->first())
                throw new CustomException('not Authorized Admin' , 19);


            // check if user has required permission or has role includes required permission 
            if(
                !$user->permission()->where('slug' , $permission)->exists() && 
                !$user->role()->whereHas('permission' , function ($query) use ($permission) {
                    $query->where('slug' , $permission);
                } )->exists()
            )
                throw new CustomException('not Authorized Admin' , 19);
            

            return $next($request);
        }catch(\Exception $e){
            return $this->ErrorResponse(1000 , $e->getCode() , $e->getMessage());
        }
    }
}
