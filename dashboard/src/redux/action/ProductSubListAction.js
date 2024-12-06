import { fetching } from "Fetch/Fetch"
import { ProductDeleteSubURL, ProductListSubURL } from "../../Fetch/Url"
import { store } from "../../redux/store"



/**
 *  listing sub products  
 */
export const ProductSubList_ListAction = (data = {}) => {
    return async dispatch => {
        const products = store.getState().ProductSubListReducer
        
        dispatch({type : "ProductSubList_Status" , data : "ll"})         // loading list

        const req = await fetching(`${ProductListSubURL}?page=${data.page ?? products.current}&order=${data.order ?? products.order}&orderby=${data.orderby??products.orderby}` , {} , "GET")

        if(!req.success)
            return dispatch({type : "ProductSubList_Status" , data : "n"}) // normal status

        dispatch({
            type : "ProductSubList_Data" , 
            data : {
                ...req.res , 
                ...data
            }
        })
    }
}


/**
 * list sub product delete
 */
export const ProductSubList_DeleteAction = (id) => {
    return async dispatch => {
        const products = store.getState().ProductSubListReducer

        dispatch({type : "ProductSubList_Status" , data : "ll"})         // loading list

        const req = await fetching(ProductDeleteSubURL , {id})

        if(!req.success)
            return dispatch({type : "ProductSubList_Status" , data : "n"}) // normal status

        dispatch({
            type : "ProductSubList_Data" , 
            data : {
                items : products.items.filter(e => e.id != id)
            }
        })
    }
}