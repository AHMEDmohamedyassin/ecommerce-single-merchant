


/**
 * info message
 */
export const Alert_InfoAction = (msg) => {
    return {
        type : "Alert_Data" , 
        data : {
            msg , 
            reject_msg : false ,
            buttons : [
                {
                    msg : "تم" ,
                    fn : () => {}
                }
            ] 
        }
    }
}

