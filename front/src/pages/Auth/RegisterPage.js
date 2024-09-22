import { zodResolver } from "@hookform/resolvers/zod"
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom'
import { RegisterValidation } from '../../validations/RegisterValidation';
import { Auth_RegisterAction } from "../../redux/action/AuthAction";

const RegisterPage = () => {
    const state = useSelector(state => state.AuthReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // hook form
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        mode : "onBlur" ,
        resolver: zodResolver(RegisterValidation)
      });

      // submitting form
      const submitForm = (data) => {
        dispatch(Auth_RegisterAction(data))
      }

      // navigate to login page after register the account
      useEffect(() => {
        if(state.status == 'sr'){
            dispatch({
                type:"Auth_Status",
                data: "n" 
            })
            navigate('/auth/login')
        }
      } , [state.status])
  return (
    <div className='custom-container  flex justify-center'>

        <form className="custom-auth-form" onSubmit={handleSubmit(submitForm)}>

            {/* page title */}
            <div className='flex items-center gap-2'>
                <p className='aspect-square w-2 rounded-full bg-black'></p>
                <p className='text-sm font-bold'>إنشاء حساب</p>
            </div>

            {/* inputs  */}
            <div className='flex flex-col gap-6 my-4'>

                <div className='custom-inputcontainer'>
                    <label>الاسم الأول</label>
                    <input {...register('name')} />
                    {errors.name && <p>{errors.name.message}</p>}
                </div>

                <div className='custom-inputcontainer'>
                    <label>رقم الهاتف</label>
                    <input {...register('phone')}/>
                    {errors.phone && <p>{errors.phone.message}</p>}
                </div>

                <div className='custom-inputcontainer'>
                    <label>البريد الإليكتروني</label>
                    <input {...register('email')}/>
                    {errors.email && <p>{errors.email.message}</p>}
                </div>

                <div className='custom-inputcontainer'>
                    <label>كلمة المرور</label>
                    <input {...register('password')} />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>

                <div className='custom-inputcontainer'>
                    <label>كلمة المرور</label>
                    <input {...register('password_confirmation')} />
                    {errors.password_confirmation && <p>{errors.password_confirmation.message}</p>}
                </div>

            </div>


            <button disabled={state.status == "lr"} className='custom-button bg-black text-white w-full my-4 hover:bg-black/70'>{
                state.status == "lr" ? "جاري التحميل"  : "تسجيل حساب"
            }</button>

            {/* register link */}
            <Link className='text-xs underline text-gray-500' to={'/auth/login'}>هل لديك حساب ؟ تسجيل الدخول</Link>
        </form>

    </div>
  )
}

export default RegisterPage