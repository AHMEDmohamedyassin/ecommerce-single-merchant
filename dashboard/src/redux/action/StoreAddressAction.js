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

        // refresh data
        store.dispatch(StoreAddress_ListAction(true))
    }
}


/**
 * delete store address
 */
export const StoreAddress_DeleteAction = (id = null) => {
    return async dispatch => {
        // confirmation
        if(!Setting_Confirm(1000)) return 

        // getting id from parameter if not found in store
        const store_id = (id ?? store.getState().StoreAddressReducer?.id ) ?? null
        
        // check if id available
        if(!store_id) return 

        dispatch({type:"StoreAddress_Status" , data : "ld"})   // loading update store addresss

        const req = await fetching(StoreAddressDeleteURL , {id : store_id})

        if(!req.success)
            return dispatch({type:"StoreAddress_Status" , data : "n"})
    
        // notification
        Setting_Msg(31000)

        if(id)
            dispatch({type : "StoreAddress_Status" , data : "n"})
        else dispatch({type : "StoreAddress_Status" , data : "sd"})

        // refresh data
        dispatch(StoreAddress_ListAction(true))
    }
}



/**
 * listing store address
 */
export const StoreAddress_ListAction = (force = false) => {
    return async dispatch => {
        const items = store.getState().StoreAddressReducer?.items ?? []

        // check if stores is previously fetched 
        if(items.length && !force) return 

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