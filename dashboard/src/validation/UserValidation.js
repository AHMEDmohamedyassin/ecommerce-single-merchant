import { z } from "zod";


const validation = {
    name : z.string().min(1 , 'الرجاء إدخال اسم الشخص').max(255 , "تخطيت أكبر طول للحقل ") ,
    email : z.string().max(255 , "تخطيت أكبر طول للحقل ") ,
    phone : z.string().max(11 , "تخطيت أكبر طول للحقل").min(1, "الرجاء إدخال رقم الهاتف")
    .refine(value => {
        const phoneRegex = /^01\d{9}$/;
        return phoneRegex.test(value);
    }, {
        message: "قم بإدخال رقم هاتف صحيح"
    }) ,
}

export const CreateUserValidation = z.object({
    name : validation.name ,
    email : validation.email ,
    phone : validation.phone ,
    address : z.string().max(255 , "تخطيت أكبر طول للحقل ").optional().nullable() ,
    json : z.object({
        company : z.string().max(255 , "تخطيت أكبر طول للحقل") ,
        city : z.string().max(255 , "تخطيت أكبر طول للحقل").optional() ,
        governorate : z.string().max(255 , "تخطيت أكبر طول للحقل").optional() ,
        country : z.string().max(255 , "تخطيت أكبر طول للحقل") ,
        postal_code : z.string().max(255 , "تخطيت أكبر طول للحقل") ,
    }) ,
    default : z.boolean() ,
}).refine(data => !(data.address && !data.json.city) , {
    message : "يجب عليك إدخال حقل المدينة في حالة ملئ حقل العنوان" , 
    path:['json' , 'city']
}).refine(data => !(data.address && !data.json.governorate) , {
    message : "يجب عليك إدخال حقل المحافظة في حالة ملئ حقل العنوان" , 
    path:['json' , 'governorate']
})


export const UpdateUserValidation = z.object({
    name : validation.name ,
    email : validation.email.nullable() ,
    phone : validation.phone ,
})


export const UserAddressesValidation = z.object({
    address : z.string().max(255 , "تخطيت أكبر طول للحقل").min(1 , "الرجاء إدخال العنوان") ,
    json : z.object({
        name : z.string().max(255 , "تخطيت أكبر طول للحقل") ,
        company : z.string().max(255 , "تخطيت أكبر طول للحقل") ,
        city : z.string().max(255 , "تخطيت أكبر طول للحقل").min(1 , 'الرجاء إدخال المدينة') ,
        governorate : z.string().max(255 , "تخطيت أكبر طول للحقل").min(1 , "الرجاء إدخال المحافظة") ,
        country : z.string().max(255 , "تخطيت أكبر طول للحقل") ,
        postal_code : z.string().max(255 , "تخطيت أكبر طول للحقل") ,
        phone : z.string().max(255 , "تخطيت أكبر طول للحقل") 
    }),
    default : z.boolean()
})



/**
 * create user inside for order page
 */
export const OrderPageCreateUserValidation = z.object({
    name : validation.name ,
    email : validation.email ,
    phone : validation.phone ,
    address : z.string().max(255 , "تخطيت أكبر طول للحقل ").optional().nullable() ,
    json : z.object({
        city : z.string().max(255 , "تخطيت أكبر طول للحقل").optional() ,
        governorate : z.string().max(255 , "تخطيت أكبر طول للحقل").optional() ,
    }) ,
}).refine(data => !(data.address && !data.json.city) , {
    message : "يجب عليك إدخال حقل المدينة في حالة ملئ حقل العنوان" , 
    path:['json' , 'city']
}).refine(data => !(data.address && !data.json.governorate) , {
    message : "يجب عليك إدخال حقل المحافظة في حالة ملئ حقل العنوان" , 
    path:['json' , 'governorate']
})