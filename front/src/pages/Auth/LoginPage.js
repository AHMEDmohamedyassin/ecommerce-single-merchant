import React from 'react'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  return (
    <div className='custom-container flex justify-center items-center'>

        <from className="w-fit">

            {/* page title */}
            <div className='flex items-center gap-2'>
                <p className='aspect-square w-2 rounded-full bg-black'></p>
                <p className='text-sm font-bold'>تسجيل الدخول</p>
            </div>

            {/* email sent notification */}
            <div className='flex flex-col gap-2 my-6 max-w-[410px]'>
                <div className='flex items-center gap-2'>
                    <p className='aspect-square px-2 py-1 rounded-full text-white text-[10px] bg-secondarycolor text-center'>&#x2714;</p>
                    <p className='text-sm'>لقد أرسلنا إليك بريدًا إلكترونيًا يحتوي على رابط لتحديث كلمة المرور الخاصة بك.
                    </p>
                </div>
                {/* illustration */}
                <p className='text-xs text-gray-500'>تم إرسال بريد إلكتروني لإعادة تعيين كلمة المرور إلى عنوان البريد الإلكتروني المسجل لحسابك ، ولكن قد يستغرق عدة دقائق لتظهر في صندوق الوارد الخاص بك. يرجى الانتظار لمدة 10 دقائق على الأقل قبل محاولة إعادة تعيين أخرى.</p>
            </div>

            {/* inputs  */}
            <div className='flex flex-col gap-6 my-4'>

                <div className='custom-inputcontainer'>
                    <label>البريد الإليكتروني</label>
                    <input/>
                </div>

                <div className='custom-inputcontainer'>
                    <label>كلمة المرور</label>
                    <input/>
                </div>

            </div>

            {/* forget password link */}
            <Link className='text-xs underline text-gray-500' to={'/auth/password/forget'}>هل نسيت كلمة المرور ؟</Link>

            <button className='custom-button bg-black text-white w-full my-4 hover:bg-black/70'>تسجيل</button>

            {/* register link */}
            <Link className='text-xs underline text-gray-500' to={'/auth/register'}>عميل جديد ؟ إنشئ حساب</Link>
        </from>

    </div>
  )
}

export default LoginPage