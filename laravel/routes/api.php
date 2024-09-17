<?php

use App\Http\Controllers\Credit\CouponController;
use App\Http\Controllers\Credit\OrderController;
use App\Http\Controllers\Filters\CategoryController;
use App\Http\Controllers\Filters\TopCategoryController;
use App\Http\Controllers\Permissions\PermissionController;
use App\Http\Controllers\Permissions\RoleController;
use App\Http\Controllers\Product\ProductController;
use App\Http\Controllers\Product\ProductImageController;
use App\Http\Controllers\UserExperience\CartController;
use App\Http\Controllers\UserExperience\FavoriteController;
use App\Http\Controllers\UserExperience\ReviewController;
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
Route::post('/topcategory/create' , [TopCategoryController::class , 'CreateTopCategory']);      #admin
Route::post('/topcategory/append' , [TopCategoryController::class , 'AppendCategory']);         #admin
Route::post('/topcategory/delete' , [TopCategoryController::class , 'DeleteTopCategory']);      #admin
Route::get('/topcategory/read' , [TopCategoryController::class , 'ReadTopCategory']);


// Category Controller 3000
Route::post('/category/create' , [CategoryController::class , 'CreateCategory']);               #admin
Route::post('/category/update' , [CategoryController::class , 'UpdateCategory']);               #admin
Route::post('/category/delete/image' , [CategoryController::class , 'DeleteImageCategory']);    #admin
Route::post('/category/delete' , [CategoryController::class , 'DeleteCategory']);               #admin
Route::get('/category' , [CategoryController::class , 'ReadCategory']);
Route::get('/category/search' , [CategoryController::class , 'SearchCategory']);


// Permission Controller 4000
Route::post('/permission/user/attach' , [PermissionController::class , 'AttachUserPermission']);    #admin
Route::get('/permission/list' , [PermissionController::class , 'ListPermission']);                  #admin


// Role Controller 5000
Route::post('/role/create' , [RoleController::class , 'CreateRole']);               #admin
Route::post('/role/delete' , [RoleController::class , 'DeleteRole']);               #admin
Route::post('/role/update' , [RoleController::class , 'UpdateRole']);               #admin
Route::get('/role/list' , [RoleController::class , 'ListRole']);                    #admin
Route::get('/role/read' , [RoleController::class , 'ReadRole']);                    #admin
Route::post('/role/user/attach' , [RoleController::class , 'AttachUserRole']);      #admin


// Address controller 6000  ( addresses for users )
Route::middleware('TokenRequiredMiddleware' , 'BlockCheckMiddleware' , 'EmailVerifyMiddleware')->group(function () {
    Route::post('/address/create' , [AddressController::class , 'CreateAddress']);
    Route::post('/address/update' , [AddressController::class , 'UpdateAddress']);
    Route::post('/address/delete' , [AddressController::class , 'DeleteAddress']);
    Route::get('/address/list' , [AddressController::class , 'ListAddress']);
    Route::get('/address/read' , [AddressController::class , 'ReadAddress']);
});


// Product Controller 7000 
Route::post('/product/create' , [ProductController::class , 'CreateProduct']);  #admin
Route::post('/product/update' , [ProductController::class , 'UpdateProduct']);  #admin
Route::post('/product/delete' , [ProductController::class , 'DeleteProduct']);  #admin
Route::get('/product/search' , [ProductController::class , 'SearchProduct']);
Route::get('/product/read' , [ProductController::class , 'ReadProduct']);


// Product Image Controller 8000
Route::post('/product/image/upload' , [ProductImageController::class , 'UploadImageProduct']);  #admin
Route::post('/product/image/delete' , [ProductImageController::class , 'DeleteImageProduct']);  #admin
Route::get('/product/image/retrieve' , [ProductImageController::class , 'ImageRetrieveProduct']);


// Favorite Controller 9000 
Route::middleware('TokenRequiredMiddleware' , 'BlockCheckMiddleware' , 'EmailVerifyMiddleware')->group(function () {
    Route::post('/favorite/sync' , [FavoriteController::class , 'SyncFavorite']);
    Route::get('/favorite/list' , [FavoriteController::class , 'ListFavorite']);
});


// Cart Controller 10,000
Route::middleware('TokenRequiredMiddleware' , 'BlockCheckMiddleware' , 'EmailVerifyMiddleware')->group(function () {
    Route::post('/cart/add' , [CartController::class , 'AddToCart']);
    Route::post('/cart/sub' , [CartController::class , 'SubFromCart']);
    Route::post('/cart/delete' , [CartController::class , 'DeleteFromCart']);
    Route::post('/cart/delete/all' , [CartController::class , 'DeleteCart']);
    Route::get('/cart/list' , [CartController::class , 'ListCart']);
});


// Review Controller 11,000
Route::middleware('TokenRequiredMiddleware' , 'BlockCheckMiddleware' , 'EmailVerifyMiddleware')->group(function () {
    Route::post('/review/create' , [ReviewController::class , 'CreateReview']);
    Route::post('/review/delete' , [ReviewController::class , 'DeleteReview']);
    Route::get('/review/list' , [ReviewController::class , 'ListReview']);
});
Route::get('/review/product/list' , [ReviewController::class , 'ListProductReview']);
Route::get('/review/admin/list' , [ReviewController::class , 'AdminListReview']);           #admin
Route::post('/review/admin/publish' , [ReviewController::class , 'AdminPublishReview']);    #admin
Route::post('/review/admin/delete' , [ReviewController::class , 'AdminDeleteReview']);      #admin

// Coupon Controller 12,000
Route::post('/coupon/create' , [CouponController::class , 'CreateCoupon']); #admin  
Route::post('/coupon/delete' , [CouponController::class , 'DeleteCoupon']); #admin
Route::post('/coupon/paid' , [CouponController::class , 'PaidStatusCoupon']); #admin
Route::post('/coupon/read' , [CouponController::class , 'ReadCoupon']);     
Route::get('/coupon/list' , [CouponController::class , 'ListCoupon']);      #admin


// Order Controller 13,000
Route::middleware('TokenRequiredMiddleware' , 'BlockCheckMiddleware' , 'EmailVerifyMiddleware')->group(function () {
    Route::post('/order/user/create' , [OrderController::class , 'UserCreateOrder']);
    Route::post('/order/user/cancel' , [OrderController::class , 'UserCancelOrder']);
    Route::get('/order/user/list' , [OrderController::class , 'UserListOrder']);
    Route::get('/order/user/read' , [OrderController::class , 'UserReadOrder']);
});
Route::post('/order/create' , [OrderController::class , 'CreateOrder']);
Route::post('/order/update' , [OrderController::class , 'UpdateOrder']);
Route::post('/order/delete' , [OrderController::class , 'DeleteOrder']);
Route::get('/order/read' , [OrderController::class , 'ReadOrder']);
Route::get('/order/list' , [OrderController::class , 'ListOrder']);