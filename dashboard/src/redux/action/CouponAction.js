import { fetching } from "Fetch/Fetch"
import { CouponCreateURL, CouponDeleteURL, CouponListURL, CouponPaidURL, CouponReadURL } from "Fetch/Url"
import { store } from "../../redux/store"
import { Setting_Confirm, Setting_Msg } from "./SettingAction"


/**
 * Listing coupons
 */
export const Coupon_ListAction = (data) => {
    return async dispatch => {
        const state = store.getState().CouponReducer

        dispatch({type : "Coupon_Status" , data :"ll"})    // loading listing coupon

        // perparing parameters , by getting stored parameters in store and update on it by provided {data}
        let params = `?page=1&orderby=${state.orderby}&order=${state.order}&`
        for(const key in data ){
            params = params.concat(key , "=" , data[key] , "&")
        }

        // making request
        const req = await fetching(`${CouponListURL}${params}` , {} , "GET" , false)

        if(!req.success)
            return dispatch({type : "Coupon_Status" , data :"n"}) 


        // dispatch the changes
        dispatch({
            type : "Coupon_Data" , 
            data : {
                ...req.res , 
                ...data
            }
        })
    }
}


/**
 * creating coupons
 */
export const Coupon_CreateAction = (data) => {
    return async dispatch => {
        let items = store.getState().CouponReducer?.items ?? []
        let created = 0

        dispatch({type : "Coupon_Status" , data :"lc"})    // loading create coupon

        // looping to create coupons as count
        for(let i = 0 ; i < data.count ; i ++){
            const req = await fetching(CouponCreateURL  , data)
            if(!req.success)
                break
            items = [req.res , ...items]
            created += 1
        }
        
        dispatch({type : "Coupon_Status" , data :"n"}) 

        // notification
        if(created)
            Setting_Msg(26000)

        // dispatch the changes
        dispatch({
            type : "Coupon_Data" , 
            data : {
                items
            }
        })
    }
}


/**
 * delete coupon
 */
export const Coupon_DeleteAction = (id) => {
    return async dispatch => {
        
        // confirmation of delete
        if(!Setting_Confirm(1000)) return 

        let items = store.getState().CouponReducer?.items ?? []

        dispatch({type : "Coupon_Status" , data :"ld"})    // loading delete coupon

        // making request
        const req = await fetching(CouponDeleteURL , {id})

        if(!req.success)
            return dispatch({type : "Coupon_Status" , data :"n"}) 

        // filtering items
        items = items.filter(e => e.id != id)

        // notification
        Setting_Msg(28000)

        // dispatch the changes
        dispatch({
            type : "Coupon_Data" , 
            data : {
                items
            }
        })
    }
}


/**
 * showing the coupon
 */
export const Coupon_ShowAction = (id) => {
    return async dispatch => {
        let items = store.getState().CouponReducer?.items ?? []

        dispatch({type : "Coupon_Status" , data :"ls"})    // loading show coupon

        // making request
        const req = await fetching(CouponReadURL , {id})

        if(!req.success)
            return dispatch({type : "Coupon_Status" , data :"n"}) 

        // filtering items
        items = items.map(e => e.id == id ? {...e , coupon : req.res?.coupon} : e)

        // copying the coupon
        navigator.clipboard.writeText(req.res?.coupon).then(Setting_Msg(27000))

        // dispatch the changes
        dispatch({
            type : "Coupon_Data" , 
            data : {
                items
            }
        })
    }
}


/**
 * change paid status of coupon
 */
export const Coupon_PaidAction = (id) => {
    return async dispatch => {
        let items = store.getState().CouponReducer?.items ?? []

        dispatch({type : "Coupon_Status" , data :"lp"})    // loading paid coupon

        // making request
        const req = await fetching(CouponPaidURL , {id})

        if(!req.success)
            return dispatch({type : "Coupon_Status" , data :"n"}) 

        // filtering items
        items = items.map(e => e.id == id ? {...e , ...req.res} : e)

        // dispatch the changes
        dispatch({
            type : "Coupon_Data" , 
            data : {
                items
            }
        })
    }
}