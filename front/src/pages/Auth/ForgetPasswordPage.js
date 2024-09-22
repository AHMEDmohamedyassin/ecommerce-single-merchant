import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Auth_ForgetpasswordAction } from '../../redux/action/AuthAction'
import { ForgetPassValidation } from '../../validations/ForgetPassValidation'

const ForgetPasswordPage = () => {
    const state = useSelector(state => state.AuthReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {register , handleSubmit , formState:{errors}} = useForm({resolver:zodResolver(ForgetPassValidation) , mode:"onBlur"})
  
    const formSubmit = (data) => {
        dispatch(Auth_ForgetpasswordAction(data))
    }

    // navigate to login page after sending emial
    useEffect(() => {
        if(state.status == "spr"){
            dispatch({type:'Auth_Status' , data:'n'})
            localStorage.setItem("password_reset_time",Date.now() + 60000)
            navigate("/auth/login?state=emailsent")
        }

        // prevent user form access page if he sent email in 60 seconds
        if(localStorage.getItem('password_reset_time') && localStorage.getItem('password_reset_time') > Date.now()){
            navigate("/auth/login?state=emailsent")
        }
    } , [state.status])
    return (
    <div className='custom-container flex justify-center items-center'>

        <form className="custom-auth-form" onSubmit={handleSubmit(formSubmit)}>

            {/* page title */}
            <div className='flex items-center gap-2'>
                <p className='aspect-square w-2 rounded-full bg-black'></p>
                <p className='text-sm font-bold'>اعد ضبط كلمة المرور</p>
            </div>

            {/* illustration */}
            <p className='text-xs text-gray-500 my-6 max-w-[410px]'>فقدت كلمة المرور الخاصة بك؟ الرجاء إدخال عنوان البريد الإلكتروني الخاص بك. سوف تتلقى رابطًا لإنشاء كلمة مرور جديدة عبر البريد الإلكتروني.</p>

            {/* inputs  */}
            <div className='flex flex-col gap-6 my-4'>

                <div className='custom-inputcontainer'>
                    <label>قم بإدخال البريد الإليكتروني أو رقم الهاتف</label>
                    <input {...register("phoneORemail")}/>
                    {errors.phoneORemail && <p>{errors.phoneORemail.message}</p>}
                </div>

            </div>


            <button disabled={state.status == "lpr"} className='custom-button bg-black text-white w-full my-4 hover:bg-black/70'>{
                state.status == "lpr" ? "حاري التحميل" : "إعادة تعيين كلمة المرور"
            }</button>

            {/* register link */}
            <Link className='text-xs underline text-gray-500' to={'/auth/login'}>إلغاء</Link>
        </form>

    </div>
  )
}

export default ForgetPasswordPage