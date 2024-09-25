import { z } from "zod";


export const CreateProductValidation = z.object({
    title : z.string().min(1 , "الرجاء إدخال عنوان المنتج").max(255 , "تخطيت أكبر طول للحقل ") , 
    description : z.string().max(255 , "تخطيت أكبر طول للحقل ").nullable(),
    serial : z.string().max(255 , "تخطيت أكبر طول للحقل ").nullable(),
    price : z.number().min(1 , "الرجاء إدخال سعر المنتج").max(999999 , "تخطيت أكبر قيمة يمكن إدخالها "),
    old_price : z.number().max(999999 , "تخطيت أكبر قيمة يمكن إدخالها ").nullable().optional(),
    quantity : z.number().max(65535 , "تخطيت أكبر قيمة يمكن إدخالها ").nullable(),
    publish_date : z.string().regex(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(202[4-9]|203[0-9]) (0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/, {
        message: "الرجاء إدخال تاريخ صحيح",
      }).nullable() ,
    json : z.object({
        description: z.string().nullable().optional(),
        restore: z.string().nullable().optional(),
        size: z.array(z.string().min(1 , "الرجاء إدخال المقاس")), 
        colors: z.array(z.string().min(1 , "الرجاء إدخال اللون"))
    }).nullable()
})



// reformation the date to be as the input fomate
export const formattingDateForUpdate = (date = null) => {
    if(!date)
        return "00-00-0000 00:00"
    let d = new Date(date)
    let day = String(d.getDate()).padStart(2 , '0')
    let month = String(d.getMonth()+ 1).padStart(2 , '0') 
    let year = String(d.getFullYear()).padStart(2 , '0')
    let hours = String(d.getHours()).padStart(2 , '0')
    let minutes = String(d.getMinutes()).padStart(2 , '0')

    return `${day}-${month}-${year} ${hours}:${minutes}`
} 