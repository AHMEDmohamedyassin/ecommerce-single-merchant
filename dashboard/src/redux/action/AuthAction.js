import { store } from '../store';
import {fetching} from '../../Fetch/Fetch'
import { LoginURL, LogoutURL, UserDataURL} from '../../Fetch/Url';
import { Setting_Msg } from './SettingAction';


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





/**
 * login / register action
 */
export const Auth_LoginAction = (data) => {
    return async (dispatch) => {

        dispatch({
            type:"Auth_Status",
            data: "ll"
        })

        const req = await fetching(LoginURL , data)

        if(!req.success)
            return dispatch({type:'Auth_Status' , data:"n"})

        localStorage.setItem('token' , req.res?.token)

        Setting_Msg(2000)

        dispatch({
            type : "Auth_Login" ,
            data :{
                ... req.res,
            }
        });
    }
}


/**
 * logout action
 */
export const Auth_LogoutAction = () => {
    return async (dispatch) => {
        
        const token = store.getState().AuthReducer?.token;

        const req = await fetching(LogoutURL , {token} , "POST" , false);

        if(req.success) Setting_Msg(2000)

        localStorage.removeItem('token')

        dispatch({
            type : "Auth_Logout" 
        });
    }
}