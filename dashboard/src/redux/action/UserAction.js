import { UserAddAddressURL, UserCreateURL, UserDeleteAddressURL, UserDeleteURL, UserDetailURL, UserReadURL, UserResetPassURL, UserUpdateURL } from "Fetch/Url"
import { fetching } from "../../Fetch/Fetch"
import { Setting_Confirm, Setting_Msg } from "./SettingAction"
import { store } from "../../redux/store"
import { UserList_ListAction } from "./UserListAction"



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

        // refresh stored data
        dispatch(UserList_ListAction())
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

        // reset user data 
        dispatch({type : "User_Reset"})

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
        if(!Setting_Confirm(2000)) return {}     // confirmation

        const id = store.getState().UserReducer?.id

        dispatch({type : "User_Status" , data : "lu"}) // loading user read data

        const req = await fetching(UserUpdateURL , {...data , id})

        if(!req.success)
            return dispatch({type : "User_Status" , data : "n"})

        // notification
        Setting_Msg(6000)

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
        if(!Setting_Confirm(1000)) return {}     // confirmation

        const user_id = store.getState().AuthReducer?.id

        // safe user delete its account
        if(user_id == id)
            return Setting_Msg(23000)

        dispatch({type : "User_Status" , data : "ld"}) // loading user delete

        const req = await fetching(UserDeleteURL , {id})

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

        // refresh stored data
        dispatch(UserList_ListAction())
    }
}



/**
 * getting user details 
 */
export const User_DetailAction = (detail , page = null ) => {
    return async dispatch => {
        const stored_detail = store.getState().UserReducer[detail] ?? []
        const id = store.getState().UserReducer.id

        // prevent multi-fetching for same data
        if(stored_detail?.total && ( stored_detail.current == page || (!page && stored_detail.current) ) || (stored_detail.items && !stored_detail.items.length) )
            return dispatch({type : "User_Data" , data : {detail} }) 

        dispatch({type : "User_Status" , data : "lde"}) // loading user detail 

        const req = await fetching(`${UserDetailURL}?id=${id}&detail=${detail}&page=${page ?? 1}` , {} , "GET")

        if(!req.success)
            return dispatch({type : "User_Status" , data : "n"})


        dispatch({
            type : "User_Data" ,
            data : {
                [detail] : req.res[detail] , 
                detail : detail
            }
        })
    }
}


/**
 * user password reset 
 */
export const User_ResetPassAction = () => {
    return async dispatch => {
        const id = store.getState().UserReducer.id

        dispatch({type : "User_Status" , data : "lrp"}) // loading reset password of user 

        const req = await fetching(UserResetPassURL , {id})
        
        dispatch({type : "User_Status" , data : "n"})

        if(!req.success)
            return 


        // copying url to clipboard with notification
        navigator.clipboard.writeText(req.res).then(Setting_Msg(25000))

    }
}



/**
 * add address to user 
 */
export const User_AddAdressAction = (data) => {
    return async dispatch => {
        const id = store.getState().UserReducer.id
        let address = store.getState().UserReducer?.address ?? {}
        let address_items = store.getState().UserReducer?.address?.items ?? []

        dispatch({type : "User_Status" , data : "laa"}) // loading adding address 

        const req = await fetching(UserAddAddressURL , {id , ...data})

        dispatch({type : "User_Status" , data : "n"})
        
        if(!req.success)
            return dispatch({type : "User_Status" , data : "n"})
    
        // notification
        Setting_Msg(7000)

        // updating stored address if exists
        address_items = [...address_items , {...data , ...data.json}]

        dispatch({
            type : "User_Data" , 
            data : {
                address : {
                    ...address , 
                    items : address_items
                }
            }
        })
    }
}


/**
 * delete user Address
 */
export const User_DeleteAddressAction = (address_id) => {
    return async dispatch => {

        // confirm deleting
        if(!Setting_Confirm(1000)) return {}

        const user_id = store.getState().UserReducer.id
        let address = store.getState().UserReducer?.address ?? {}
        let address_items = store.getState().UserReducer?.address?.items ?? []

        dispatch({type : "User_Status" , data : "lda"}) // loading delete address 

        const req = await fetching(UserDeleteAddressURL , {user_id , address_id})

        dispatch({type : "User_Status" , data : "n"})
        
        if(!req.success)
            return dispatch({type : "User_Status" , data : "n"})
    

        // notification
        Setting_Msg(9000)

        // updating stored address if exists
        address_items = address_items.filter(e => e.id != address_id)

        dispatch({
            type : "User_Data" , 
            data : {
                address : {
                    ...address , 
                    items : address_items
                }
            }
        })
    }
}