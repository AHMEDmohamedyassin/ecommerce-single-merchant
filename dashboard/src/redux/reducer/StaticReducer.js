const initial = {
    status : "n",   // n : normal ,  l : loading , s : success , f : fail

    faq : null , 
    about : null , 
    policy : null , 
    contact : null ,
}


export const StaticReducer = (state = initial , action) => {
    switch (action.type){
        case "Static_Data":
            return {
                ...state,
                status: "n",
                ...action.data
            }
        case "Static_Status":
            return {
                ...state,
                status: action.data
            }
        case "Static_Reset":
            return {
                ...initial ,
                ...action.data 
            }
        default: 
            return state;
    }
}