const initial = {
    status : "n",   // n : normal ,  l : loading , s : success , f : fail

    coupon : null , 
    shipping_address_id : null , 
    pay_on_diliver : false , 
    order_id : 0 ,

    current: 0,
    last: 0,
    total: 0,
    perPage: 0,
    hasMore: false,
    items: []
} 


export const OrderReducer = (state = initial , action) => {
    switch (action.type){
        case "Order_Data":
            return {
                ...state,
                status: "n",
                ...action.data
            }
        case "Order_Status":
            return {
                ...state,
                status: action.data
            }
        case "Order_Reset":
            return {
                ...initial,
                ...action.data
            }
        default: 
            return state;
    }
}