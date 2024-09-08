import React from 'react'
import { Link } from 'react-router-dom'

const ResetPasswordPage = () => {
  return (
    <div className='custom-container flex items-center justify-center'>

        <from className="w-fit max-sm:w-full">

            {/* page title */}
            <div className='flex items-center gap-2'>
                <p className='aspect-square w-2 rounded-full bg-black'></p>
                <p className='text-sm font-bold'>تغيير كلمة المرور</p>
            </div>


            {/* inputs  */}
            <div className='flex flex-col gap-6 my-4'>

                <div className='custom-inputcontainer'>
                    <label>كلمة المرور</label>
                    <input/>
                </div>

                <div className='custom-inputcontainer'>
                    <label>تأكيد كلمة المرور</label>
                    <input/>
                </div>

            </div>


            <button className='custom-button bg-black text-white w-full my-4 hover:bg-black/70'>تغيير كلمة المرور</button>

            {/* register link */}
            <Link className='text-xs underline text-gray-500' to={'/auth/login'}>إلغاء</Link>
        </from>
    </div>
  )
}

export default ResetPasswordPage