import { fetching } from "Fetch/Fetch"
import { ProductReviewsURL, ReviewCreateURL } from "Fetch/Url"
import { store } from "../../redux/store"


/**
 * reading reviews 
 */
export const Review_ReviewReadAction = (page = 1 , perpage = null) => {
    return async dispatch => {
        const product = store.getState().ProductReducer
        const reviews = store.getState().ReviewReducer

        if(!product.id) return {}


        dispatch({type:"Review_Status" , data : 'lr'});       // loading reading

        const req = await fetching(`${ProductReviewsURL}?id=${product.id}&page=${page}&perpage=${perpage}` , {} , "GET");
    
        if(!req.success)
            return dispatch({type:"Review_Status" , data : 'n'});      // normal


        // appending items to reviews in case of pagination
        if(page > 1 && reviews.items?.length)
            return dispatch({
                type : "Review_Data" , 
                data : {
                    ...req.res,
                    items : [...reviews.items , ...req.res.items]
                }
            })

        dispatch({
            type : "Review_Data" , 
            data : req.res
        })
    } 
}






/**
 * submit review
 */
export const Review_ReviewSubmitAction = (obj) => {
    return async dispatch => {
        const product = store.getState().ProductReducer
        const reviews = store.getState().ReviewReducer

        dispatch({type:"Review_Status" , data : 'ls'});       // loading submit

        const req = await fetching(ReviewCreateURL , {...obj , id : product.id})

        if(!req.success)
            return dispatch({type:"Review_Status" , data : 'n'});      // normal


        // appending new review
        dispatch({
            type : "Review_Data" ,
            data : {
                items : [req.res , ...reviews.items]
            }
        })

        // updating product store for preventing rewiewable state
        dispatch({
            type : "Product_Data" , 
            data : {
                reviewable : false
            }
        })
    }
}