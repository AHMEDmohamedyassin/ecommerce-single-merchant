import { ProductSearchURL } from 'Fetch/Url'
import { fetching } from '../../Fetch/Fetch'
import {store} from '../store'


/**
 * list products according query
 * 'orderby' => 'in:publish_date,ratting,reviews,views,id,created_at,title,updated_at,description,average_price|nullable' , 
                'order' => 'in:asc,desc',
 */
export const Home_OrderAction = (list) => {
    return async dispatch => {
        const stored_data = store.getState().HomeReducer

        if(stored_data[list]?.length)
            return {}

        dispatch({type:"Home_Status"  , data : "ll"})          // loading list

        let query = "" ; 

        switch(list){
            case "latest" : 
                    query = 'orderby=publish_date&order=desc'
                break ;
            case "review" : 
                    query = 'orderby=ratting&order=desc'
                break ;
            case "price" : 
                    query = 'orderby=average_price&order=asc'
                break ;
            case "views" : 
                    query = 'orderby=views&order=desc'
                break ;
        }

        const req = await fetching(`${ProductSearchURL}?with_products=1&perpage=8&${query}` , {} , "GET")

        if(!req.success)
            dispatch({type:"Home_Status"  , data : "n"})


        // appending data to store 
        dispatch({
            type : "Home_Data" , 
            data : {
                [list] : req.res.items
            }
        })
    }
}