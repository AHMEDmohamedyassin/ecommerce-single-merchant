const initial = {
    status : "n",   // n : normal ,  l : loading , s : success , f : fail

    token : null ,
    id : null,
    email : null ,
    name: null,
    phone: null,
    email_verified_at: null,
} 


export const AuthReducer = (state = initial , action) => {
    switch (action.type){
        case "Auth_Login":
            return {
                status: "n",
                ...action.data
            }
        case "Auth_Status":
            return {
                ...state,
                status: action.data
            }
        case "Auth_Update" : 
            return {
                ...state ,
                status : "n",
                ...action.data
            }
        case "Auth_Logout":
            return initial;
        default: 
            return state;
    }
}