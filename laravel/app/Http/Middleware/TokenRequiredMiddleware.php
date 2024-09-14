<?php

namespace App\Http\Middleware;

use App\Exceptions\CustomException;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Traits\ResponseTrait;

class TokenRequiredMiddleware
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

            // check if token is provided
            if(!request('token'))
                throw new CustomException('token is required' , 2);
    
            // check if token is valid
            $user = auth()->setToken(request('token'))->user();
            if(!$user) throw new CustomException('token is invalid' , 3);
    
            request()->merge([
                'user' => $user
            ]);

            return $next($request);
        }catch(\Exception $e){
            return $this->ErrorResponse(1000 , $e->getCode() , $e->getMessage());
        }
        
    }
}
