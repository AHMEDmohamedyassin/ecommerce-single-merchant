import { z } from "zod";

export const loginValidation = z.object({
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
});