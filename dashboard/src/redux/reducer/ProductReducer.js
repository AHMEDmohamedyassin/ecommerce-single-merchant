const initial = {
    status : "n",   // n : normal ,  l : loading , s : success , f : fail
    id : null,
    slug : null ,   
    serial : null ,
    title : null ,
    description : null , 
    price : null , 
    old_price : null ,   
    quantity : null ,   
    ratting : null ,   
    views : null ,   
    reviews : null ,   
    paid_quantity : null ,   
    publish_date : null ,  
    created_at : null ,  
    updated_at : null ,   
    json : {},
    category : []
}


export const ProductReducer = (state = initial , action) => {
    switch (action.type){
        case "Product_Data":
            return {
                ...state,
                status: "n",
                ...action.data
            }
        case "Product_Status":
            return {
                ...state,
                status: action.data
            }
        case "Product_Reset":
            return {
                ...initial ,
                ...action.data 
            }
        default: 
            return state;
    }
}