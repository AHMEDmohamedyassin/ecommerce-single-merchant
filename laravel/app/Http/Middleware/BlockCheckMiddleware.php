<?php

namespace App\Http\Middleware;

use App\Exceptions\CustomException;
use App\Traits\ResponseTrait;
use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class BlockCheckMiddleware
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
            
            if(request('user')->block()->where('expire_date' , '>=' , Carbon::now())->first())
                throw new CustomException('user has been blocked' , 22);

            return $next($request);
        }catch(\Exception $e){
            return $this->ErrorResponse(2000 , $e->getCode() , $e->getMessage());
        }

    }
}
