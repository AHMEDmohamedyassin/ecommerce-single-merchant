import { z } from "zod";
import { Validation } from "./Validation";


export const NewPasswordValidation = z.object({
    new_password: Validation.password,
    password_confirmation: Validation.password,
    password: z.string().min(1 , "يجب إدخال كلمة المرور لتتمكن من تعديل البيانات")
}).refine(data => data.password_confirmation == data.new_password , {
    message : "كلمة المرور غير متطابقة" ,
    path: ["password_confirmation"]
});