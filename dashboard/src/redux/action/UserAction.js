import { UserCreateURL, UserDetailURL, UserReadURL, UserUpdateURL } from "Fetch/Url"
import { fetching } from "../../Fetch/Fetch"
import { Setting_Msg } from "./SettingAction"
import { store } from "../../redux/store"



/**
 * update on user data
 */
export const User_CreateAction = (data) => {
    return async dispatch => {

        dispatch({type : "User_Status" , data : "lc"}) // loading user create

        const req = await fetching(UserCreateURL , data)

        if(!req.success)
            return dispatch({type : "User_Status" , data : "n"})

        // notification
        Setting_Msg(22000)

        dispatch({
            type : "User_Data" ,
            data : {
                ...req.res , 
                status : "sc"          // success create user
            }
        })
    }
}


/**
 * reading user data
 */
export const User_ReadAction = (id) => {
    return async dispatch => {
        const existed_id = store.getState().UserReducer?.id

        // prevent refetch user data if it is already stored
        if(id == existed_id)
            return ;

        dispatch({type : "User_Status" , data : "lr"}) // loading user read data

        const req = await fetching(`${UserReadURL}?id=${id}` , {} , "GET" , false)

        if(!req.success)
            return dispatch({type : "User_Status" , data : "n"})

        dispatch({
            type : "User_Data" ,
            data : {
                ...req.res , 
            }
        })
    }
}


/**
 * update handle
 */
export const User_UpdateAction = (data) => {
    return async dispatch => {
        const id = store.getState().UserReducer?.id

        dispatch({type : "User_Status" , data : "lu"}) // loading user read data

        const req = await fetching(UserUpdateURL , {...data , id})

        if(!req.success)
            return dispatch({type : "User_Status" , data : "n"})

        dispatch({
            type : "User_Data" ,
            data : {
                ...req.res , 
            }
        })
    }
} 


/**
 * delete user 
 */
export const User_DeleteAction = id => {
    return async dispatch => {
        const user_id = store.getState().AuthReducer?.id

        // safe user delete its account
        if(user_id == id)
            return Setting_Msg(23000)

        dispatch({type : "User_Status" , data : "ld"}) // loading user delete

        const req = await fetching(UserUpdateURL , {id})

        if(!req.success)
            return dispatch({type : "User_Status" , data : "n"})

        // notification
        Setting_Msg(24000)

        dispatch({
            type : "User_Data" ,
            data : {
                status : 'sd' ,      // success delete status 
            }
        })
    }
}



/**
 * getting user details 
 */
export const User_DetailAction = (detail) => {
    return async dispatch => {
        const stored_detail = store.getState().UserReducer[detail] ?? []
        const id = store.getState().UserReducer.id

        // safe user delete its account
        if(stored_detail?.length)
            return 

        dispatch({type : "User_Status" , data : "lde"}) // loading user detail 

        const req = await fetching(`${UserDetailURL}?id=${id}&detail=${detail}` , {} , "GET")

        if(!req.success)
            return dispatch({type : "User_Status" , data : "n"})


        dispatch({
            type : "User_Data" ,
            data : req.res
        })
    }
}