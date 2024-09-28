import { store } from "../../redux/store"
import { fetching } from "../../Fetch/Fetch"
import { StoreAddressCreateURL, StoreAddressDeleteURL, StoreAddressListURL, StoreAddressReadURL, StoreAddressUpdateURL } from "../../Fetch/Url"
import { Setting_Confirm, Setting_Msg } from "./SettingAction"



/**
 * creating store address
 */
export const StoreAddress_CreateAction = (data) => {
    return async dispatch => {

        dispatch({type:"StoreAddress_Status" , data : "lc"})   // loading create store addresss

        const req = await fetching(StoreAddressCreateURL , data)

        if(!req.success)
            return dispatch({type:"StoreAddress_Status" , data : "n"})
        
        // notification
        Setting_Msg(29000)

        dispatch({
            type : "StoreAddress_Status" , 
            data : "sc"  /// success create store address
        })
    }
}



/**
 * read store address data
 */
export const StoreAddress_ReadAction = (id) => {
    return async dispatch => {
        const store_id = store.getState().StoreAddressReducer?.id ??  null
        
        // prevent multi fetching of same data
        if(store_id == id)
            return 

        dispatch({type:"StoreAddress_Status" , data : "lr"})   // loading read store addresss

        const req = await fetching(`${StoreAddressReadURL}?id=${id}` , {} , "GET" , false)

        if(!req.success)
            return dispatch({type:"StoreAddress_Status" , data : "n"})
    

        dispatch({
            type : "StoreAddress_Data" , 
            data : {
                ...req.res
            }
        })
    }
}


/**
 * update address
 */
export const StoreAddress_UpdateAction = (data) => {
    return async dispatch => {
        // confirmation
        if(!Setting_Confirm(2000)) return 
        
        const store_id = store.getState().StoreAddressReducer?.id ??  null

        dispatch({type:"StoreAddress_Status" , data : "lu"})   // loading update store addresss

        const req = await fetching(StoreAddressUpdateURL , {...data , id : store_id})

        if(!req.success)
            return dispatch({type:"StoreAddress_Status" , data : "n"})
    
        // notification
        Setting_Msg(30000)

        dispatch({
            type : "StoreAddress_Data" , 
            data : {
                ...req.res
            }
        })
    }
}


/**
 * delete store address
 */
export const StoreAddress_DeleteAction = () => {
    return async dispatch => {
        // confirmation
        if(!Setting_Confirm(1000)) return 

        const store_id = store.getState().StoreAddressReducer?.id ??  null

        dispatch({type:"StoreAddress_Status" , data : "ld"})   // loading update store addresss

        const req = await fetching(StoreAddressDeleteURL , {id : store_id})

        if(!req.success)
            return dispatch({type:"StoreAddress_Status" , data : "n"})
    
        // notification
        Setting_Msg(31000)

        dispatch({
            type : "StoreAddress_Status" , 
            data : "sd"
        })
    }
}



/**
 * listing store address
 */
export const StoreAddress_ListAction = () => {
    return async dispatch => {
        const items = store.getState().StoreAddressReducer?.items ?? []

        // check if stores is previously fetched 
        if(items.length) return 

        dispatch({type:"StoreAddress_Status" , data : "ll"})   // loading list store addresss

        const req = await fetching(StoreAddressListURL , {} , "GET" , false)

        if(!req.success)
            return dispatch({type:"StoreAddress_Status" , data : "n"})

        dispatch({
            type : "StoreAddress_Data" , 
            data : {
                items : req.res
            }
        })
    }
}