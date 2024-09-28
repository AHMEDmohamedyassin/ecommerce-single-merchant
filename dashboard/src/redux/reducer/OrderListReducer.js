const initial = {
    status : "n",   // n : normal ,  l : loading , s : success , f : fail

    order_status : "all",
    orderby : "id" ,
    order : "desc" ,

    current : 0 ,
    last : 0 ,
    total : 0 ,
    perPage : 0 ,
    hasMore : false ,
    items : []
}


export const OrderListReducer = (state = initial , action) => {
    switch (action.type){
        case "OrderList_Data":
            return {
                ...state,
                status: "n",
                ...action.data
            }
        case "OrderList_Status":
            return {
                ...state,
                status: action.data
            }
        case "OrderList_Reset":
            return {
                ...initial ,
                ...action.data 
            }
        default: 
            return state;
    }
}