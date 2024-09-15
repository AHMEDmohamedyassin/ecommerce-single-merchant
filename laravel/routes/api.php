<?php

use App\Http\Controllers\Filters\CategoryController;
use App\Http\Controllers\Filters\TopCategoryController;
use App\Http\Controllers\Permissions\PermissionController;
use App\Http\Controllers\Permissions\RoleController;
use App\Http\Controllers\Product\ProductController;
use App\Http\Controllers\Product\ProductImageController;
use App\Http\Controllers\Users\AddressController;
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


// Top Category Controller 2000
Route::post('/topcategory/create' , [TopCategoryController::class , 'CreateTopCategory']);
Route::post('/topcategory/append' , [TopCategoryController::class , 'AppendCategory']);
Route::post('/topcategory/delete' , [TopCategoryController::class , 'DeleteTopCategory']);
Route::get('/topcategory/read' , [TopCategoryController::class , 'ReadTopCategory']);


// Category Controller 3000
Route::post('/category/create' , [CategoryController::class , 'CreateCategory']);
Route::post('/category/update' , [CategoryController::class , 'UpdateCategory']);
Route::post('/category/delete/image' , [CategoryController::class , 'DeleteImageCategory']);
Route::post('/category/delete' , [CategoryController::class , 'DeleteCategory']);
Route::get('/category' , [CategoryController::class , 'ReadCategory']);
Route::get('/category/search' , [CategoryController::class , 'SearchCategory']);


// Permission Controller 4000
Route::post('/permission/user/attach' , [PermissionController::class , 'AttachUserPermission']);
Route::get('/permission/list' , [PermissionController::class , 'ListPermission']);


// Role Controller 5000
Route::post('/role/create' , [RoleController::class , 'CreateRole']);
Route::post('/role/delete' , [RoleController::class , 'DeleteRole']);
Route::post('/role/update' , [RoleController::class , 'UpdateRole']);
Route::get('/role/list' , [RoleController::class , 'ListRole']);
Route::get('/role/read' , [RoleController::class , 'ReadRole']);
Route::post('/role/user/attach' , [RoleController::class , 'AttachUserRole']);


// Address controller 6000  ( addresses for users )
Route::middleware('TokenRequiredMiddleware' , 'BlockCheckMiddleware' , 'EmailVerifyMiddleware')->group(function () {
    Route::post('/address/create' , [AddressController::class , 'CreateAddress']);
    Route::post('/address/update' , [AddressController::class , 'UpdateAddress']);
    Route::post('/address/delete' , [AddressController::class , 'DeleteAddress']);
    Route::get('/address/list' , [AddressController::class , 'ListAddress']);
    Route::get('/address/read' , [AddressController::class , 'ReadAddress']);
});


// Product Controller 7000 
Route::post('/product/create' , [ProductController::class , 'CreateProduct']);
Route::post('/product/update' , [ProductController::class , 'UpdateProduct']);
Route::post('/product/delete' , [ProductController::class , 'DeleteProduct']);
Route::get('/product/search' , [ProductController::class , 'SearchProduct']);
Route::get('/product/read' , [ProductController::class , 'ReadProduct']);


// Product Image Controller 8000
Route::post('/product/image/upload' , [ProductImageController::class , 'UploadImageProduct']);
Route::post('/product/image/delete' , [ProductImageController::class , 'DeleteImageProduct']);
Route::get('/product/image/retrieve' , [ProductImageController::class , 'ImageRetrieveProduct']);