import { store } from '../store'
import {fetching} from '../../Fetch/Fetch'
import { ForgetPasswordURL, LoginURL, LogoutURL, RegisterURL, ResetPasswordURL , UpdateURL, UpdateUserDataURL, UserDataURL, UserVisitURL, VerifyEmailURL } from '../../Fetch/Url';
import { notify } from '../../components/public/NotificationComp';
import { Setting_Msg } from './SettingAction';
import { Favorite_ListAction } from './FavoriteAction';
import { Cart_Initiate } from './CartAction';

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

        // refresh favorites of user
        store.dispatch(Favorite_ListAction(1,1))
        store.dispatch(Cart_Initiate())
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

        // refresh favorites of user
        store.dispatch(Favorite_ListAction(1,1))

        // reset cart
        dispatch({type : "Cart_Reset"})
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
            dispatch({
                type:'Auth_Login',
                data : req.res
            });

            // cart initate
            store.dispatch(Cart_Initiate())

            return {}
        }

        dispatch({
            type : "Auth_Status" ,
            data : 'n'
        })

        // reset cart
        dispatch({type : "Cart_Reset"})
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




/**
 * record user visit
 */
export const Auth_VisitAction = () => {
    return async dispatch => {
        const req = await fetching(UserVisitURL , {} , "POST" , false)
    }
}
