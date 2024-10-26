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


        // combine same products sizes in one product 
        let products = req.res.product.reduce((acc , curr) => {
            // check if color is repeated and append image if not appended previously
            if(acc.find(e => e.color == curr.color))
                acc = acc.map(e => e.color == curr.color ? {...e , sizes : [...e.sizes , curr.size] , image : !e.image ? curr.image : null } : e)
            else acc = [...acc , {...curr , sizes : [curr.size] }]

            return acc
        } , [])

        // setting initial product
        let initial_product = products.find(e => e.image != null)


        dispatch({
            type : "Product_Data" , 
            data : {
                ...req.res , 
                selected_product : initial_product ?? ( products[0] ?? {} ) , 
                products
            }
        })
    }
}



/**
 * handle size select
 * change all product data except the sizes list and the image
 */
export const Product_SizeSelectAction = (size) => {
    return async dispatch => {
        const products = store.getState().ProductReducer.product
        const {image , sizes , color} = store.getState().ProductReducer.selected_product

        let selected_product = products.find(e => e.size == size && e.color == color)

        dispatch({
            type : "Product_Data", 
            data : {
                selected_product : {...selected_product , image , sizes }
            }
        })
    }
}


/**
 * selecting image
 * select the related product to the selected image
 */
export const Product_ImageSelectAction = (selected_image) => {
    return async dispatch => {
        const products = store.getState().ProductReducer.products
        const selected_product = store.getState().ProductReducer.selected_product

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
                selected_product : selected_product.image == selected_image ? selected_product : (products.find(e => e.image == selected_image) ?? {...selected_product , image : selected_image})
            }
        })
    }
}