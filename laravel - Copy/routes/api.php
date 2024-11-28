<?php

use App\Http\Controllers\Admin\BlockController;
use App\Http\Controllers\Admin\StaticController;
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
use App\Http\Controllers\Setting\ImageController;
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
Route::post('/auth/visit' , [AuthController::class , 'visitAuth']);


// Top Category Controller 2000
Route::post('/topcategory/create' , [TopCategoryController::class , 'CreateTopCategory'])->middleware("AdminMiddleware:top_category_create");      #admin
Route::post('/topcategory/append' , [TopCategoryController::class , 'AppendCategory'])->middleware("AdminMiddleware:top_category_append");         #admin
Route::post('/topcategory/delete' , [TopCategoryController::class , 'DeleteTopCategory'])->middleware("AdminMiddleware:top_category_delete");      #admin
Route::get('/topcategory/read' , [TopCategoryController::class , 'ReadTopCategory']);


// Category Controller 3000
Route::post('/category/create' , [CategoryController::class , 'CreateCategory'])->middleware("AdminMiddleware:category_create");               #admin
Route::post('/category/update' , [CategoryController::class , 'UpdateCategory'])->middleware("AdminMiddleware:category_update");               #admin
Route::post('/category/delete/image' , [CategoryController::class , 'DeleteImageCategory'])->middleware("AdminMiddleware:category_delete_image");    #admin
Route::post('/category/delete' , [CategoryController::class , 'DeleteCategory'])->middleware("AdminMiddleware:category_delete");               #admin
Route::get('/category' , [CategoryController::class , 'ReadCategory']);
Route::get('/category/search' , [CategoryController::class , 'SearchCategory']);


// Permission Controller 4000
Route::post('/permission/user/attach' , [PermissionController::class , 'AttachUserPermission'])->middleware("AdminMiddleware:permission_attach_user");    #admin
Route::get('/permission/list' , [PermissionController::class , 'ListPermission'])->middleware("AdminMiddleware:permission_list");                  #admin


// Role Controller 5000
Route::post('/role/create' , [RoleController::class , 'CreateRole'])->middleware("AdminMiddleware:role_create");               #admin
Route::post('/role/delete' , [RoleController::class , 'DeleteRole'])->middleware("AdminMiddleware:role_delete");               #admin
Route::post('/role/update' , [RoleController::class , 'UpdateRole'])->middleware("AdminMiddleware:role_update");               #admin
Route::get('/role/list' , [RoleController::class , 'ListRole'])->middleware("AdminMiddleware:role_list");                    #admin
Route::get('/role/read' , [RoleController::class , 'ReadRole'])->middleware("AdminMiddleware:role_read");                    #admin
Route::post('/role/user/attach' , [RoleController::class , 'AttachUserRole'])->middleware("AdminMiddleware:role_attach_user");      #admin


// Address controller 6000  ( addresses for users )
Route::middleware('TokenRequiredMiddleware' , 'BlockCheckMiddleware' , 'EmailVerifyMiddleware')->group(function () {
    Route::post('/address/create' , [AddressController::class , 'CreateAddress']);
    Route::post('/address/update' , [AddressController::class , 'UpdateAddress']);
    Route::post('/address/delete' , [AddressController::class , 'DeleteAddress']);
    Route::get('/address/list' , [AddressController::class , 'ListAddress']);
    Route::get('/address/read' , [AddressController::class , 'ReadAddress']);
});


