<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Controller;

// all website pages 
Route::get('/{path?}', [Controller::class , 'HomePage'])
->where('path', '^(?!dashboard(/.*)?$)(?!product/\d+(/.*)$).*');


// the dashboard 
Route::get('/dashboard/{path?}', function () {
    return view('Dash');
})->where('path' , '^.*');


// product page
Route::get('/product/{id}/{slug?}' , [Controller::class , 'ProductPage'] )->name('product_page');
