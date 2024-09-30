import { notify } from "components/public/NotificationComp"
import { store } from "../store"
import { msgs } from "Fetch/Msg"
import { Confirm_Msg } from "Fetch/Confirm_Msg"
import { fetching } from "../../Fetch/Fetch"
import { StaticCreateURL, StaticReadURL } from "Fetch/Url"
import { Setting_Confirm } from "./SettingAction"


/**
 * create json files for static pages
 */
export const Static_CreateAction = (data) => {
    return async dispatch => {

        // confirmation update
        if(!Setting_Confirm(2000)) return{}

        dispatch({type : "Static_Status" , data : "lc"});

        const req = await fetching(StaticCreateURL , data)

        if(!req.success)
            return dispatch({type : "Static_Status" , data : "n"});

        dispatch({
            type : "Static_Data", 
            data : {
                [data.type] : data.json
            }
        })
    }
}



/**
 * Read json files
 */
export const Static_ReadAction = (type) => {
    return async dispatch => {
        const state = store.getState().StaticReducer

        // prevent refetching same data
        if(state[type])
            return {}

        dispatch({type : "Static_Status" , data : "lr"});      // loading read

        const req = await fetching(`${StaticReadURL}?type=${type}` , {} , "GET" , false)

        if(!req.success)
            return dispatch({type : "Static_Status" , data : "n"});

        dispatch({
            type : "Static_Data", 
            data : {
                [type] : req.res
            }
        })
    }
}