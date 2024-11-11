const initial = {
    status : "n",   // n : normal ,  l : loading , s : success , f : fail

    latest : [] ,
    review : [] ,
    price : [] , 
    views : [] 
} 


export const HomeReducer = (state = initial , action) => {
    switch (action.type){
        case "Home_Data":
            return {
                ...state,
                status: "n",
                ...action.data
            }
        case "Home_Status":
            return {
                ...state,
                status: action.data
            }
        case "Home_Reset":
            return {
                ...initial,
                ...action.data
            }
        default: 
            return state;
    }
}