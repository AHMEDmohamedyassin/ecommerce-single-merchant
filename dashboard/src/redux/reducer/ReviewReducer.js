const initial = {
    status : "n",   // n : normal ,  l : loading , s : success , f : fail

    search : "" , // search text

    current : 0 ,
    last : 0 ,
    total : 0 ,
    perPage : 0 ,
    hasMore : false ,
    items : []
}


export const ReviewReducer = (state = initial , action) => {
    switch (action.type){
        case "Review_Data":
            return {
                ...state,
                status: "n",
                ...action.data
            }
        case "Review_Status":
            return {
                ...state,
                status: action.data
            }
        case "Review_Reset":
            return {
                ...initial ,
                ...action.data 
            }
        default: 
            return state;
    }
}