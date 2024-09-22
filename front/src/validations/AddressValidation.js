import { z } from "zod";


export const AddressesValidation = z.object({
    address : z.string().max(255 , "تخطيت أكبر طول للحقل").min(1 , "الرجاء إدخال العنوان") ,
    name : z.string().max(255 , "تخطيت أكبر طول للحقل") ,
    company : z.string().max(255 , "تخطيت أكبر طول للحقل") ,
    city : z.string().max(255 , "تخطيت أكبر طول للحقل").min(1 , 'الرجاء إدخال المدينة') ,
    governorate : z.string().max(255 , "تخطيت أكبر طول للحقل").min(1 , "الرجاء إدخال المحافظة") ,
    country : z.string().max(255 , "تخطيت أكبر طول للحقل") ,
    postal_code : z.string().max(255 , "تخطيت أكبر طول للحقل") ,
    phone : z.string().max(255 , "تخطيت أكبر طول للحقل") ,
    default : z.boolean()
})