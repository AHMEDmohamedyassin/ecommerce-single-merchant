const initial = {
    status : "n",   // n : normal ,  l : loading , s : success , f : fail
    side_cart : false , 
    coupon_valid : true , 
    coupon_value : 0,

    current: 0,
    last: 0,
    total: 0,
    perPage: 0,
    hasMore: false,
    items: []
} 


export const CartReducer = (state = initial , action) => {
    switch (action.type){
        case "Cart_Data":
            return {
                ...state,
                status: "n",
                ...action.data
            }
        case "Cart_Status":
            return {
                ...state,
                status: action.data
            }
        case "Cart_Reset":
            return {
                ...initial,
                ...action.data
            }
        default: 
            return state;
    }
}