const initial = {
    msg : false ,
    reject_msg : "إلغاء",   // if false : reject button will disappear
    reject : () => {},
    buttons : [
        {
            msg : "" ,
            fn : () => {}
        }
    ]
}

export const AlertReducer = (state = initial , action) => {
    switch (action.type){
        case "Alert_Data":
            return {
                ...state,
                ...action.data
            }
        case "Alert_Reset" : 
            return initial
        default: 
            return state;
    }
}