// Product Controller 7000 
Route::post('/product/create' , [ProductController::class , 'CreateProduct'])->middleware("AdminMiddleware:product_create");  #admin
Route::post('/product/update' , [ProductController::class , 'UpdateProduct'])->middleware("AdminMiddleware:product_update");  #admin
Route::post('/product/delete' , [ProductController::class , 'DeleteProduct'])->middleware("AdminMiddleware:product_delete");  #admin
Route::get('/product/search' , [ProductController::class , 'SearchProduct']);
Route::get('/product/read' , [ProductController::class , 'ReadProduct']);
Route::get('/product/serial' , [ProductController::class , 'SerialReadProduct'])->middleware("AdminMiddleware:product_serial"); #admin
Route::post('/product/sub/update' , [ProductController::class , 'UpdateSubProduct'])->middleware("AdminMiddleware:product_update"); #admin
Route::post('/product/sub/delete' , [ProductController::class , 'DeleteSubProduct'])->middleware("AdminMiddleware:product_delete"); #admin
Route::get('/product/ids' , [ProductController::class , 'WithIdsProduct']);


// Product Image Controller 8000
Route::post('/product/image/upload' , [ProductImageController::class , 'UploadImageProduct'])->middleware("AdminMiddleware:product_image_upload");  #admin
Route::post('/product/image/delete' , [ProductImageController::class , 'DeleteImageProduct'])->middleware("AdminMiddleware:product_image_delete");  #admin


