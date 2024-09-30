import { fetching } from "../../Fetch/Fetch"
import { Setting_Confirm, Setting_Msg } from "./SettingAction"
import { store } from "../../redux/store"
import { BlockCreateURL, BlockDisableURL, BlockUserDisableURL } from "Fetch/Url"


/**
 * creating blocks
 */
export const Block_CreateAction = (data) => {
    return async dispatch => {
        const block = store.getState().UserReducer?.block ?? {}

        dispatch({type : "User_Status" , data : 'lb'})     // loading block

        const req = await fetching(BlockCreateURL , data)

        dispatch({type : "User_Status" , data : 'n'})
        
        if(!req.success)
            return {}

        // notificaiton
        Setting_Msg(35000)

        // appending the new block to existing blocks 

        let items = block?.items ?? []
        items = [req.res , ...items]

        dispatch({
            type : "User_Data" , 
            data : {
                block : {
                    ...block , 
                    items
                }
            }
        })
    }
}



/**
 * removing blocks
 */
export const Block_DisableAction = (id) => {
    return async dispatch => {
        const block = store.getState().UserReducer?.block ?? {}

        dispatch({type : "User_Status" , data : 'ldb'})     // loading disable block

        const req = await fetching(BlockDisableURL , {id})

        
        if(!req.success)
            return dispatch({type : "User_Status" , data : 'n'})


        // appending the new block to existing blocks 
        let items = block?.items ?? []
        items = items.map(e => e.id == id ? req.res : e)

        dispatch({
            type : "User_Data" , 
            data : {
                block : {
                    ...block , 
                    items
                }
            }
        })
    }
}



/**
 * removing all user blocks
 */
export const Block_DisableUserBlocksAction = (id) => {          // user id
    return async dispatch => {
        const block = store.getState().UserReducer?.block ?? {}

        dispatch({type : "User_Status" , data : 'ldb'})     // loading disable block

        const req = await fetching(BlockUserDisableURL , {id})

        
        if(!req.success)
            return dispatch({type : "User_Status" , data : 'n'})



        dispatch({
            type : "User_Data" , 
            data : {
                block : {
                    ...block , 
                    items : req.res
                }
            }
        })
    }
}