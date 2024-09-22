import { z } from "zod";


export const Validation = {
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
    
    phoneORemail: z.string()
    .min(1, "الرجاء إدخال البريد الإليكتروني")
    .refine(value => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^01\d{9}$/;
        return emailRegex.test(value) || phoneRegex.test(value);
    }, {
        message: "قم بإدخال بريد إليكتروني أو رقم هاتف صحيح"
    }),

    password: z.string().min(8, "كلمة المرور يجب أن تكون أكبر من 8 عناصر"),
    
    password_confirmation: z.string(),
};



export const ValidateInputChanges = (watch , defaultValues) => {
    const watchedValues = watch();
    const changedValues = Object.keys(watchedValues).reduce((acc, key) => {
        if (watchedValues[key] !== defaultValues[key]) {
            acc[key] = watchedValues[key];
        }
        return acc;
    }, {});

    return changedValues
}