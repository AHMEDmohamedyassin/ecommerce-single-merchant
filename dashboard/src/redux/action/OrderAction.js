import { fetching } from "../../Fetch/Fetch";
import { CouponReadURL, OrderCreateURL, OrderReadURL, ProductSerialURL, UserCreateURL } from "../../Fetch/Url";
import { store } from "../../redux/store";
import { Setting_Msg } from "./SettingAction";


/**
 * getting product data using serial
 */
export const Order_ProductSerailRetrieveAction = serial => {
    return async dispatch => {
        dispatch({type : "Order_Status" , data : "ls"}); // loading serial

        const req = await fetching(`${ProductSerialURL}?serial=${serial}` , {} , "GET")

        if(!req.success)
            return dispatch({type : "Order_Status" , data : "n"});


        dispatch({
            type:"Order_Data" , 
            data : {
                collection : req.res
            }
        })
    }
}



/**
 * handle select product from collection
 */
export const Order_ProductSelectAction = (id) => {
    return async dispatch => {
        const state = store.getState().OrderReducer 
        let products = state.products ?? [] 
        let selected_product = state.collection?.product?.find(ele => ele.id == id) ?? {}
        
        // check if product is stored before
        let stored_product = products.find(e => e.id == id)
        if(stored_product)
            if(stored_product.quantity > stored_product.count)   // check if product available quantity is greater than the required quantity
                products = products.map(e => e.id == id ? {...e , count : e.count + 1} : e)
            else {          // if product available quantity is less than required return with clearing colleciton object
                Setting_Msg(32000)
                return dispatch({ type : "Order_Data" , data : {collection : {}}})
            }       
        // update products selected by adding new product to products list in store
        else
            products = [
                ...products , 
                {
                    ...selected_product , 
                    count : 1 , 
                    collection_id : state.collection?.id , 
                    title : `${state.collection?.title} - ${selected_product.size} - ${selected_product.color}`
                }
            ]

        dispatch({
            type :"Order_Data" , 
            data : {
                collection : {} , 
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
        
        // data need to be sent , prepairing the order products and addtionals and coupon and status
        let products = state.products?.map(({id , price , count}) => ({id , price , quantity : count}))   // get only needed form array
        let data = {products , additional : state.additional , coupon : state.coupon?.coupon , status : state.order_state}
        
        // check if user data is provided by search of existing users
        if(['old' , 'new'].includes(state.user_state) && state.user )
            data.user_id = state.user.id

        const req = await fetching(OrderCreateURL , data )

        if(!req.success)
            return dispatch({type :"Order_Status" , data : "n"})

        // notification
        Setting_Msg(33000)

        dispatch({
            type:"Order_Data", 
            data : {
                ...req.res ,
                status : "sc",  // success creating the order
            }
        })
    }
}




/**
 * order read data
 */
export const Order_ReadAction = (id) => {
    return async dispatch => {
        const state = store.getState().OrderReducer

        // prevent multi-fetch to same data
        if(state.id == id)
            return {}
        
        dispatch({type : "Order_Status" , data : "lr"})        // loading read order data

        const req = await fetching(`${OrderReadURL}?id=${id}` , {} , "GET")

        if(!req.success)
            return dispatch({type : "Order_Status" , data : "n"})
        
        
        // modify the response to be readed by appliction
        let res = {
            ...req.res , 
            products : req.res?.product?.map(({size , color , id , pivot , collection}) => ({count : pivot?.quantity , price : pivot?.price , title : `${collection?.title} - ${size} - ${color}` , id , collection_id : collection?.id})) , 
            order_state : req.res?.status
        }
        delete res.product // error in returned name of collection that containing products , [products] should be [product]
        delete res.status

        dispatch({
            type :"Order_Data" , 
            data : res
        })
    }
}
