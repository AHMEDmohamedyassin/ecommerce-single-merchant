export const APP_URL = window.globalConfig?.APP_URL ?? 'http://192.168.1.9:8000';
export const APIv = '/api'

// apis

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