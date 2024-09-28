import { fetching } from "../../Fetch/Fetch";
import { CouponReadURL, OrderCreateURL, ProductSerialURL } from "../../Fetch/Url";
import { store } from "../../redux/store";
import { Setting_Msg } from "./SettingAction";


/**
 * getting product data using serial
 */
export const Order_ProductSerailRetrieveAction = serial => {
    return async dispatch => {
        let products = store.getState().OrderReducer?.products ?? []

        // check if product is retrieved before
        let stored_product = products.find(e => e.serial == serial)
        if(stored_product){

            // check the avalibility of product
            if(stored_product.quantity <= stored_product.count){
                // notification of not sufficient products
                Setting_Msg(32000)
                return {}
            }

            // increasing quantity of product if it is previously scanned
            products = products.map(e => e.serial == serial ? {...e , count : e.count + 1} : e)
            return dispatch({
                type : "Order_Data" , 
                data : {
                    products
                }
            })
        }

        dispatch({type : "Order_Status" , data : "ls"}); // loading serial

        const req = await fetching(`${ProductSerialURL}?serial=${serial}` , {} , "GET")

        if(!req.success)
            return dispatch({type : "Order_Status" , data : "n"});

        // check if retrieve product has avalible quantities
        if(req.res.quantity < 1){   
            Setting_Msg(32000)
            return dispatch({type : "Order_Status" , data : "n"}); 
        }

        // updating products 
        products = [...products , {...req.res , count : 1}]

        dispatch({
            type:"Order_Data" , 
            data : {
                products
            }
        })
    }
}


/**
 * changing order counts
 */
export const Order_ChangeCountAction = (id , count) => {
    return async dispatch => {
        let products = store.getState().OrderReducer?.products ?? []
        let stored_product = products.find(e => e.id == id)


        // check avalibility of products in case of increasing required quantity
        if(count > stored_product.quantity){
            Setting_Msg(32000)
            return {}
        }

        // update products list
        if(count <= 0)
            products = products.filter(e => e.id != id)
        else products = products.map(e => e.id == id ? {...e , count}  : e)

        dispatch({
            type:"Order_Data" , 
            data : {
                products
            }
        })
    }
}


/**
 * create additional
 */
export const Order_AdditionalCreateAction = () => {
    let additional = store.getState().OrderReducer?.additional ?? []
    return {
        type : "Order_Data" , 
        data : {
            additional : [
                ...additional , 
                {quantity : 1 , id : Math.ceil(Math.random() * 100000000) }
            ]
        }
    }
}


/**
 * update additional
 */
export const Order_AdditionalUpdateAction = (data) => {
    return async dispatch => {
        let additional = store.getState().OrderReducer?.additional ?? []
        let stored_additional = additional.find(e => e.id == data.id)

        console.log(data)
        // delete additional if its quantity less than 1 
        if(stored_additional && data.quantity == 0)
            additional = additional.filter(e => e.id != data.id)
        // updating the additional item
        else
            additional = additional.map(e => e.id == data.id ? {...e , ...data} : e)


        dispatch({
            type : "Order_Data" , 
            data : {
                additional
            }
        })
    }
}


/**
 * coupon check if it is valid
*/
export const Order_CouponCheckAction = (data) => {
    return async dispatch => {
        let state = store.getState().OrderReducer

        dispatch({type :"Order_Status" , data : "lcc"})      // loading coupon check
    
        const req = await fetching(CouponReadURL , data)

        if(!req.success)
            return dispatch({type :"Order_Status" , data : "n"})

        dispatch({
            type : "Order_Data" , 
            data : {
                coupon : req.res
            }
        })
    }
}



/**
 * create order
 */
export const Order_CreateAction = () => {
    return async dispatch => {
        const state = store.getState().OrderReducer
        
        dispatch({type :"Order_Status" , data : "lc"})      // loading create order
        
        // data need to be sent
        let products = state.products?.map(({id , price , count}) => ({id , price , quantity : count}))   // get only needed form array
        let data = {products , additional : state.additional , coupon : state.coupon?.coupon , status : state.order_state}
        
        console.log(data)

        const req = await fetching(OrderCreateURL , data )

        if(!req.success)
            return dispatch({type :"Order_Status" , data : "n"})

        // notification
        Setting_Msg(33000)

        dispatch({
            type:"Order_Reset", 
            data : {
                status : "sc"      // success creating the order
            }
        })
    }
}