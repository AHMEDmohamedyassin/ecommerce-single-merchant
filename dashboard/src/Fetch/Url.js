export const APP_URL = window.globalConfig?.APP_URL ?? 'http://192.168.1.9:8000';
export const APIv = '/api'

// image url
export const ImageURL = `${APP_URL}${APIv}/image`

// apis

// auth
export const UserDataURL = '/auth/getdata';

// permission 
export const PermissionListURL = '/permission/list';
export const PermissionUserAttachURL = '/permission/user/attach';
export const RoleCreateURL = "/role/create";
export const RoleUpdateURL = "/role/update";
export const RoleDeleteURL = "/role/delete";
export const RoleListURL = "/role/list";
export const RoleReadURL = "/role/read";


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
export const ProductUploadImageURL = '/product/image/upload';
export const ProductDeleteImageURL = '/product/image/delete';