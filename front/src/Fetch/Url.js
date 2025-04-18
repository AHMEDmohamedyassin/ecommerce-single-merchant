export const APP_URL = window.globalConfig?.APP_URL ?? 'http://192.168.1.9:8000';
export const APIv = '/api'

// apis

// images
export const ImageURL = `${APP_URL}${APIv}/image?`
export const ProductImageURL = `${ImageURL}type=product&`

// auth
export const LoginURL = '/auth/login';
export const RegisterURL = '/auth/register';
export const ForgetPasswordURL = '/auth/forgetpassword';
export const ResetPasswordURL = '/auth/passwordreset';
export const UserDataURL = '/auth/getdata';
export const LogoutURL = '/auth/logout';
export const UpdateURL = '/auth/update';
export const UserVisitURL = '/auth/visit'

// addresses
export const AddressCreateURL = '/address/create'
export const AddressUpdateURL = '/address/update'
export const AddressDeleteURL = '/address/delete'
export const AddressListURL = '/address/list'
export const AddressReadURL = '/address/read'


// product 
export const ProductReadURL = '/product/read'
export const ProductSearchURL = '/product/search'
export const ProductWithIdsURL = '/product/ids'

// review
export const ProductReviewsURL = '/review/product/list'
export const ReviewCreateURL = '/review/create'


// cart 
export const CartAddURL = '/cart/add'
export const CartSubURL = '/cart/sub'
export const CartDeleteURL = '/cart/delete'
export const CartDeleteAllURL = '/cart/delete/all'
export const CartListURL = '/cart/list'

// favorites
export const FavoriteSyncURL = '/favorite/sync'
export const FavoriteListURL = '/favorite/list'
export const FavoriteCheckURL = '/favorite/check'


// categories 
export const TopCategoriesReadURL = '/topcategory/read'


// order 
export const OrderCreateURL = '/order/user/create'
export const OrderCancelURL = '/order/user/cancel'
export const OrderListURL = '/order/user/list'
export const OrderReadURL = '/order/user/read'
export const CouponCheckURL = '/coupon/read/public'
export const SendPaymentURL = '/transaction/fawaterk/sendpayment'


// static 
export const StaticReadURL = '/static/read'

// stores addresses
export const StoreListURL = '/store/list'

// contact
export const ContactCreateURL = '/contact/create'

// setting
export const SettingReadURL = '/setting/list'