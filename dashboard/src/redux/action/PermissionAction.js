import { fetching } from "Fetch/Fetch"
import { PermissionListURL, RoleCreateURL, RoleDeleteURL, RoleListURL, RoleUpdateURL } from "Fetch/Url"
import { store } from "../store"


/**
 * listing all permissions available
 */
export const Permission_ListAction = () => {
    return async dispatch => {

        // check if permissions fetched before to prevent reFetching
        const permissions = store.getState().PermissionReducer?.permissions
        if(permissions.length) return

        // fetching permissions if not fetched before
        
        dispatch({type : "Permission_Status" , data : "lp"})

        const req = await fetching(PermissionListURL , {} , "GET")

        if(!req.success)
            return dispatch({type : "Permission_Status" , data : "n"})

        dispatch({
            type : "Permission_Data" , 
            data : {
                permissions : req.res
            }
        })
    }
}

/**
 * listing roles
 */
export const Role_ListAction = () => {
    return async dispatch => {

        // check if roles fetched before to prevent reFetching
        const roles = store.getState().PermissionReducer?.roles
        if(roles.length) return

        // fetching roles if not fetched before
        
        dispatch({type : "Permission_Status" , data : "lr"})

        const req = await fetching(RoleListURL , {} , "GET")

        if(!req.success)
            return dispatch({type : "Permission_Status" , data : "n"})

        dispatch({
            type : "Permission_Data" , 
            data : {
                roles : req.res
            }
        })
    }
}


/**
 * update role
 */
export const Role_UpdateAction = (data) => {
    return async dispatch => {
        let roles = store.getState().PermissionReducer?.roles ?? []
        
        dispatch({type : "Permission_Status" , data : "lur"})

        const req = await fetching(RoleUpdateURL , data)

        if(!req.success)
            return dispatch({type : "Permission_Status" , data : "n"})


        // update the role in stored roles
        roles = roles.map(e => e.id == data.id ? req.res : e)

        dispatch({
            type : "Permission_Data" , 
            data : {
                roles
            }
        })
    }
}


/**
 * delete role
 */
export const Role_DeleteAction = (id) => {
    return async dispatch => {
        let roles = store.getState().PermissionReducer?.roles ?? []

        dispatch({type : "Permission_Status" , data : "ldr"})

        const req = await fetching(RoleDeleteURL , {id})

        if(!req.success)
            return dispatch({type : "Permission_Status" , data : "n"})


        roles = roles.filter(e => e.id != id)

        // reset roles and refetching it
        dispatch({
            type : "Permission_Data" , 
            data : {
                roles
            }
        })
    }
}


/**
 * create role
 */
export const Role_CreateAction = (data) => {
    return async dispatch => {
        let roles = store.getState().PermissionReducer?.roles ?? []
        
        dispatch({type : "Permission_Status" , data : "lcr"})

        const req = await fetching(RoleCreateURL , data)

        if(!req.success)
            return dispatch({type : "Permission_Status" , data : "n"})

        dispatch({
            type : "Permission_Data" , 
            data : {
                roles : [req.res , ...roles]
            }
        })
    }
}
