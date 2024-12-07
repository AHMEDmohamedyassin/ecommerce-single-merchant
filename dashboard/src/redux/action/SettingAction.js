import { notify } from "components/public/NotificationComp"
import { store } from "../store"
import { msgs } from "Fetch/Msg"
import { Confirm_Msg } from "Fetch/Confirm_Msg"
import { fetching } from "../../Fetch/Fetch"
import { SettingListURL, SettingUpdateURL } from "Fetch/Url"

/**
 * pop up messages
 */
export const Setting_Msg = (msg_code) => {
    if(msgs[msg_code]){
        notify(msgs[msg_code]["ar"])
    }
}


/**
 * for showing and heading Loading component
 */
export const Setting_Loading = (state = true) => {

    store.dispatch({
        type : "Setting_Loading" ,
        data : state
    })
}


/**
 * confirmation messages
 */
export const Setting_Confirm = (msg_code) => {
    if(Confirm_Msg[msg_code]){
        return window.confirm(Confirm_Msg[msg_code]['ar'])
    }
    return true
}


/**
 * listing setting
 */
export const Setting_ListAction = (type = 1) => {
    return async dispatch => {
        const state = store.getState().SettingReducer

        // prevent fetching same data mulitble times 
        if((type && state.items?.length) || (!type && state.statistics?.length))
            return {}
        
        dispatch({type : "Setting_Status" , data : "ll"})         // loading listing

        const req = await fetching(`${SettingListURL}?type=${type}` , {} , "GET")

        if(!req.success) 
            return dispatch({type : "Setting_Status" , data : "n"})

        if(type)
            return dispatch({
                type : "Setting_Data" , 
                data : {
                    items : req.res
                }
            })

        dispatch({
            type : "Setting_Data" , 
            data : {
                statistics : req.res
            }
        })
    }
}



/**
 * handle update setting
 */
export const Setting_UpdateAction = (data) => {
    return async dispatch => {
        let items = store.getState().SettingReducer?.items ?? []

        // confirmation 
        if(!Setting_Confirm(2000)) return

        dispatch({type : "Setting_Status" , data : "lu"})         // loading update

        const req = await fetching(SettingUpdateURL , data)

        if(!req.success) 
            return dispatch({type : "Setting_Status" , data : "n"})

        // items updating
        items = items.map(e => e.id == data.id ? {...e , ...data} : e)

        // success message 
        Setting_Msg(6000)

        dispatch({
            type : "Setting_Data" , 
            data : {
                items
            }
        })
    }
}
