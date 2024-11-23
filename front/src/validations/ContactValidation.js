import { z } from "zod";
import {store} from '../redux/store'

export const ContactValidation = z.object({
    name : z.string().max(255 , "تخطيت أكبر طول للحقل").nullable() ,
    phone : z.string().refine(value => {
        const phoneRegex = /^01\d{9}$/;
        return phoneRegex.test(value);
    }, {
        message: "قم بإدخال رقم هاتف صحيح"
    }),
    email : z.string().max(255 , "تخطيت أكبر طول للحقل").nullable() ,
    msg : z.string().min(1 , 'الرجاء إدخال رسالتك').max(255 , "تخطيت أكبر طول للحقل") ,
}).refine(data => !(!store.getState().AuthReducer?.token && !data.name?.length) , {
    message : "الرجاء إدخال الاسم" ,
    path: ['name']
}).refine(data => !(!store.getState().AuthReducer?.token && !data.phone) , {
    message : "الرجاء إدخال رقم الهاتف" ,
    path: ['phone']
});