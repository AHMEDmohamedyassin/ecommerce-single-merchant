import { store } from "../../redux/store"
import { fetching } from "../../Fetch/Fetch"
import { OrderListURL } from "../../Fetch/Url"


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