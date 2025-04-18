import { store } from "../../redux/store"
import { fetching } from "../../Fetch/Fetch"
import { ProductDeleteSubURL, ProductDeleteURL, ProductSearchURL } from "../../Fetch/Url"
import { Setting_Confirm, Setting_Msg } from "./SettingAction"



/**
 * searching products and listing
 */
export const ProductList_SearchAction = (data) => {
    return async dispatch => {
        const state = store.getState().ProductListReducer ?? {}

        if(state.items?.length && (data?.search && data.search == state.search) && (!data.page || data.page < 2) )
            return 

        // perparing parameters , by getting stored parameters in store and update on it by provided {data}
        let params = `?page=1&orderby=${state.orderby}&order=${state.order}&search=${state.search}&with_products=1&`
        for(const key in data ){
            params = params.concat(key , "=" , data[key] , "&")
        }

        dispatch({type :"ProductList_Status" , data : "ll"})      // loading listing

        const req = await fetching(`${ProductSearchURL}${params}` , {} , "GET")


        if(!req.success)
            return dispatch({type :"ProductList_Status" , data : "n"})


        dispatch({
            type : "ProductList_Data" ,
            data  : {
                ...req.res , 
                ...data
            }
        })
    }
}



/**
 * delete product and update the list
 * same as Product_DeleteAction but this action update the shown list
 */
export const ProductList_DeleteAction = (id) => {
    return async dispatch => {
        // confirmation 
        if(!Setting_Confirm(1000)) return {}

        let items = store.getState().ProductListReducer.items ?? []

        dispatch({type : "ProductList_Status" , data : "ld"}) // loading delete product

        const req = await fetching(ProductDeleteURL , {id})

        if(!req.success)
            return  dispatch({type : "ProductList_Status" , data : "n"})


        // updating items list 
        items = items.filter(e => e.id != id) 

        // notification 
        Setting_Msg(20000)

        dispatch({
            type : "ProductList_Data" ,
            data : {
                items
            }
        })
    }
}



/**
 * delete product and update the list
 * same as Product_DeleteAction but this action update the shown list
 */
export const ProductList_DeleteSubProductAction = (collection_id,  product_id) => {
    return async dispatch => {
        // confirmation 
        if(!Setting_Confirm(1000)) return {}

        let items = store.getState().ProductListReducer.items ?? []

        dispatch({type : "ProductList_Status" , data : "lds"}) // loading delete sub product

        const req = await fetching(ProductDeleteSubURL , {id : product_id})

        if(!req.success)
            return  dispatch({type : "ProductList_Status" , data : "n"})


        // updating items list removing deleted product form list of products inside collection 
        items = items.map(e => e.id == collection_id ? {...e , product : (e.product || []).filter(ele => ele.id != product_id)  } : e) 

        // notification 
        Setting_Msg(20000)

        dispatch({
            type : "ProductList_Data" ,
            data : {
                items
            }
        })
    }
}