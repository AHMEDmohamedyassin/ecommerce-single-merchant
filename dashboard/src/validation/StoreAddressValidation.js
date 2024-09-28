import { z } from "zod";


export const  StoreAddressCreateValidation = z.object({
    address : z.string().min(1 , 'الرجاء إدخال عنوان المتجر').max(255 , 'لقد تخطيت أكبر طول للحقل') ,
    json : z.object({
        phone : z.string().min(1 , 'الرجاء إدخال أرقام الهاتف الخاصة بالفرع').max(255 , 'لقد تخطيت أكبر طول للحقل') ,
        whatsapp : z.string().max(255 , 'لقد تخطيت أكبر طول للحقل') ,
        email : z.string().max(255 , 'لقد تخطيت أكبر طول للحقل') ,
        work : z.string().max(500 , 'لقد تخطيت أكبر طول للحقل') ,
    })
})