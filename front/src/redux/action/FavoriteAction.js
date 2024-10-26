import { fetching } from "Fetch/Fetch"
import { FavoriteCheckURL, FavoriteListURL, FavoriteSyncURL, ProductWithIdsURL } from "Fetch/Url"
import { store } from "../../redux/store"

const localstorage_title = "favorites"

/**
 * sync products to user favorites
 */
export const Favorite_SyncAction = () => {
    return async dispatch => {
        const {id , is_favorite} = store.getState().ProductReducer           // product data
        const token = store.getState().AuthReducer.token
        let response = null

        dispatch({type:"Favorite_Status" , data :"ls"})      // loading sync

        if(token){
            const req = await fetching(FavoriteSyncURL , {id})
    
            if(!req.success)
                return dispatch({type:"Favorite_Status" , data :"n"})  // normal status

            response = req.res
        }else { 
             // unauthorized user favorites handle
            let favorites = localStorage.getItem(localstorage_title)
            favorites = favorites ? JSON.parse(favorites) : []
            if(favorites.includes(id))
                favorites = favorites.filter(e => e != id)
            else favorites.push(id)
            localStorage.setItem(localstorage_title , JSON.stringify(favorites))

            response = {total : favorites.length , items : []}
        }


        // update favorite reducer
        dispatch({
            type:"Favorite_Data" , 
            data : response
        })

        // update product reducer
        dispatch({
            type:"Product_Data" , 
            data : {
                is_favorite : !is_favorite
            }
        })
    }
}


/**
 * listing favorites
 */
export const Favorite_ListAction = (page = 1 , perpage = 0) => {
    return async dispatch => {
        const token = store.getState().AuthReducer.token
        const fav = store.getState().FavoriteReducer
        let req = null 

        dispatch({type:"Favorite_Status" , data :"ll"})      // loading sync

        // authorized user 
        if(token)
            req = await fetching(`${FavoriteListURL}?page=${page}&perpage=${perpage}` , {} , "GET")

        else {  // unauthorized user
            // handling favorites localstorage list
            let favorites = localStorage.getItem(localstorage_title)
            favorites = favorites ? JSON.parse(favorites) : []

            if(!favorites.length) return dispatch({type:"Favorite_Status" , data :"n"})  // normal status

            // handling ids and page parameters of request
            let params = ''
            favorites.forEach(id => params = params.concat('&ids[]=' , id));

            // fetching products with id
            req = await fetching(`${ProductWithIdsURL}?page=${page}&perpage=${perpage}${params}` , {} , "GET")
        }


        // check status of request 
        if(!req.success)
            return dispatch({type:"Favorite_Status" , data :"n"})  // normal status

        dispatch({
            type:"Favorite_Data" , 
            data : {
                ...req.res , 
                items : page > 1 ? [...fav.items , ...req.res.items] : req.res.items
            }
        })
    }
}


/**
 * check if product appended to user favorites
 */
export const Favorite_CheckAction = (id) => {
    return async dispatch => {
        const token = store.getState().AuthReducer.token
        let is_favorite = 0

        if(token){
            const req = await fetching(FavoriteCheckURL , {id})
    
            if(!req.success)
                return {}

            is_favorite = req.res 
        }else { // unauthorized user
            // handling favorites localstorage list
            let favorites = localStorage.getItem(localstorage_title)
            favorites = favorites ? JSON.parse(favorites) : []

            // check if favorite storage contains product id
            is_favorite = favorites.includes(parseInt(id))
        }

        dispatch({
            type : "Product_Data" , 
            data : {
                is_favorite
            }
        })

    }
}