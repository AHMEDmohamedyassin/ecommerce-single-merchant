import {APIv, APP_URL} from './Url'
import { store } from '../redux/store';
import { notify } from 'components/public/NotificationComp';
import { Setting_Msg } from '../redux/action/SettingAction';

export const fetching = async (url , data = {} , method = "POST" , error = true , headers = null , body = null) => {
    

    // assigning default body and headers
    if(!body)
        body = JSON.stringify(data)
    if(!headers)
        headers = {
            'Content-Type' : 'application/json',
        }


    // appending token to header if exists
    const token = store.getState().AuthReducer?.token
    if(token)
        headers = {...headers , token}

    // handle options according to method 
    let options = {
        method,
        headers,
        body
    }

    if(method == "GET")
        options = {
            method,
            headers,
        }


    try{
        const req = await fetch(`${APP_URL}${APIv}${url}` , options);

        // logging request
        if(window.globalConfig.APP_DEBUG)
        console.log('req' , req)

        if(!req.ok){
            if(error) Setting_Msg(1000)
            return {success : false , res : {}}
        }
    
        const res = await req.json();

        // logging response
        if(window.globalConfig.APP_DEBUG){
            console.log('res' , url , res)
            console.log('body' , body)
            console.log('headers' , headers)
        }
    
        if(res?.success){
            return {success:true , res:res.response}
        }else if (res.msg_code == 3){     // bad token
            store.dispatch({type:'Auth_Logout'})
            return {success : false , res:{}}
        }



        if(res.success)
            notify(res.msg)
        else if (!res.success && error) 
            notify(res.msg)
    
        return {success : false , res};
    }catch($e){
        return {success : false , res:{}};
    }
}