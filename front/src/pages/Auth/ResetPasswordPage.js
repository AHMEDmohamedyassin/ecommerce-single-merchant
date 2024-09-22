import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ResetValidation } from '../../validations/ResetValidation';
import { useDispatch, useSelector } from 'react-redux';
import { Auth_ResetpasswordAction } from '../../redux/action/AuthAction';

const ResetPasswordPage = () => {
    const state = useSelector(state => state.AuthReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const {register , handleSubmit , formState:{errors}} = useForm({mode:"onBlur" , resolver:zodResolver(ResetValidation)})

    // submitting form
    const formSubmit = (data) => {
        let phoneORemail = queryParams.get("phoneORemail")
        let token = queryParams.get("token")
        dispatch(Auth_ResetpasswordAction({...data , phoneORemail , token}))
    }

      // navigate to login page after reset password of the account
      useEffect(() => {
        if(state.status == 'spr'){
            dispatch({
                type:"Auth_Status",
                data: "n" 
            })
            navigate('/auth/login')
        }
      } , [state.status])
  return (
    <div className='custom-container flex items-center justify-center'>

        <form className="custom-auth-form" onSubmit={handleSubmit(formSubmit)}>

            {/* page title */}
            <div className='flex items-center gap-2'>
                <p className='aspect-square w-2 rounded-full bg-black'></p>
                <p className='text-sm font-bold'>تغيير كلمة المرور</p>
            </div>


            {/* inputs  */}
            <div className='flex flex-col gap-6 my-4'>

                <div className='custom-inputcontainer'>
                    <label>كلمة المرور</label>
                    <input {...register('password')}/>
                    {errors.password && <p>{errors.password.message}</p>}
                </div>

                <div className='custom-inputcontainer'>
                    <label>تأكيد كلمة المرور</label>
                    <input {...register('password_confirmation')}/>
                    {errors.password_confirmation && <p>{errors.password_confirmation.message}</p>}
                </div>

            </div>


            <button disabled={state.status == "lpr"} className='custom-button bg-black text-white w-full my-4 hover:bg-black/70'>{
                state.status == "lpr" ? "جاري التحميل" : "تغيير كلمة المرور"
            }</button>

            {/* register link */}
            <Link className='text-xs underline text-gray-500' to={'/auth/login'}>إلغاء</Link>
        </form>
    </div>
  )
}

export default ResetPasswordPage