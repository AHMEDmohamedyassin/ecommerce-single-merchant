

export const OrderStatus = (req = null) => {
    const status = {    
        pending : "في انتظار الدفع" , 
        ready : "جاهز للإعداد" , 
        preparing : "يتم الإعداد" , 
        success : "ناجح" , 
        canceled : "ملغي" 
    }

    return req ? status[req] : "غير محدد"
}


/**
 * formating orders 
 */
export const formattingOrderStatus = (val) => {
    let value = ""
    switch(val){
        case "pending" :
            value = "في انتظار الدفع" 
            break;
        case "ready" :
            value = "جاهزة للتحضير" 
            break;
        case "preparing" :
            value = "يتم التحضير" 
            break;
        case "success" :
            value = "ناجح" 
            break;
        case "canceled" :
            value = "ملغي" 
            break;
        case "canceled without refund" :
            value = "ملغي و لم يتم رد القيمة"
            break;
    }

    return value
} 