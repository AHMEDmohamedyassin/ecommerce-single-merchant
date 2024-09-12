<?php

namespace App\Http\Middleware;

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
        // check if token is provided
        if(!request('token'))
            return $this->ErrorResponse(2000 , 23 , 'token is required');

        // check if token is valid
        $user = auth()->setToken(request('token'))->user();
        if(!$user) return $this->ErrorResponse(2000 , 5 , 'token is required');

        return $next($request);
    }
}
