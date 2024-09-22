import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useLocation } from 'react-router-dom'
import { zodResolver } from "@hookform/resolvers/zod"
import { loginValidation } from 'validations/LoginValidation';
import { useDispatch, useSelector } from 'react-redux';
import { Auth_LoginAction } from '../../redux/action/AuthAction';

const LoginPage = () => {
    const state = useSelector(state => state.AuthReducer)
    const dispatch = useDispatch()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    
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
    <div className='custom-container flex justify-center items-center'>

        <form className="custom-auth-form" onSubmit={handleSubmit(SubmitForm)}>

            {/* page title */}
            <div className='flex items-center gap-2'>
                <p className='aspect-square w-2 rounded-full bg-black'></p>
                <p className='text-sm font-bold'>تسجيل الدخول</p>
            </div>

            {/* email sent notification */}
            {
                queryParams.get('state') == "emailsent" ? (
                    <div className='flex flex-col gap-2 my-6 max-w-[410px]'>
                        <div className='flex items-center gap-2'>
                            <p className='aspect-square px-2 py-1 rounded-full text-white text-[10px] bg-secondarycolor text-center'>&#x2714;</p>
                            <p className='text-sm'>لقد أرسلنا إليك بريدًا إلكترونيًا يحتوي على رابط لتحديث كلمة المرور الخاصة بك.
                            </p>
                        </div>
                        {/* illustration */}
                        <p className='text-xs text-gray-500'>تم إرسال بريد إلكتروني لإعادة تعيين كلمة المرور إلى عنوان البريد الإلكتروني المسجل لحسابك ، ولكن قد يستغرق عدة دقائق لتظهر في صندوق الوارد الخاص بك. يرجى الانتظار لمدة 10 دقائق على الأقل قبل محاولة إعادة تعيين أخرى.</p>
                    </div>
                ) : null
            }

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
            <Link className='text-xs underline text-gray-500' to={'/auth/password/forget'}>هل نسيت كلمة المرور ؟</Link>


            <button disabled={state.status == "ll"} className='custom-button bg-black text-white w-full my-4 hover:bg-black/70 disabled:bg-black/70'>
            {
                state.status == "ll" ? "جاري التحميل" : "تسجيل"
            }
            </button>

            {/* register link */}
            <Link className='text-xs underline text-gray-500' to={'/auth/register'}>عميل جديد ؟ إنشئ حساب</Link>
        </form>

    </div>
  )
}

export default LoginPage