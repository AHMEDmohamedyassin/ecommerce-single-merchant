const initial = {
    status : "n",   // n : normal ,  l : loading , s : success , f : fail
    items : [],     // for listing the stores addresses
} 


export const StoreAddressReducer = (state = initial , action) => {
    switch (action.type){
        case "StoreAddress_Data":
            return {
                ...state,
                status: "n",
                ...action.data
            }
        case "StoreAddress_Status":
            return {
                ...state,
                status: action.data
            }
        default: 
            return state;
    }
}