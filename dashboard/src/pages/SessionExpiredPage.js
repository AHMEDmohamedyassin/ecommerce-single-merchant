import { zodResolver } from '@hookform/resolvers/zod'
import { APP_URL } from 'Fetch/Url'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Auth_LoginAction } from '../redux/action/AuthAction'
import { loginValidation } from 'validation/AuthValidation'

const SessionExpiredPage = () => {
  const state = useSelector(state => state.AuthReducer)
  const dispatch = useDispatch()
  
  // zod validation


  // hook form
  const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      mode : "onBlur" ,
      resolver: zodResolver(loginValidation)
    });


  // submit handler 
  const SubmitForm = (data) => {
    dispatch(Auth_LoginAction(data))
  }

  return (
    <div className='custom-dashcontainer flex flex-col justify-center items-center'>
        <p className='text-red-500'>انتهت صلاحية الجلسة الرجاء إعادة تسجيل الدخول</p>


        <form className="custom-auth-form" onSubmit={handleSubmit(SubmitForm)}>

            {/* inputs  */}
            <div className='flex flex-col gap-6 my-4'>

                <div className='custom-inputcontainer'>
                    <label>البريد الإليكتروني</label>
                    <input {...register('phoneORemail')} />
                    {errors.phoneORemail && <p>{errors.phoneORemail.message}</p>}
                </div>

                <div className='custom-inputcontainer'>
                    <label>كلمة المرور</label>
                    <input {...register('password')}/>
                    {errors.password && <p>{errors.password.message}</p>}
                </div>

            </div>

            {/* forget password link */}
            <a className='text-xs underline text-gray-500' href={`${APP_URL}/auth/password/forget`}>هل نسيت كلمة المرور ؟</a>


            <button disabled={state.status == "ll"} className='custom-button bg-black text-white w-full my-4 hover:bg-black/70 disabled:bg-black/70'>
            {
                state.status == "ll" ? "جاري التحميل" : "تسجيل"
            }
            </button>

            {/* register link */}
            <a className='text-xs underline text-gray-500' href={`${APP_URL}/auth/register`}>عميل جديد ؟ إنشئ حساب</a>
        </form>
    </div>  
  )
}

export default SessionExpiredPage