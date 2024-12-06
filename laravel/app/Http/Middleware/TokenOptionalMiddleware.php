<?php

namespace App\Http\Middleware;

use App\Exceptions\CustomException;
use App\Traits\ResponseTrait;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TokenOptionalMiddleware
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

            // get token from header or from request body
            $token = $request->header('token');
            if(!$token) $token = request('token');

            if($token){
                // check if token is valid
                $user = auth()->setToken($token)->user();
                if($user){
                    request()->merge([
                        'user' => $user
                    ]);

                    return $next($request);
                }
            }

            request()->merge([
                'user' => null
            ]);
    

            return $next($request);
        }catch(\Exception $e){
            return $this->ErrorResponse(4000 , $e->getCode() , $e->getMessage());
        }
        
    }
}
