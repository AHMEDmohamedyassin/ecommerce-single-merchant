import { store } from '../store'
import {fetching} from '../../Fetch/Fetch'
import { ForgetPasswordURL, LoginURL, LogoutURL, RegisterURL, ResetPasswordURL , UpdateURL, UpdateUserDataURL, UserDataURL, VerifyEmailURL } from '../../Fetch/Url';
import { notify } from '../../components/public/NotificationComp';
import { Setting_Msg } from './SettingAction';

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
 * register new user
 */
export const Auth_RegisterAction = (data) => {
    return async (dispatch) => {
        
        dispatch({type:"Auth_Status" , data:"lr"})

        const req = await fetching(RegisterURL , data)

        if(!req.success)
            return dispatch({type:"Auth_Status" , data:"n"})

        localStorage.setItem('token' , req.res?.token)
        
        // account created message
        Setting_Msg(4000)

        return dispatch({
            type:"Auth_Login",
            data: {
                ...req.res,
                status : "sr"
            }
        })
    }
}


/**
 * Forget password
 */
export const Auth_ForgetpasswordAction = (data) => {
    return async (dispatch) => {
        dispatch({type:'Auth_Status' , data:'lpr'})

        const req = await fetching(ForgetPasswordURL , data)

        
        if(req.success){
            notify('تم إرسال رابط عبر البريد الإليكتروني لإعادة تعيين كلمة المرور')
            dispatch({type:'Auth_Status' , data:'spr'})
        }else
            dispatch({type:'Auth_Status' , data:'n'})
    }
}


/**
 * reset password
 */
export const Auth_ResetpasswordAction = (data) => {
    return async (dispatch) => {
        dispatch({type:'Auth_Status' , data:'lpr'})

        const req = await fetching(ResetPasswordURL , data)

        
        if(req.success){
            Setting_Msg(5000)
            dispatch({type:'Auth_Status' , data:'spr'})
        }else
            dispatch({type:'Auth_Status' , data:'n'})
    }
}


/**
 * user update functions
 */


/**
 * update user data
 */
export const Auth_DataUpdate = (data) => {
    return async dispatch => {
        const token = store.getState().AuthReducer?.token
        dispatch({type:'Auth_Status' , data:'lud'})

        // fetching request
        const req = await fetching(UpdateURL , {...data , token})

        if(!req.success) return  dispatch({type:'Auth_Status' , data:'n'})

        Setting_Msg(6000)

        dispatch({
            type:"Auth_Login" ,
            data : req.res
        })
    }
}
