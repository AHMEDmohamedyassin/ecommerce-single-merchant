import { z } from "zod";


export const CouponCreateValidation = z.object({
    value : z.number({message:"يجب إدخال رقم"}) ,
    expire_date : z.number({message:"يجب إدخال رقم"}).nullable(),
    count : z.number({message:"يجب إدخال رقم"}).max(10 , "لا يمكن إنشاء أكثر من 10 قسائم للمرة الواحدة").min(1 , "ما هو العدد الذي تريد إنشاءه في المرة الواحدة")
})