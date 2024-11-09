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



// reformation the date to be as the input fomate
export const formattingDateForUpdate = (date = null) => {
    if(!date)
        return "00-00-0000 00:00"
    let d = new Date(date)
    let day = String(d.getDate()).padStart(2 , '0')
    let month = String(d.getMonth()+ 1).padStart(2 , '0') 
    let year = String(d.getFullYear()).padStart(2 , '0')
    let hours = String(d.getHours()).padStart(2 , '0')
    let minutes = String(d.getMinutes()).padStart(2 , '0')

    return `${day}/${month}/${year} ${'\u00A0'}${'\u00A0'}${'\u00A0'} ${hours > 12 ? hours - 12 : hours}:${minutes} ${hours > 12 ? "م" :"ص"}`
} 