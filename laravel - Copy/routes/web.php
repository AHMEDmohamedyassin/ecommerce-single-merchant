<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Controller;


// dashboard page 
Route::get('/{path?}', function () {
    return view('Home');
})->where('path', '.*^dashboard');


// the website pages 
Route::get('/dashboard/{path?}', function () {
    return view('Dash');
})->where('path' , '.*');


// product page
Route::get('/product/{id}' , [Controller::class , 'ProductPage'] )->name('product_page');