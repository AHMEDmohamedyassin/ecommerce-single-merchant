import { fetching } from "Fetch/Fetch"
import { CartAddURL, CartDeleteAllURL, CartDeleteURL, CartListURL, CartSubURL } from "Fetch/Url"
import { Setting_Confirm } from "./SettingAction"
import { store } from "../../redux/store"



/**
 * opennign and close side cart menue
 */
export const Cart_ToggleMenuAction = (open = true) => {
    return {
        type : "Cart_Data" , 
        data : {
            side_cart : open
        }
    }
}


/**
 * initiate cart data
 */
export const Cart_Initiate = () => {
    return async dispatch => {
        dispatch({type:"Cart_Status" , data : "li"})         // loading initiate

        const req = await fetching(CartListURL , {} , "GET" , false)

        if(!req.success)
            return dispatch({type:"Cart_Status" , data : "n"})

        
        dispatch({
            type : "Cart_Data" , 
            data : {
                ...req.res
            }
        })
    }
}


/**
 * adding to cart
 * removing from cart 
 * delete item from cart 
 * clear cart
 */
export const Cart_AddingAction = (id , type = "add") => {// product id 
    return async dispatch => {
        const cart = store.getState().CartReducer

        dispatch({type:"Cart_Status" , data : "la"})        // loading adding to cart

        let url = CartSubURL

        // selecting action 
        switch(type) {
            case "add" : 
                url = CartAddURL
                break
            case "sub" : 
                url = CartSubURL
                break
            case "delete" : 
                url = CartDeleteURL
                break
            case "delete_all" : 
                if(!Setting_Confirm(3000)) return {}
                url = CartDeleteAllURL
                const req = await fetching(url , {id})
                return dispatch({type:"Cart_Reset"})
        }
        
        const req = await fetching(url , {id})
    
        if(!req.success)
            return dispatch({type:"Cart_Status" , data : "n"})

        dispatch({
            type : "Cart_Data" , 
            data : {
                ...req.res
            }
        })
    }
}