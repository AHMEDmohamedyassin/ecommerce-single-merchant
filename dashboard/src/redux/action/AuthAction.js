import {fetching} from '../../Fetch/Fetch'
import { UserDataURL} from '../../Fetch/Url';


/**
 * Get user data by token
 */
export const Auth_GetuserdataAction = () => {
    return async (dispatch) => {
        const token = localStorage.getItem('token')

        if(!token || token == undefined) return 

        dispatch({
            type : "Auth_Status" ,
            data : 'lg'
        })

        const req = await fetching(UserDataURL , {token} , "POST" , false);

        if(req.success){
            return dispatch({
                type:'Auth_Login',
                data : req.res
            });
        }

        dispatch({
            type : "Auth_Status" ,
            data : 'n'
        })
    }
}