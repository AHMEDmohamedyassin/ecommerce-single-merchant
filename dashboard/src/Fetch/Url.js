export const APP_URL = window.globalConfig?.APP_URL ?? 'http://192.168.1.9:8000';
export const APIv = '/api'

// image url
export const ImageURL = `${APP_URL}${APIv}/image`

// apis

// auth
export const UserDataURL = '/auth/getdata';
export const LoginURL = '/auth/login';
export const LogoutURL = '/auth/logout';

// permission 
export const PermissionListURL = '/permission/list';
export const PermissionUserAttachURL = '/permission/user/attach';
export const RoleCreateURL = "/role/create";
export const RoleUpdateURL = "/role/update";
export const RoleDeleteURL = "/role/delete";
export const RoleListURL = "/role/list";
export const RoleReadURL = "/role/read";
export const RoleUserAttachURL = '/role/user/attach'


// category
export const CategoryCreateURL = '/category/create';
export const CategoryUpdateURL = '/category/update';
export const CategoryDeleteURL = '/category/delete';
export const CategorySearchURL = '/category/search';
export const CategoryDeleteImageURL = '/category/delete/image';
export const TopCategoryCreateURL = '/topcategory/create';
export const TopCategoryAppendURL = '/topcategory/append';
export const TopCategoryDeleteURL = '/topcategory/delete';
export const TopCategoryReadURL = '/topcategory/read';


// product 
export const ProductCreateURL = '/product/create';
export const ProductUpdateURL = '/product/update';
export const ProductDeleteURL = '/product/delete';
export const ProductSearchURL = '/product/search';
export const ProductReadURL = '/product/read';
export const ProductSerialURL = '/product/serial';
export const ProductUploadImageURL = '/product/image/upload';
export const ProductDeleteImageURL = '/product/image/delete';
export const ProductUpdateSubURL = '/product/sub/update'
export const ProductDeleteSubURL = '/product/sub/delete'


// user 
export const UserCreateURL = '/user/create';
export const UserUpdateURL = '/user/update';
export const UserDeleteURL = '/user/delete';
export const UserResetPassURL = '/user/resetpassword/url';
export const UserListURL = '/user/list';
export const UserReadURL = '/user/read';
export const UserDetailURL = '/user/detail';
export const UserAddAddressURL = '/user/add/address'
export const UserUpdateAddressURL = '/user/update/address'
export const UserDeleteAddressURL = '/user/delete/address'


// coupons 
export const CouponCreateURL = "/coupon/create"
export const CouponUpdateURL = "/coupon/update"
export const CouponDeleteURL = "/coupon/delete"
export const CouponReadURL = "/coupon/read"
export const CouponListURL = "/coupon/list"
export const CouponPaidURL = "/coupon/paid"


// store address
export const StoreAddressCreateURL = "/store/create"
export const StoreAddressUpdateURL = "/store/update"
export const StoreAddressDeleteURL = "/store/delete"
export const StoreAddressReadURL = "/store/read"
export const StoreAddressListURL = "/store/list"


// order 
export const OrderCreateURL = '/order/create'
export const OrderListURL = '/order/list'
export const OrderReadURL = '/order/read'
export const OrderStatusURL = '/order/update/status'


// setting
export const SettingListURL = '/setting/list'
export const SettingUpdateURL = '/setting/update'


// blocks 
export const BlockListURL = '/block/list'
export const BlockCreateURL = '/block/create'
export const BlockDisableURL = '/block/disable'
export const BlockUserDisableURL = '/block/user/disable'


// static
export const StaticCreateURL = '/static/create'
export const StaticReadURL = '/static/read'
export const StaticLogoUpdateURL = '/static/logo/update'


// review 
export const ReviewListURL = '/review/admin/list'
export const ReviewPublishURL = '/review/admin/publish'
export const ReviewDeleteURL = '/review/admin/delete'