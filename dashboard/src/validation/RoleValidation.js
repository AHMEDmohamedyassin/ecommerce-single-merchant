import { z } from "zod";

export const RoleValidation = z.object({
    title : z.string().max(255 , "تخطيت أكبر طول للحقل").min(1 , "الرجاء إدخال العنوان"),
    description : z.string().max(255 , "تخطيت أكبر طول للحقل").nullable().optional(),
    permission_id : z.array(z.string()).optional()
})