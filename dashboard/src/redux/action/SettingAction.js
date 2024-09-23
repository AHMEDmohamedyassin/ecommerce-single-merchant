import { notify } from "components/public/NotificationComp"
import { store } from "../store"
import { msgs } from "Fetch/Msg"


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

