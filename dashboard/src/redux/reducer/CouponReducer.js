const initial = {
    status : "n",   // n : normal ,  l : loading , s : success , f : fail
    order : "desc" ,
    orderby : "id",

    current : 0 ,
    last : 0 ,
    total : 0 ,
    perPage : 0 ,
    hasMore : false ,
    items : []
} 


export const CouponReducer = (state = initial , action) => {
    switch (action.type){
        case "Coupon_Data":
            return {
                ...state,
                status: "n",
                ...action.data
            }
        case "Coupon_Status":
            return {
                ...state,
                status: action.data
            }
        case "Coupon_Reset":
            return {
                ...initial , 
                ...action.data
            }
        default: 
            return state;
    }
}