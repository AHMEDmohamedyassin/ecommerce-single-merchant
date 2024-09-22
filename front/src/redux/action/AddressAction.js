import { AddressCreateURL, AddressDeleteURL, AddressListURL, AddressReadURL, AddressUpdateURL } from "Fetch/Url"
import { Setting_Msg } from "./SettingAction"
import { fetching } from "../../Fetch/Fetch"
import { store } from "../../redux/store"


/**
 * creating new location 
 * data = {locaion , json , default}
 */
export const Address_CreateAction = (data) => {
    return async (dispatch) => {

        dispatch({
            type:"Address_Status",
            data: "lc"
        })

        const req = await fetching(AddressCreateURL , data)

        if(!req.success)
            return dispatch({type:'Address_Status' , data:"n"})

        Setting_Msg(7000)

        dispatch({
            type : "Address_Append" ,
            data :req.res
        });
    }
}


/**
 * list addresses
 */
export const Address_ListAction = () => {
    return async (dispatch) => {

        dispatch({
            type:"Address_Status",
            data: "ll"
        })

        const req = await fetching(AddressListURL , {} , "GET")

        if(!req.success)
            return dispatch({type:'Address_Status' , data:"n"})
        
        dispatch({
            type : "Address_Data" ,
            data :{
                items : req.res,
            }
        });
    }
}


/**
 * read Address data
 */
export const Address_ReadAction = (id) => {
    return async (dispatch) => {

        dispatch({
            type:"Address_Status",
            data: "lr"
        })

        const req = await fetching(`${AddressReadURL}?id=${id}` , {} , "GET")

        if(!req.success)
            return dispatch({type:'Address_Status' , data:"n"})
        
        dispatch({
            type : "Address_Data" ,
            data :{
                address : {
                    ...req.res?.json , 
                    id : req.res?.id , 
                    address : req.res?.address , 
                    default : req.res?.default
                },
            }
        });
    }
}


/**
 * update address
 */
export const Address_UpdateAction = (data) => {
    return async (dispatch) => {
        let addresses = store.getState().AddressReducer?.items

        dispatch({
            type:"Address_Status",
            data: "le"
        })

        const req = await fetching(AddressUpdateURL , data)

        if(!req.success)
            return dispatch({type:'Address_Status' , data:"n"})
        
        Setting_Msg(8000)

        // update address in items 
        if(addresses)
            addresses = addresses.map(e => e.id == data.id ? {...e , address : req.res.address} : e)

        dispatch({
            type : "Address_Data" ,
            data :{
                items : addresses,
                address : {
                    ...req.res?.json , 
                    id : req.res?.id , 
                    address : req.res?.address , 
                    default : req.res?.default
                },
            }
        });
    }
}


/**
 * delete address
 */
export const Address_DeleteAction = (id) => {
    return async (dispatch) => {
        let addresses = store.getState().AddressReducer?.items

        dispatch({
            type:"Address_Status",
            data: `ld${id}`
        })

        const req = await fetching(AddressDeleteURL , {id})

        if(!req.success)
            return dispatch({type:'Address_Status' , data:"n"})
        
        // update address in items 
        if(addresses)
            addresses = addresses.filter(e => e.id != id)

        Setting_Msg(9000)

        dispatch({
            type : "Address_Data" ,
            data :{
                items : addresses
            }
        });
    }
}