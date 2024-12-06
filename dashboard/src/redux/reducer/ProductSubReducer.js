const initial = {
    status : "n",   // n : normal ,  l : loading , s : success , f : fail

    orderby : "id" , // id (created_at) , price , old_price , quantity , paid_quantity
    order : "desc" , // desc, asc 

    current : 1 ,
    last : 0 ,
    total : 0 ,
    perPage : 0 ,
    hasMore : false ,
    items : []
}


export const ProductSubListReducer = (state = initial , action) => {
    switch (action.type){
        case "ProductSubList_Data":
            return {
                ...state,
                status: "n",
                ...action.data
            }
        case "ProductSubList_Status":
            return {
                ...state,
                status: action.data
            }
        case "ProductSubList_Reset":
            return {
                ...initial ,
                ...action.data 
            }
        default: 
            return state;
    }
}