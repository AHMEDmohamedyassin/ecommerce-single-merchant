<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Traits\ResponseTrait;

class AdminMiddlware
{
    use ResponseTrait;
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(env('APP_DEBUG')) return $next($request);

        if(request()->header('token_A') != env('token_A') || request()->header('token_B') != env('token_B'))
            return $this->ErrorResponse('_1000' , 24 , 'admin tokens is not correct');

        return $next($request);
    }
}
