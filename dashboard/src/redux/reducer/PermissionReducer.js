const initial = {
    status : "n",   // n : normal ,  l : loading , s : success , f : fail
    permissions : [],
    roles : []
} 


export const PermissionReducer = (state = initial , action) => {
    switch (action.type){
        case "Permission_Data":
            return {
                ...state,
                status: "n",
                ...action.data
            }
        case "Permission_Status":
            return {
                ...state,
                status: action.data
            }
        default: 
            return state;
    }
}