// Favorite Controller 9000 
Route::middleware('TokenRequiredMiddleware' , 'BlockCheckMiddleware' , 'EmailVerifyMiddleware')->group(function () {
    Route::post('/favorite/sync' , [FavoriteController::class , 'SyncFavorite']);
    Route::get('/favorite/list' , [FavoriteController::class , 'ListFavorite']);
    Route::post('/favorite/check' , [FavoriteController::class , 'CheckFavorite']);
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
Route::get('/review/admin/list' , [ReviewController::class , 'AdminListReview'])->middleware("AdminMiddleware:review_list");           #admin
Route::post('/review/admin/publish' , [ReviewController::class , 'AdminPublishReview'])->middleware("AdminMiddleware:review_publish");    #admin
Route::post('/review/admin/delete' , [ReviewController::class , 'AdminDeleteReview'])->middleware("AdminMiddleware:review_delete");      #admin

// Coupon Controller 12,000
Route::post('/coupon/create' , [CouponController::class , 'CreateCoupon'])->middleware("AdminMiddleware:coupon_create"); #admin  
Route::post('/coupon/delete' , [CouponController::class , 'DeleteCoupon'])->middleware("AdminMiddleware:coupon_delete"); #admin
Route::post('/coupon/paid' , [CouponController::class , 'PaidStatusCoupon'])->middleware("AdminMiddleware:coupon_paid_status"); #admin
Route::post('/coupon/read' , [CouponController::class , 'ReadCoupon'])->middleware("AdminMiddleware:coupon_read");       #admin
Route::get('/coupon/list' , [CouponController::class , 'ListCoupon'])->middleware("AdminMiddleware:coupon_list");      #admin


// Order Controller 13,000
Route::middleware('TokenRequiredMiddleware' , 'BlockCheckMiddleware' , 'EmailVerifyMiddleware')->group(function () {
    Route::post('/order/user/create' , [UserOrderController::class , 'UserCreateOrder']);
    Route::post('/order/user/cancel' , [UserOrderController::class , 'UserCancelOrder']);
    Route::get('/order/user/list' , [UserOrderController::class , 'UserListOrder']);
    Route::get('/order/user/read' , [UserOrderController::class , 'UserReadOrder']);
});

// Admin Orders Controller 14,000
Route::post('/order/create' , [AdminOrderController::class , 'CreateOrder'])->middleware("AdminMiddleware:order_create");   #admin
Route::post('/order/update/status' , [AdminOrderController::class , 'StatusOrder'])->middleware("AdminMiddleware:order_update_status");    #admin
Route::get('/order/read' , [AdminOrderController::class , 'ReadOrder'])->middleware("AdminMiddleware:order_read");    #admin
Route::get('/order/list' , [AdminOrderController::class , 'ListOrder'])->middleware("AdminMiddleware:order_list");    #admin


// Contacts Controller 15,000
Route::post('/contact/create' , [ContactController::class , 'CreateContact']); 
Route::get('/contact/list' , [ContactController::class , 'ListContact'])->middleware("AdminMiddleware:contact_list");   #admin


// Block Controller 16,000
Route::post('/block/create' , [BlockController::class , 'CreateBlock'])->middleware("AdminMiddleware:block_create");    #admin
Route::post('/block/disable' , [BlockController::class , 'DisableBlock'])->middleware("AdminMiddleware:block_disable");  #admin
Route::post('/block/user/disable' , [BlockController::class , 'DisableUserBlock'])->middleware("AdminMiddleware:block_user_disable"); #admin
Route::get('/block/list' , [BlockController::class , 'ListBlock'])->middleware("AdminMiddleware:block_list");                 #admin


// Users Controller 17,000
Route::post('/user/create' , [UserController::class , 'CreateUser'])->middleware("AdminMiddleware:user_create");   #admin
Route::post('/user/update' , [UserController::class , 'UpdateUser'])->middleware("AdminMiddleware:user_update");   #admin
Route::post('/user/resetpassword/url' , [UserController::class , 'RestPasswordUser'])->middleware("AdminMiddleware:user_reset_password");  #admin
Route::post('/user/delete' , [UserController::class , 'DeleteUser'])->middleware("AdminMiddleware:user_delete");   #admin
Route::get('/user/list' , [UserController::class , 'ListUser'])->middleware("AdminMiddleware:user_list");    #admin
Route::get('/user/read' , [UserController::class , 'ReadUser'])->middleware("AdminMiddleware:user_read");    #admin
Route::get('/user/detail' , [UserController::class , 'DetailUser'])->middleware("AdminMiddleware:user_detail");    #admin
Route::post('/user/add/address' , [UserController::class , 'AddAddressUser'])->middleware("AdminMiddleware:user_add_address");  #admin
Route::post('/user/delete/address' , [UserController::class , 'DeleteAddressUser'])->middleware("AdminMiddleware:user_delete_address");    #admin
Route::post('/user/update/address' , [UserController::class , 'UpdateAddressUser'])->middleware("AdminMiddleware:user_update_address");    #admin


// Store Controller 18,000
Route::post('/store/create' , [StoreController::class , 'CreateStore'])->middleware("AdminMiddleware:store_create");    #admin
Route::post('/store/update' , [StoreController::class , 'UpdateStore'])->middleware("AdminMiddleware:store_update");    #admin
Route::post('/store/delete' , [StoreController::class , 'DeleteStore'])->middleware("AdminMiddleware:store_delete");    #admin
Route::get('/store/list' , [StoreController::class , 'ListStore']);
Route::get('/store/read' , [StoreController::class , 'ReadStore']);


// Setting Controller 19,000
Route::post('/setting/update' , [SettingController::class , 'UpdateSetting'])->middleware("AdminMiddleware:setting_update");  #admin
Route::get('/setting/list' , [SettingController::class , 'ListSetting'])->middleware("AdminMiddleware:setting_list");       #admin


// Fawaterk Controller 20,000
Route::middleware('TokenRequiredMiddleware' , 'BlockCheckMiddleware' , 'EmailVerifyMiddleware')->group(function () {
    Route::post('/transaction/fawaterk/sendpayment' , [FawaterkController::class , 'SendPayment']);
    Route::get('/transaction/list' , [FawaterkController::class , 'ListPayment']);
});
Route::post('/transaction/fawaterk/callback' , [FawaterkController::class , 'CallbackPayment']);   // not tested


// Image Controller 21,000
Route::get('/image' , [ImageController::class , 'ImageSetting'])->name('image_url');


// static controller 22,000
Route::post('/static/create' , [StaticController::class , 'CreateStatic'])->middleware("AdminMiddleware:static_create");  #admin
Route::get('/static/read' , [StaticController::class , 'ReadStatic']);
Route::post('/static/logo/update' , [StaticController::class , 'LogoUpdate'])->middleware("AdminMiddleware:logo_update");  #admin