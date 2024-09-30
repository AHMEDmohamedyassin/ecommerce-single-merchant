import { store } from "../../redux/store"
import { fetching } from "../../Fetch/Fetch"
import { OrderListURL, OrderStatusURL } from "../../Fetch/Url"
import { Setting_Confirm, Setting_Msg } from "./SettingAction"


/**
 * listing orders
 */
export const OrderList_ListAction = (data) => {
    return async dispatch => {
        const state = store.getState().OrderListReducer

        dispatch({type : "OrderList_Status" , data : "ll"})        // loading listing

        // handle parameters
        let params = `?orderby=${state.orderby}&desc=${state.order}&status=${state.order_status}&`
        for(const key in data )
            params = params.concat(key , "=" , data[key] , "&")

        const req = await fetching(`${OrderListURL}${params}` , {} , "GET")

        if(!req.success)
            return dispatch({type : "OrderList_Status" , data : "n"})

        dispatch({
            type:"OrderList_Data" , 
            data : {
                ...req.res , 
                order_status : data.status ?? state.order_status ,
                orderby : data.orderby ?? state.orderby,
                order : data.desc ?? state.order
            }
        })
    }
}



/**
 * update order statis and updating it inside items array
 */
export const OrderList_StatusAction = (data) => {      // {id , status}
    return async dispatch => {
        // confirmation
        if(!Setting_Confirm(2000)) return {}

        let items = store.getState().OrderListReducer?.items ?? []

        dispatch({type : "OrderList_Status" , data : "ls"})        // loading status handle

        const req = await fetching(OrderStatusURL , data)

        if(!req.success)
            return dispatch({type : "OrderList_Status" , data : "n"})

        // updating items
        items = items.map(e => e.id == data.id ? {...e , status : data.status} : e)

        // notification
        Setting_Msg(34000)

        dispatch({
            type:"OrderList_Data" , 
            data : {
                items
            }
        })
    }
}