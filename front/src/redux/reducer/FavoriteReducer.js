const initial = {
    status : "n",   // n : normal ,  l : loading , s : success , f : fail

    current: 0,
    last: 0,
    total: 0,
    perPage: 0,
    hasMore: false,
    items: []
} 


export const FavoriteReducer = (state = initial , action) => {
    switch (action.type){
        case "Favorite_Data":
            return {
                ...state,
                status: "n",
                ...action.data
            }
        case "Favorite_Status":
            return {
                ...state,
                status: action.data
            }
        case "Favorite_Reset":
            return {
                ...initial,
                ...action.data
            }
        default: 
            return state;
    }
}