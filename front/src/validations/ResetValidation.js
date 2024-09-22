import { z } from "zod";

export const ResetValidation = z.object({
    password: z.string().min(8, "كلمة المرور يجب أن تكون أكبر من 8 عناصر"),
    password_confirmation: z.string(),
}).refine(data => data.password_confirmation == data.password , {
    message : "كلمة المرور غير متطابقة" ,
    path: ["password_confirmation"]
});