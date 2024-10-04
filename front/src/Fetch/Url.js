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


// cart 
export const CartAddURL = '/cart/add'
export const CartSubURL = '/cart/sub'
export const CartDeleteURL = '/cart/delete'
export const CartDeleteAllURL = '/cart/delete/all'
export const CartListURL = '/cart/list'