import React from 'react'
import { Link } from 'react-router-dom'

const ForgetPasswordPage = () => {
  return (
    <div className='custom-container flex justify-center items-center'>

        <from className="w-fit max-sm:full">

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
                    <label>البريد الإليكتروني</label>
                    <input/>
                </div>

            </div>


            <button className='custom-button bg-black text-white w-full my-4 hover:bg-black/70'>إعادة تعيين كلمة المرور</button>

            {/* register link */}
            <Link className='text-xs underline text-gray-500' to={'/auth/login'}>إلغاء</Link>
        </from>

    </div>
  )
}

export default ForgetPasswordPage