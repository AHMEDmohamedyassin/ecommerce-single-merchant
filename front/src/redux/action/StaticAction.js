import { fetching } from "Fetch/Fetch"
import { ContactCreateURL, StaticReadURL, StoreListURL } from "Fetch/Url"
import { store } from "../store"
import { Setting_Msg } from "./SettingAction"



/**
 * reading static data
 */
export const Static_ReadAction = (type) => {
    return async dispatch => {
        const stored = store.getState().StaticReducer

        if(stored && stored[type])
            return {}

        dispatch({type : "Static_Status" , data : `l${type}`})      // loading

        const req = await fetching(`${StaticReadURL}?type=${type}` , {} , "GET")

        if(!req.success)
            dispatch({type : "Static_Status" , data : "n"})

        dispatch({
            type:"Static_Data" , 
            data : {
                [type] : req.res
            }
        })
    }
}



/**
 * stores data
 */
export const Static_ListStoresAction = () => {
    return async dispatch => {
        const stored = store.getState().StaticReducer

        if(stored.stores && stored.stores.length)
            return {}

        dispatch({type : "Static_Status" , data : "ls"})      // loading

        const req = await fetching(StoreListURL , {} , "GET")

        if(!req.success)
            dispatch({type : "Static_Status" , data : "n"})

        dispatch({
            type:"Static_Data" , 
            data : {
                stores : req.res
            }
        })
    }
}




/**
 * submitting contact form
 */
export const Static_ContactSendAction = (data) => {
    return async dispatch => {
        const auth = store.getState().AuthReducer
        const localstorage_data = localStorage.getItem('last_sent_msg')
        let delay_minutes = 20         //  minutes after sending the message prevent repeate sending

        // check if message need to be sent in delay time
        if(localstorage_data && parseInt(localstorage_data) > (new Date()).getTime()){
            Setting_Msg(11000)
            return {}
        }


        dispatch({type : "Static_Status" , data : "lcc"})      // loading


        const req = await fetching(ContactCreateURL , auth.token ? {...data , token : auth.token} : data )

        if(req.success)
            localStorage.setItem('last_sent_msg' , (new Date((new Date).setMinutes( (new Date()).getMinutes() + delay_minutes ))).getTime())

        dispatch({type : "Static_Status" , data : "n"})

        // notification
        Setting_Msg(10000)
    }
}