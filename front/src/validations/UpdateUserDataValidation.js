import { z } from "zod";
import { Validation } from "./Validation";

export const UpdateUserDataValidation = z.object({
    name : Validation.name,
    email : Validation.email,
    phone : Validation.phone ,
    password : z.string().min(1 , "يجب إدخال كلمة المرور لتتمكن من تعديل البيانات")
});