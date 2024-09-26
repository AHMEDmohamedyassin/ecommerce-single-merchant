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


export const UserListReducer = (state = initial , action) => {
    switch (action.type){
        case "UserList_Data":
            return {
                ...state,
                status: "n",
                ...action.data
            }
        case "UserList_Status":
            return {
                ...state,
                status: action.data
            }
        case "UserList_Reset":
            return {
                ...initial ,
                ...action.data 
            }
        default: 
            return state;
    }
}