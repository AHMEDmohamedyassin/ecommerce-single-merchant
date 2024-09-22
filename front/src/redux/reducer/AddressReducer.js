const initial = {
    status : "n",   // n : normal ,  l : loading , s : success , f : fail
    
    items : [] ,

    address : {},
} 


export const AddressReducer = (state = initial , action) => {
    switch (action.type){
        case "Address_Data":
            return {
                ...state,
                status: "n",
                ...action.data
            }
        case "Address_Append":
            return {
                ...state,
                status: "n",
                items : [action.data , ...state.items]
            }
        case "Address_Status":
            return {
                ...state,
                status: action.data
            }
        default: 
            return state;
    }
}