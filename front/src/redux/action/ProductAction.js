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


        let selected_product = (req.res?.product || []).find(e => e.image != null)
        let colors = [...new Set((req.res?.product || []).map(e => e.color))]
        let selected_image = selected_product.image
        
        dispatch({
            type : "Product_Data" , 
            data : {
                ...req.res , 
                selected_product  , 
                colors , 
                selected_color : selected_product?.color , 
                selected_image , 
            }
        })
    }
}


/**
 * handle Select color 
 */
export const Product_ColorSelectAction = (color) => {
    return async dispatch => {
        const state = store.getState().ProductReducer

        let selected_product = state.product.find(e => e.color == color)

        // if product piece not have an image it will select first image
        let selected_image = selected_product?.image ?? state.images[0]

        dispatch({
            type : "Product_Data", 
            data : {
                selected_product , 
            }
        })

        store.dispatch(Product_ImageSelectAction(selected_image))
    }
}


/**
 * handle size select
 */
export const Product_SizeSelectAction = (size) => {
    return async dispatch => {
        const products = store.getState().ProductReducer.product
        const old_selected_product = store.getState().ProductReducer.selected_product

        let selected_product = products.find(e => e.color == old_selected_product.color && e.size == size)

        dispatch({
            type : "Product_Data", 
            data : {
                selected_product
            }
        })
    }
}


/**
 * selecting image
 */
export const Product_ImageSelectAction = (selected_image) => {
    return async dispatch => {
        const images = store.getState().ProductReducer?.images

        const container = document.getElementById('scrollContainer');
        const element = document.getElementById(selected_image);
    
        if (element && container) {
            container.scrollTo({
                left: element.offsetLeft - container.offsetLeft - 150,
                behavior: 'smooth' // Smooth scroll effect
            });
        }

        dispatch({
            type : "Product_Data" , 
            data : {
                selected_image : selected_image ?? images[0]
            }
        })
    }
}