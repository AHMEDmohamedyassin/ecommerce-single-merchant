import { z } from "zod";


export const CreateProductValidation = z.object({
    title : z.string().min(1 , "الرجاء إدخال عنوان المنتج").max(255 , "تخطيت أكبر طول للحقل ") , 
    description : z.string().max(255 , "تخطيت أكبر طول للحقل ").nullable(),
    serial : z.string().max(255 , "تخطيت أكبر طول للحقل ").nullable(),
    publish_date : z.string().regex(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(202[4-9]|203[0-9]) (0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/, {
        message: "الرجاء إدخال تاريخ صحيح",
      }).nullable() ,
    json : z.object({
        description: z.string().nullable().optional(),
        restore: z.string().nullable().optional(),
    }).nullable() , 
    products : z.array(z.object({
        color : z.string().min(1 , 'الرجاء إدخال اللون').max(255 , "تخطيت أكبر طول للحقل "),
        size : z.string().min(1 , 'الرجاء إدخال المقاس').max(255 , "تخطيت أكبر طول للحقل "),
        price : z.number().min(1 , "الرجاء إدخال سعر المنتج").max(999999 , "تخطيت أكبر قيمة يمكن إدخالها "),
        old_price : z.number().min(0 , 'الرجاء إدخال سعر صحيح').max(999999 , "تخطيت أكبر قيمة يمكن إدخالها ").nullable(),
        quantity : z.number().min(0 , 'الرجاء إدخال كمية صحيحة').max(65535 , "تخطيت أكبر قيمة يمكن إدخالها ").nullable(),
    }))
})


export const UpdateProductValidation = z.object({
    title : z.string().min(1 , "الرجاء إدخال عنوان المنتج").max(255 , "تخطيت أكبر طول للحقل ") , 
    description : z.string().max(255 , "تخطيت أكبر طول للحقل ").nullable(),
    serial : z.string().max(255 , "تخطيت أكبر طول للحقل ").nullable(),
    publish_date : z.string().regex(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(202[4-9]|203[0-9]) (0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/, {
        message: "الرجاء إدخال تاريخ صحيح",
      }).nullable() ,
    json : z.object({
        description: z.string().nullable().optional(),
        restore: z.string().nullable().optional(),
    }).nullable()
})


export const SubProductValidation = z.object({
    color : z.string().min(1 , 'الرجاء إدخال اللون').max(255 , "تخطيت أكبر طول للحقل "),
    size : z.string().min(1 , 'الرجاء إدخال المقاس').max(255 , "تخطيت أكبر طول للحقل "),
    price : z.number().min(1 , "الرجاء إدخال سعر المنتج").max(999999 , "تخطيت أكبر قيمة يمكن إدخالها "),
    old_price : z.number().min(0 , 'الرجاء إدخال سعر صحيح').max(999999 , "تخطيت أكبر قيمة يمكن إدخالها ").nullable(),
    quantity : z.number().min(0 , 'الرجاء إدخال كمية صحيحة').max(65535 , "تخطيت أكبر قيمة يمكن إدخالها ").nullable(),
})