

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