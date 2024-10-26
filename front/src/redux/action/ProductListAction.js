import { ProductSearchURL } from 'Fetch/Url'
import { fetching } from '../../Fetch/Fetch'
import {store} from '../store'


/**
 * listing products 
 *     // "orderby" : "id" 
    // "order" : "desc" ,
    // "search" : "products",
    // "with_products" : false , 
    "categories" : [1] , 
    "page" : 1
 */
export const ProductList_List = (searchParams) => {
    return async dispatch => {
        dispatch({type:"ProductList_Status"  , data : "ll"})          // loading list

        // query handling
        let query = ""
        for(const [key , value] of searchParams.entries()){
          if(key == 'categories')
            query = query.concat('&' , key , '[]=' , value)
          else query = query.concat('&' , key , '=' , value)
        }

        const req = await fetching(`${ProductSearchURL}?with_products=1${query}` , {} , "GET")

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


/**
 * listing products with categories
 */
export const ProductList_Categories = (categories) => {
    return async dispatch => {
        dispatch({type:"ProductList_Status"  , data : "ll"})          // loading list

        let query = ''
        categories.forEach(e => query = query.concat('&categories[]=' , e) )

        const req = await fetching(`${ProductSearchURL}?with_products=1&perpage=8&${query}` , {} , "GET")

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