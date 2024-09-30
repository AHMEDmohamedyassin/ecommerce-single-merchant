import { ReviewDeleteURL, ReviewListURL, ReviewPublishURL } from "Fetch/Url"
import { fetching } from "../../Fetch/Fetch"
import { Setting_Confirm, Setting_Msg } from "./SettingAction"
import { store } from "../../redux/store"


/**
 * listting reviews 
 */
export const Review_ListAction = ({page , search }) => {
    return async dispatch => {
        const state = store.getState().ReviewReducer

        // prevent fetching same data
        if(state.search == search && state.current == page)
            return {}

        dispatch({type :"Review_Status" , data : "ll"})     // loading listing reviews

        // chekc if search parameter is provided
        let searchparam = "";
        if(search) searchparam = `&search=${search}`

        const req = await fetching(`${ReviewListURL}?page=${page??1}${searchparam}` , {} , "GET" , false)

        if(!req.success) 
            return dispatch({type :"Review_Status" , data : "n"})

        return dispatch({
            type : "Review_Data" , 
            data : {
                search,
                ...req.res 
            }
        })
    }
}


/**
 * toggle publish state of reveiws
 */
export const Review_PulishAction = (id) => {
    return async dispatch => {
        //confirmation
        if(!Setting_Confirm(2000)) return {}

        let items = store.getState().ReviewReducer?.items ?? []
        let user_page_reviews = store.getState().UserReducer?.review
        
        dispatch({type :"Review_Status" , data : "lp"})     // loading publihs reviews

        const req = await fetching(ReviewPublishURL , {id})

        if(!req.success) 
            return dispatch({type :"Review_Status" , data : "n"})

        items = items.map(e => e.id == id ? {...e , ...req.res} : e)

        // updating review store
        dispatch({
            type : "Review_Data" , 
            data : {
                items
            }
        })

        let user_page_items = user_page_reviews?.items ?? []
        user_page_items = user_page_items.map(e => e.id == id ? {...e , ...req.res} : e)

        // updating user store in case of updating public state from user update page
        dispatch({
            type : "User_Data" , 
            data : {
                review : {
                    ...user_page_reviews , 
                    items : user_page_items
                }
            }
        })
    }
}



/**
 * handle delete of review
 */
export const Review_DeleteAction = (id) => {
    return async dispatch => {
        //confirmation
        if(!Setting_Confirm(1000)) return {}

        let items = store.getState().ReviewReducer?.items ?? []

        dispatch({type :"Review_Status" , data : "ld"})     // loading Delete reviews

        const req = await fetching(ReviewDeleteURL , {id})

        if(!req.success) 
            return dispatch({type :"Review_Status" , data : "n"})

        items = items.filter(e => e.id != id)

        return dispatch({
            type : "Review_Data" , 
            data : {
                items
            }
        })
    }
}