import { z } from "zod";


export const RegisterValidation = z.object({
    name: z.string().max(255 , "تخطيت أكبر طول للحقل").min(1 , "الرجاء إدخال اسم المستخدم"),
    email: z.string().max(255 , "تخطيت أكبر طول للحقل").min(1, "الرجاء إدخال البريد الإليكتروني")
    .refine(value => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) 
    }, {
        message: "قم بإدخال بريد إليكتروني صحيح"
    }),
    phone:  z.string().max(255 , "تخطيت أكبر طول للحقل").min(1, "الرجاء إدخال رقم الهاتف")
    .refine(value => {
        const phoneRegex = /^01\d{9}$/;
        return phoneRegex.test(value);
    }, {
        message: "قم بإدخال رقم هاتف صحيح"
    }),
    password: z.string().min(8, "كلمة المرور يجب أن تكون أكبر من 8 عناصر"),
    password_confirmation: z.string(),
}).refine(data => data.password_confirmation == data.password , {
    message : "كلمة المرور غير متطابقة" ,
    path: ["password_confirmation"]
});