import { fetching } from "Fetch/Fetch"
import { ProductReadURL } from "Fetch/Url"
import { store } from "../store"


/**
 * reading product data
 */
export const Product_ReadAction = (id) => {
    return async dispatch => {
        const stored_id = store.getState().ProductReducer?.id

        // prevent refetch same data
        if(stored_id == id)
            return {}
        
        dispatch({type : "Product_Status" , data : "lr"})    // loading read product

        const req = await fetching(`${ProductReadURL}?id=${id}` , {} , "GET" , false) 

        if(!req.success)
            return dispatch({type : "Product_Status" , data : "n"})

        dispatch({
            type : "Product_Data" , 
            data : {
                ...req.res
            }
        })
    }
}