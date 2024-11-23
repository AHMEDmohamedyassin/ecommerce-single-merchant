import { fetching } from "Fetch/Fetch"
import { OrderCreateURL, OrderListURL, SendPaymentURL } from "Fetch/Url"
import { store } from "../../redux/store"
import { Address_ListAction } from "./AddressAction"

// translate order_status
const order_status = {
    pending : "في انتظار الدفع" , 
    ready : "جاهز للإعداد" , 
    preparing : "يتم الإعداد" , 
    success : "ناجح" , 
    canceled : "ملغي" ,
    "canceled without refund" : ""
}

/**
 * create order action
 * if coupon not valid it will continue creating order without any error
 */
export const Order_CreateAction = () => {
    return async dispatch => {
        const {pay_on_diliver , shipping_address_id , coupon , items} = store.getState().OrderReducer

        dispatch({type:"Order_Status" , data : "lc"})         // loading create order

        const req = await fetching(OrderCreateURL , {pay_on_diliver , shipping_address_id : shipping_address_id ?? null , coupon})

        if(!req.success)
            return dispatch({type:"Order_Status" , data : "n"})
    

        // forwarding to payment gateway if user selected to pay online and cart total is more than zero
        if(!pay_on_diliver && req.res?.cart_total > 0)
            store.dispatch(Order_PayingForOrderAction(req.res.id))

        // refresh orders 
        store.dispatch(Order_ListAction()).then(() => {
            // reset the cart 
            dispatch({type :"Cart_Reset"})
        })
    }
}


/**\
 * listing orders 
 */
export const Order_ListAction = () => {
    return async dispatch => {
        const address = store.getState().AddressReducer

        dispatch({type : "Order_Status" , data : "ll"})       // loading listing

        // fetching user addresses if not fetched before
        if(!address.items?.length)
            store.dispatch(Address_ListAction())

        // fetching orders
        const req = await fetching(`${OrderListURL}` , {}  , "GET" , false)

        if(!req.success)
            return dispatch({type : "Order_Status" , data : "n"})       // normal

        
        // translating order status and appending shipping addresses details
        let items = req.res?.items?.map(e => ({
            ...e , 
            ar_status : order_status[e.status]  , 
            shipping_address : store.getState().AddressReducer.items.find(ele => ele.id == e.shipping_address_id) ?? {}
        }))

        dispatch({
            type : "Order_Data" , 
            data : {
                ...req.res , 
                items
            }
        })
    }
}



/**
 * sending payment 
 * paying for order
 */
export const Order_PayingForOrderAction = (id) => {
    return async dispatch => {

        dispatch({type : "Order_Status" , data: "lp"})        // loading payment

        const req = await fetching(SendPaymentURL , {id})

        if(!req.success)
            return dispatch({type : "Order_Status" , data: "n"})

        window.open(req.res.url, '_blank');
    }
}