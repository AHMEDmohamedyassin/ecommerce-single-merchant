import { ProductSearchURL } from 'Fetch/Url'
import { fetching } from '../../Fetch/Fetch'
import {store} from '../store'


/**
 * listing products 
 */
export const ProductList_List = () => {
    return async dispatch => {
        dispatch({type:"ProductList_Status"  , data : "ll"})          // loading list

        const req = await fetching(`${ProductSearchURL}?with_products=1` , {} , "GET")

        if(!req.success)
            dispatch({type:"ProductList_Status"  , data : "n"})


        // appending data to store 
        dispatch({
            type : "ProductList_Data" , 
            data : {
                ...req.res
            }
        })
    }
}