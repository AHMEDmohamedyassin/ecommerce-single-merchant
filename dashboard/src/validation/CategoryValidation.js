import { z } from "zod";


export const CategoryUpdateValidation = z.object({
    ids : z.array(z.string()).optional()
})

export const CategoryCreateValidation = z.object({
    title : z.string().max(255 , "تخطيت أكبر طول للحقل").min(1 , "الرجاء إدخال العنوان"),
    description : z.string().max(255 , "تخطيت أكبر طول للحقل"),
})

export const TopCategoryCreateValidation = z.object({
    title : z.string().max(255 , "تخطيت أكبر طول للحقل").min(1 , "الرجاء إدخال العنوان")
})
