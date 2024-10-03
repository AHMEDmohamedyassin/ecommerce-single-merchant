import { ProductCreateURL, ProductDeleteImageURL, ProductDeleteSubURL, ProductDeleteURL, ProductReadURL, ProductUpdateSubURL, ProductUpdateURL, ProductUploadImageURL } from "Fetch/Url"
import { fetching } from "../../Fetch/Fetch"
import { Setting_Confirm, Setting_Msg } from "./SettingAction"
import { store } from "../../redux/store"


/**
 * creating product
 */
export const Product_CreateAction = (data) => {
    return async dispatch => {
        dispatch({type : "Product_Status" , data : "lc"}) // loading create

        const req = await fetching(ProductCreateURL , data)

        if(!req.success)
            return  dispatch({type : "Product_Status" , data : "n"})

        // notificaiton
        // Setting_Msg(18000)

        dispatch({
            type : "Product_Data" ,
            data : {
                ...req.res  ,
                status : 'sc'
            }
        })
    }
}


/**
 * upload images of product
 */
export const Product_ImagesUploadAction = (form_element) => {
    return async dispatch => {
        const id = store.getState().ProductReducer?.id

        dispatch({type : "Product_Status" , data : "lupi"}) // loading upload product image

        // creating form data
        const form = new FormData(form_element.target)
        let data = {
            // 1 : {
            //     image : file,
            //     color : "text"
            // }
        };
        let not_implemented_idex = [] // array includes indeces of which have empty images

        // looping form entires
        for(const item of form.entries()){
            let key = item[0]
            let value = item[1]
            let type = key.split("_")[0] // image or color
            let index = key.split("_")[1] // 1 , 2 , 3 , ....

            // remove the objects which has no image
            if((type == "image" && !value.name?.length) || not_implemented_idex.includes(index)){
                delete data[index]
                not_implemented_idex.push(index)
                continue
            }

            // append color and image to the object data
            data[index] = {...data[index] , [type] : value}
        }

        // uploading the images to the server
        let uploaded_images = 0;
        for(const obj of Object.values(data)){
            const form_data = new FormData()
            form_data.append('color' , obj.color)
            form_data.append('id' , id)
            form_data.append('image' , obj.image)

            const req = await fetching(ProductUploadImageURL , {} , "POST" , true, {} , form_data)
            if(req.success)
                uploaded_images += 1
        }

        // resetting the reducer
        dispatch({
            type : "Product_Reset" , 
            data : {
                status : "sui"      // success upload image
            }
        })
    }
}



/**
 * read product data
 */
export const Product_ReadAction = (id) => {
    return async dispatch => {
        dispatch({type : "Product_Status" , data : "lr"}) // loading read

        const req = await fetching(`${ProductReadURL}?id=${id}` , {} , "GET" , false)

        if(!req.success)
            return  dispatch({type : "Product_Status" , data : "n"})


        dispatch({
            type : "Product_Data" ,
            data : {
                ...req.res
            }
        })
    }
}


/**
 * product Delete Image
*/
export const Product_DeleteImageAction = (image) => {
    return async dispatch => {
        const id = store.getState().ProductReducer?.id
        let json = store.getState().ProductReducer?.json ?? {}
        let images = store.getState().ProductReducer?.json?.images ?? {}

        dispatch({type : "Product_Status" , data : "ldi"}) // loading delete image

        const req = await fetching(ProductDeleteImageURL , {image , id})

        if(!req.success)
            return  dispatch({type : "Product_Status" , data : "n"})


        // notification 
        Setting_Msg(19000)

        // unset the deleted image
        delete images[image]

        dispatch({
            type : "Product_Data" ,
            data : {
                json : {
                    ...json , 
                    images
                }
            }
        })
    }
}



/**
 * deleting the product
 */
export const product_DeleteAction = () => {
    return async dispatch => {
        const id = store.getState().ProductReducer?.id

        dispatch({type : "Product_Status" , data : "ld"}) // loading delete product

        const req = await fetching(ProductDeleteURL , {id})

        if(!req.success)
            return  dispatch({type : "Product_Status" , data : "n"})


        // notification 
        Setting_Msg(20000)

        dispatch({
            type : "Product_Reset" ,
            data : {
                status : 'sd' // success delete
            }
        })
    }
}


/**
 * udpate product 
 */
export const product_UpdateAction = (data) => {
    return async dispatch => {
        const id = store.getState().ProductReducer?.id
        const images = store.getState().ProductReducer?.json?.images

        dispatch({type : "Product_Status" , data : "lu"}) // loading update product

        // appending old images with the data request 
        let storing_data = data
        if(data?.json && images)
            storing_data = {...storing_data , json : {...storing_data.json , images : {...images}}}


        const req = await fetching(ProductUpdateURL , {...storing_data , id})

        if(!req.success)
            return  dispatch({type : "Product_Status" , data : "n"})


        // notification 
        // Setting_Msg(20000)

        dispatch({
            type : "Product_Data" ,
            data : {
                status : 'su' , // success update
                ...req.res 
            }
        })
    }
}



/**
 * update sub product 
 */
export const product_SubProductUpdateAction = (data) => {
    return async dispatch => {
        // confirmation 
        if(!Setting_Confirm(2000)) return {}

        let product = store.getState().ProductReducer?.product ?? []       /// getting sub products

        dispatch({type : "Product_Status" , data : "lus"}) // loading update sub product

        const req = await fetching(ProductUpdateSubURL , data)

        if(!req.success)
            return  dispatch({type : "Product_Status" , data : "n"})


        // notification 
        Setting_Msg(21000)

        // update product in products array
        product = product.map(e => e.id == data.id ? data : e)

        dispatch({
            type : "Product_Data" ,
            data : {
                product
            }
        })
    }
}



/**
 * delete sub product 
 */
export const product_SubProductDeleteAction = (id) => {
    return async dispatch => {
        // confirmation 
        if(!Setting_Confirm(1000)) return {}

        let product = store.getState().ProductReducer?.product ?? []       /// getting sub products

        dispatch({type : "Product_Status" , data : "lds"}) // loading delete sub product

        const req = await fetching(ProductDeleteSubURL , {id})

        if(!req.success)
            return  dispatch({type : "Product_Status" , data : "n"})


        // notification 
        Setting_Msg(20000)

        // update product in products array
        product = product.filter(e => e.id != id)

        dispatch({
            type : "Product_Data" ,
            data : {
                product
            }
        })
    }
}