const initial = {
    status : "n",   // n : normal ,  l : loading , s : success , f : fail
    top_categories : []
} 


export const CategoryReducer = (state = initial , action) => {
    switch (action.type){
        case "Category_Data":
            return {
                ...state,
                status: "n",
                ...action.data
            }
        case "Category_Status":
            return {
                ...state,
                status: action.data
            }
        default: 
            return state;
    }
}