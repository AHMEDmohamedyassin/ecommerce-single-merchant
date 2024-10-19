import { notify } from "components/public/NotificationComp"
import { store } from "../store"
import { msgs } from "Fetch/Msg"
import { Confirm_Msg } from "../../Fetch/Confirm_Msg"


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
 * side menu control
 */
export const Setting_SideMenuAction = (open = true) => {
    return {
        type : "Setting_Data" , 
        data : {
            side_menu : open
        }
    }
}