<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;

class GetUserToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {


        $token = PersonalAccessToken::findToken($request->token);

        if(!$token){
            return response()->json(["code" => 401]);
        }

        $user = $token->tokenable;

        if(!$user){
            return response()->json(["code" => 401]);
        }
        
        return $next($request);
    
        
    }
}
