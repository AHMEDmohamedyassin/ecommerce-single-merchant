<?php

use Illuminate\Support\Facades\Route;


// dashboard page 
Route::get('/{path?}', function () {
    return view('Home');
})->where('path', '.*^dashboard');


// the user pages 
Route::get('/dashboard/{path?}', function () {
    return view('Dash');
})->where('path', '.*');