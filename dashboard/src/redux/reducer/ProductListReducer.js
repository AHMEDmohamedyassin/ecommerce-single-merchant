const initial = {
    status : "n",   // n : normal ,  l : loading , s : success , f : fail

    search : "" , // search text
    orderby : "id" , // id (created_at) , publish_date , price , reviews , views , old_price
    order : "desc" , // desc, asc 

    current : 0 ,
    last : 0 ,
    total : 0 ,
    perPage : 0 ,
    hasMore : false ,
    items : []
}


export const ProductListReducer = (state = initial , action) => {
    switch (action.type){
        case "ProductList_Data":
            return {
                ...state,
                status: "n",
                ...action.data
            }
        case "ProductList_Status":
            return {
                ...state,
                status: action.data
            }
        case "ProductList_Reset":
            return {
                ...initial ,
                ...action.data 
            }
        default: 
            return state;
    }
}