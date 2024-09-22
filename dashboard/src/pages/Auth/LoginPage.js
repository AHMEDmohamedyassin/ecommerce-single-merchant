import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  return (
    <div className=' flex justify-center items-center'>
        <from className="min-w-2/4">

            {/* page title */}
            <div className='flex items-center gap-2'>
                <p className='aspect-square w-2 rounded-full bg-black'></p>
                <p className='text-sm font-bold'>تسجيل الدخول</p>
            </div>

            {/* inputs  */}
            <div className='flex flex-col gap-6 my-4'>

                <div className='custom-inputcontainer2'>
                    <label>البريد الإليكتروني</label>
                    <input/>
                </div>

                <div className='custom-inputcontainer2'>
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