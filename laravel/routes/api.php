<?php

use App\Http\Controllers\Filters\CategoryController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Users\AuthController;



// Auth controller 1000
Route::post('/auth/login' , [AuthController::class , 'LoginAuth']);
Route::post('/auth/register' , [AuthController::class , 'RegisterAuth']);
Route::middleware('TokenRequiredMiddleware' , 'BlockCheckMiddleware' , 'EmailVerifyMiddleware')->group(function () {
    Route::post('/auth/logout' , [AuthController::class , 'LogoutAuth']);
    Route::post('/auth/getdata' , [AuthController::class , 'GetUserDataAuth']);
    Route::post('/auth/update' , [AuthController::class , 'UpdateAuth']);
    Route::post('/auth/emailverify' , [AuthController::class , 'emailValidationAuth']);
});
Route::post('/auth/forgetpassword' , [AuthController::class , 'passwordForgetAuth']);
Route::post('/auth/passwordreset' , [AuthController::class , 'passwordResetAuth']);
Route::get('/auth/emailverify/{id}/{hash}' , [AuthController::class , 'CheckEmailVerifyTempUrlAuth'])->name('emailverify');


// Category Controller 3000
Route::post('/category/create' , [CategoryController::class , 'CreateCategory']);
Route::post('/category/update' , [CategoryController::class , 'UpdateCategory']);
Route::post('/category/delete/image' , [CategoryController::class , 'DeleteImageCategory']);
Route::post('/category/delete' , [CategoryController::class , 'DeleteCategory']);
Route::get('/category' , [CategoryController::class , 'ReadCategory']);
Route::get('/category/search' , [CategoryController::class , 'SearchCategory']);