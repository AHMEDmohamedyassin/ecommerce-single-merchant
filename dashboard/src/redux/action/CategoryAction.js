import { CategoryCreateURL, CategorySearchURL, TopCategoryAppendURL, TopCategoryCreateURL, TopCategoryDeleteURL, TopCategoryReadURL } from "Fetch/Url"
import { fetching } from "../../Fetch/Fetch"
import { store } from "../store"
import { Setting_Msg } from "./SettingAction"


/**
 * getting all categories
 */
export const Category_ListAction = () => {
    return async dispatch => {

        // check if categories fetched before 
        const categories = store.getState().CategoryReducer.categories ?? []
        if(categories.length) return 

        dispatch({type : "Category_Status" , data:"llc"})

        const req = await fetching(CategorySearchURL , {} , "GET")

        if(!req.success)
            return dispatch({type : "Category_Status" , data:"n"})

        dispatch({
            type : "Category_Data" ,
            data : {
                categories : req.res?.items
            }
        })
    }
}


/**
 * get all top categories with its related categories
 */
export const TopCategory_ListAction = () => {
    return async dispatch => {

        // check if categories fetched before 
        const top_categories = store.getState().CategoryReducer.top_categories ?? []
        if(top_categories.length) return 

        dispatch({type : "Category_Status" , data:"lltc"}) // loading list top categories

        const req = await fetching(TopCategoryReadURL , {} , "GET")

        if(!req.success)
            return dispatch({type : "Category_Status" , data:"n"})

        dispatch({
            type : "Category_Data" ,
            data : {
                top_categories : req.res
            }
        })
    }
}


/**
 * appending cateogries to top category
 */
export const TopCategory_AppendAction = (data) =>{
    return async dispatch => {
        dispatch({type : "Category_Status" , data:"latc"}) // loading append top categories

        const req = await fetching(TopCategoryAppendURL , data)

        if(!req.success)
            return dispatch({type : "Category_Status" , data:"n"})

        Setting_Msg(10000)

        // reset data
        dispatch({
            type : "Category_Data" , data: {top_categories:[]}
        })
        // updating existing top categories
        dispatch(TopCategory_ListAction());
    }
} 


/**
 * delete top category
 */
export const TopCategory_DeleteAction  = (title) => {
    return async dispatch => {
        let top_categories = store.getState().CategoryReducer?.top_categories ?? []

        dispatch({type : "Category_Status" , data:"ldtc"}) // loading delete top categories

        const req = await fetching(TopCategoryDeleteURL , {title})

        if(!req.success)
            return dispatch({type : "Category_Status" , data:"n"})

        // notification
        Setting_Msg(11000)

        // remove deleted top category from stored
        top_categories = top_categories.filter(e => e.title != title)

        // reset data
        dispatch({
            type : "Category_Data" , data: {top_categories}
        })
    }
}


/**
 * craete Category
 */
export const Category_CreateAction = (data , file) => {
    return async dispatch => {
        let categories = store.getState().CategoryReducer?.categories ?? []

        dispatch({type : "Category_Status" , data:"lcc"}) // loading create categories

        const form = new FormData()
        form.append("title" , data?.title)
        form.append("description" , data?.description)
        form.append("image" , file)

        const req = await fetching(CategoryCreateURL , {} , "POST" , true, {} , form)

        if(!req.success)
            return dispatch({type : "Category_Status" , data:"n"})

        // remove deleted top category from stored
        categories = [req.res , ...categories]

        // notification
        Setting_Msg(12000)

        // reset data
        dispatch({
            type : "Category_Data" , data: {categories}
        })
    }
} 


/**
 * top category create
 */
export const TopCategory_CreateAction = (data) => {
    return async dispatch => {
        let top_categories = store.getState().CategoryReducer?.top_categories ?? []

        // check if top categories is exissts before
        if(top_categories.find(e => e.title == data.title) ?? false)
            return Setting_Msg(14000)

        dispatch({type : "Category_Status" , data:"lctc"}) // loading create top categories

        const req = await fetching(TopCategoryCreateURL , data)

        if(!req.success)
            return dispatch({type : "Category_Status" , data:"n"})

        // notification
        Setting_Msg(13000)

        // reset data
        dispatch({
            type : "Category_Data" , data: {
                top_categories : [{title : data.title , categories:req.res[data.title]["ids"]} , ...top_categories]
            }
        })
    }
} 