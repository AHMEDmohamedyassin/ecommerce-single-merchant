import { fetching } from "Fetch/Fetch"
import { UserDeleteURL, UserListURL } from "Fetch/Url"
import { store } from "../../redux/store"
import { Setting_Confirm, Setting_Msg } from "./SettingAction"



/**
 * getting users for listing
 */
export const UserList_ListAction = ({search , page}) => {
    return async dispatch => {
        const stored_data = store.getState().UserListReducer
        
        // handle search word not to be resetted on pagination
        let search_word = search
        if(search == undefined)
            search_word = stored_data.search

        dispatch({type:"UserList_Status" , data: "ll"})    // loading listing of users

        const req = await fetching(`${UserListURL}?page=${page??1}&search=${search_word}` , {} , "GET")

        if(!req.success)
            return dispatch({type:"UserList_Status" , data: "n"})

        dispatch({
            type : "UserList_Data" , 
            data : {
                ...req.res ,
                search  : search_word
            }
        })
    }
}


/**
 * handle user delete
 */
export const UserList_DeleteAction = id => {
    return async dispatch => {
        if(!Setting_Confirm(1000)) return {} // confirmation

        let items = store.getState().UserListReducer?.items

        dispatch({type:"UserList_Status" , data: "ld"})    // loading delete user

        const req = await fetching(UserDeleteURL , {id})

        if(!req.success)
            dispatch({type:"UserList_Status" , data: "n"})


        // removing deleted user from stored items
        items = items.filter(e => e.id != id)

        // notification
        Setting_Msg(24000)

        dispatch({
            type : "UserList_Data" , 
            data : {
                items
            }
        })
    }
}