import { fetching } from "../../Fetch/Fetch"
import { TopCategoriesReadURL } from "../../Fetch/Url"


/**
 * listing top cateogries and there owned categories
 */
export const Category_ListAction = () => {
    return async dispatch => {
        dispatch({type : "Category_Status" , data : "lr"})    // loading reading categories

        const req = await fetching(TopCategoriesReadURL , {} , "GET")

        if(!req.success)
            return dispatch({type : "Category_Status" , data : "n"})

        return dispatch({
            type : "Category_Data" , 
            data : {
                top_categories : req.res
            }
        })
    }
}