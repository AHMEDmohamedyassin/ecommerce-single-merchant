const initial = {
    status : "n",   // n : normal ,  l : loading , s : success , f : fail
    products : [] , 
    collection : {},
    additional : [] ,
    user : null , 
    coupon : null , 
    order_state : "success" , 
    user_state : null
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