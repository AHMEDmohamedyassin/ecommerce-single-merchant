import { fetching } from "Fetch/Fetch"
import { CartAddURL, CartDeleteAllURL, CartDeleteURL, CartListURL, CartSubURL, CouponCheckURL } from "Fetch/Url"
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


/**
 * check if coupon is available
 */
export const Cart_CouponCheckAction = (coupon) => {
    return async dispatch => {

        dispatch({type : "Cart_Status" , data : "lc"})          // loading coupon check

        const req = await fetching(CouponCheckURL , {coupon} , "POST" , false)

        // checking if coupon is valid
        if(!req.success){
            // removing coupon to order reducer in case of it is valid
            dispatch({
                type : "Order_Data" ,
                data : {
                    coupon : null
                }
            })

            return dispatch({
                type : "Cart_Data" , 
                data : {
                    coupon_valid : false , 
                    coupon_value : 0
                }
            })  // invalid coupon
        }


        dispatch({
            type : "Cart_Data" , 
            data : {
                coupon_value : req.res.value , 
                coupon_valid : true
            }
        })

        // adding coupon to order reducer in case of it is valid
        return dispatch({
            type : "Order_Data" ,
            data : {
                coupon
            }
        })
    }
} 