<?php

namespace App\Http\Middleware;

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
        $user = auth()->setToken(request('token'))->user();

        // email verification check
        if(env('REQUIRE_EMAIL_VERIFY') && !$user->email_verified_at)
            return $this->ErrorResponse(2000 , 31 , 'email needs to be verified');

        return $next($request);
    }
}
