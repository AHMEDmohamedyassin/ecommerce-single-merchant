import { fetching } from "Fetch/Fetch"
import { PermissionListURL, PermissionUserAttachURL, RoleCreateURL, RoleDeleteURL, RoleListURL, RoleUpdateURL, RoleUserAttachURL } from "Fetch/Url"
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



/**
 * appending permissions to user
 */
export const Permission_UserAppendAction = (data) => {      // {permission_id}
    return async dispatch => {
        let user_id = store.getState().UserReducer?.id
        let user_permissions = store.getState().UserReducer?.permission ?? []
        
        dispatch({type : "Permission_Status" , data : "lap"})      // loading append permission

        const req = await fetching(PermissionUserAttachURL , {user_id , ...data})

        dispatch({type : "Permission_Status" , data : "n"})
        
        if(!req.success)
            return 

        // updating user permissions in store
        user_permissions = [...user_permissions , ...data?.permission_id.map(e => ({e})) ?? [] ]

        dispatch({
            type : "User_Data" , 
            data : {
                permission : user_permissions
            }
        })
    }
}


/**
 * appending roles to user
 */
export const Role_UserAppendAction = (data) => {      // {user_roles}
    return async dispatch => {
        let user_id = store.getState().UserReducer?.id
        let user_roles = store.getState().UserReducer?.permission ?? []
        
        dispatch({type : "Permission_Status" , data : "lar"})      // loading append role

        const req = await fetching(RoleUserAttachURL , {user_id , ...data})

        dispatch({type : "Permission_Status" , data : "n"})

        if(!req.success)
            return 

        // updating user permissions in store
        user_roles = [...user_roles , ...data?.role_id.map(e => ({e})) ?? [] ]

        dispatch({
            type : "User_Data" , 
            data : {
                role : user_roles
            }
        })
    }
}