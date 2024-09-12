<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Users\AuthController;
use App\Http\Controllers\Users\StoreController;
use App\Http\Controllers\Product\ProductController;
use App\Http\Controllers\Product\ProductPublicController;
use App\Http\Controllers\Filters\CategoryController;
use App\Http\Controllers\Filters\TagController;
use App\Http\Controllers\Contact_Complain\ComplainController;
use App\Http\Controllers\Contact_Complain\ContactusController;
use App\Http\Controllers\Credit\CouponController;
use App\Http\Controllers\Admin\UsersController;
use App\Http\Controllers\Static\StaticController;
use App\Http\Controllers\Static\SettingController;


// Auth controller 1000
Route::post('/auth/login' , [AuthController::class , 'LoginAuth']);
Route::post('/auth/register' , [AuthController::class , 'RegisterAuth']);
Route::post('/auth/logout' , [AuthController::class , 'LogoutAuth']);
Route::post('/auth/update' , [AuthController::class , 'UpdateAuth']);
Route::post('/auth/getdata' , [AuthController::class , 'GetUserDataAuth']);
Route::post('/auth/forgetpassword' , [AuthController::class , 'passwordForgetAuth']);
Route::post('/auth/passwordreset' , [AuthController::class , 'passwordResetAuth']);
Route::post('/auth/emailverify' , [AuthController::class , 'emailValidationAuth']);
Route::get('/auth/emailverify/{id}/{hash}' , [AuthController::class , 'CheckEmailVerifyTempUrlAuth'])->name('emailverify');

// Product Controller 2000
Route::middleware(['tokenRequired'])->group(function (){
    Route::middleware(['emailVerify'])->group(function () {
        Route::post('/product/create' , [ProductController::class , 'CreateProduct']);
        Route::post('/product/update' , [ProductController::class , 'UpdateProduct']);
        Route::post('/product/delete/media' , [ProductController::class , 'DeleteProductMedia']);
        Route::post('/product/delete' , [ProductController::class , 'DeleteProduct']);
        Route::post('/product/republish' , [ProductController::class , 'RepublishProduct']);
        Route::post('/product/special' , [ProductController::class , 'SepcialProduct']);
        Route::post('/product/user' , [ProductController::class , 'UserProducts']);
    });

    Route::post('/product/evaluate' , [ProductController::class , 'EvaluateProduct']);
    Route::post('/product/favorites' , [ProductController::class , 'UserFavorites']);
    Route::post('/product/favorites/attach' , [ProductController::class , 'AddProductToFavorites']);
});

// public product controller 5000
Route::post('/product/read' , [ProductPublicController::class , 'ReadProduct']);
Route::post('/product/search' , [ProductPublicController::class , 'SearchProduct']);
Route::post('/product/ids' , [ProductPublicController::class , 'WithIdsProduct']);
Route::post('/product/highestratting' , [ProductPublicController::class , 'HighestRattedProduct']);
Route::post('/product/store' , [ProductPublicController::class , 'StoreProducts']);
Route::post('/product/cat/tag' , [ProductPublicController::class , 'CatTagProducts']);

// Categroy Controller 3000
Route::middleware(['admin'])->group(function () {
    Route::post('/category/create' , [CategoryController::class , 'CreateCategory']);
    Route::post('/category/update' , [CategoryController::class , 'UpdateCategory']);
    Route::post('/category/delete/image' , [CategoryController::class , 'DeleteImageCategory']);
    Route::post('/category/delete' , [CategoryController::class , 'DeleteCategory']);
});
Route::post('/category/read' , [CategoryController::class , 'ReadCategory']);
Route::post('/category/search' , [CategoryController::class , 'SearchCategory']);
Route::post('/category/ids' , [CategoryController::class , 'WithIdsCategory']);

// tag Controller 4000
Route::middleware(['admin'])->group(function () {
    Route::post('/tag/create' , [TagController::class , 'CreateTag']);
    Route::post('/tag/update' , [TagController::class , 'UpdateTag']);
    Route::post('/tag/delete/image' , [TagController::class , 'DeleteImageTag']);
    Route::post('/tag/delete' , [TagController::class , 'DeleteTag']);
});
Route::post('/tag/read' , [TagController::class , 'ReadTag']);
Route::post('/tag/search' , [TagController::class , 'SearchTag']);
Route::post('/tag/ids' , [TagController::class , 'WithIdsTag']);

// contact controller 6000
Route::post('contact/create' , [ContactusController::class , 'CreateContact']);
Route::middleware(['admin'])->group(function () {
    Route::post('contact/read' , [ContactusController::class , 'ReadContact']);
    Route::post('contact/delete' , [ContactusController::class , 'DeleteContact']);
    Route::post('contact/mark/read' , [ContactusController::class , 'MarkReadContact']);
});

// complain controller 7000
Route::post('complain/create' , [ComplainController::class , 'CreateComplain']);
Route::post('complain/read' , [ComplainController::class , 'ReadComplain']);
Route::post('complain/delete' , [ComplainController::class , 'DeleteComplain']);
Route::post('complain/mark/read' , [ComplainController::class , 'MarkReadComplain']);

// coupons Controller 8000
Route::middleware(['admin'])->group(function () {
    Route::post('coupon/create' , [CouponController::class , 'CreateCoupon']);
    Route::post('coupon/delete' , [CouponController::class , 'DeleteCoupon']);
    Route::post('coupon/read' , [CouponController::class , 'ReadCoupon']);
});
Route::post('coupon/use' , [CouponController::class , 'UseCoupon']);

// Admin/Users 9000
Route::middleware(['admin'])->group(function () {
    Route::post('/user/list' , [UsersController::class , 'ListUser']);
    Route::post('/user/read' , [UsersController::class , 'ReadUser']);
    Route::post('/user/update' , [UsersController::class , 'UpdateUser']);
    Route::post('/user/delete' , [UsersController::class , 'DeleteUser']);
    Route::post('/user/block' , [UsersController::class , 'BlockUser']);
    Route::post('/user/unblock' , [UsersController::class , 'UnblockUser']);
});


// StoreController 10,000
Route::middleware(['tokenRequired' , 'emailVerify'])->group(function () {
    Route::post('/store/image/add' , [StoreController::class , 'AddImageOfStore']);
    Route::post('/store/image/remove' , [StoreController::class , 'RemoveImageOfStore']);
    Route::post('/store/json' , [StoreController::class , 'WriteJsonStore']);
});
Route::post('/store/read' , [StoreController::class , 'GetDataStore']);


// Static Controller 11,000
Route::middleware(['admin'])->group(function () {
    Route::post('/static/create' , [StaticController::class , 'CreateFileStatic']);
    Route::post('/static/image/store' , [StaticController::class , 'StoreImageStatic']);
});
Route::post('/static/read' , [StaticController::class , 'ReadFileStatic']);


// Setting Controller 12,000
Route::post('/setting/read' , [SettingController::class , 'ReadSetting']);
