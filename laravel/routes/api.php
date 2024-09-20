<?php

use App\Http\Controllers\Admin\BlockController;
use App\Http\Controllers\Admin\StoreController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Credit\AdminOrderController;
use App\Http\Controllers\Credit\CouponController;
use App\Http\Controllers\Credit\UserOrderController;
use App\Http\Controllers\Credit\FawaterkController;
use App\Http\Controllers\Filters\CategoryController;
use App\Http\Controllers\Filters\TopCategoryController;
use App\Http\Controllers\Permissions\PermissionController;
use App\Http\Controllers\Permissions\RoleController;
use App\Http\Controllers\Product\ProductController;
use App\Http\Controllers\Product\ProductImageController;
use App\Http\Controllers\Setting\SettingController;
use App\Http\Controllers\UserExperience\CartController;
use App\Http\Controllers\UserExperience\FavoriteController;
use App\Http\Controllers\UserExperience\ReviewController;
use App\Http\Controllers\Users\AddressController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Users\AuthController;
use App\Http\Controllers\Users\ContactController;

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
Route::post('/coupon/read' , [CouponController::class , 'ReadCoupon']);       #admin
Route::get('/coupon/list' , [CouponController::class , 'ListCoupon']);      #admin


// Order Controller 13,000
Route::middleware('TokenRequiredMiddleware' , 'BlockCheckMiddleware' , 'EmailVerifyMiddleware')->group(function () {
    Route::post('/order/user/create' , [UserOrderController::class , 'UserCreateOrder']);
    Route::post('/order/user/cancel' , [UserOrderController::class , 'UserCancelOrder']);
    Route::get('/order/user/list' , [UserOrderController::class , 'UserListOrder']);
    Route::get('/order/user/read' , [UserOrderController::class , 'UserReadOrder']);
});

// Admin Orders Controller 14,000
Route::post('/order/create' , [AdminOrderController::class , 'CreateOrder']);
Route::post('/order/update/status' , [AdminOrderController::class , 'StatusOrder']);
Route::get('/order/read' , [AdminOrderController::class , 'ReadOrder']);
Route::get('/order/list' , [AdminOrderController::class , 'ListOrder']);


// Contacts Controller 15,000
Route::post('/contact/create' , [ContactController::class , 'CreateContact']); 
Route::get('/contact/list' , [ContactController::class , 'ListContact']); 


// Block Controller 16,000
Route::post('/block/create' , [BlockController::class , 'CreateBlock']);
Route::post('/block/disable' , [BlockController::class , 'DisableBlock']);
Route::post('/block/user/disable' , [BlockController::class , 'DisableUserBlock']);
Route::get('/block/list' , [BlockController::class , 'ListBlock']);


// Users Controller 17,000
Route::post('/user/create' , [UserController::class , 'CreateUser']);
Route::post('/user/update' , [UserController::class , 'UpdateUser']);
Route::post('/user/resetpassword/url' , [UserController::class , 'RestPasswordUser']);
Route::post('/user/delete' , [UserController::class , 'DeleteUser']);
Route::get('/user/list' , [UserController::class , 'ListUser']);
Route::get('/user/read' , [UserController::class , 'ReadUser']);
Route::get('/user/detail' , [UserController::class , 'DetailUser']);
Route::post('/user/add/address' , [UserController::class , 'AddAddressUser']);
Route::post('/user/delete/address' , [UserController::class , 'DeleteAddressUser']);
Route::post('/user/update/address' , [UserController::class , 'UpdateAddressUser']);


// Store Controller 18,000
Route::post('/store/create' , [StoreController::class , 'CreateStore']);;
Route::post('/store/update' , [StoreController::class , 'UpdateStore']);
Route::post('/store/delete' , [StoreController::class , 'DeleteStore']);
Route::get('/store/list' , [StoreController::class , 'ListStore']);


// Setting Controller 19,000
Route::post('/setting/update' , [SettingController::class , 'UpdateSetting']);
Route::get('/setting/list' , [SettingController::class , 'ListSetting']);


// Fawaterk Controller 20,000
Route::middleware('TokenRequiredMiddleware' , 'BlockCheckMiddleware' , 'EmailVerifyMiddleware')->group(function () {
    Route::post('/transaction/fawaterk/sendpayment' , [FawaterkController::class , 'SendPayment']);
    Route::get('/transaction/list' , [FawaterkController::class , 'ListPayment']);
});
Route::post('/transaction/fawaterk/callback' , [FawaterkController::class , 'CallbackPayment']);   // not tested