const initial = {
    status : "n",   // n : normal ,  l : loading , s : success , f : fail
    detail : null , // the required detail of user

    id : null , 
    slug : null , 
    name : null , 
    email : null , 
    phone : null , 
    email_verified_at : null , 
    created_at : null , 
    updated_at : null , 
    role : [] , 
    permission : [] , 
    coupon :{},
    order :{},
    review :{},
    contact :{},
    block :{},
    favorite :{},
    cart :{},
    transaction :{},
    address : {}
}

export const UserReducer = (state = initial , action) => {
    switch (action.type){
        case "User_Data":
            return {
                ...state,
                status: "n",
                ...action.data
            }
        case "User_Status":
            return {
                ...state,
                status: action.data
            }
        case "User_Reset":
            return {
                ...initial ,
                ...action.data 
            }
        default: 
            return state;
    }
}