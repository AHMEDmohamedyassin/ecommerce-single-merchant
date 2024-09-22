import { z } from "zod";

export const ForgetPassValidation = z.object({
    phoneORemail: z.string()
    .min(1, "الرجاء إدخال البريد الإليكتروني")
    .refine(value => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^01\d{9}$/;
        return emailRegex.test(value) || phoneRegex.test(value);
    }, {
        message: "قم بإدخال بريد إليكتروني أو رقم هاتف صحيح"
    })
});