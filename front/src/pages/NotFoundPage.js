import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className='custom-container flex items-center  flex-col gap-10'>
        <div className='lg:text-[300px] text-[120px] font-bold text-gray-500 opacity-20 flex items-center justify-center gap-4'>
            <div className='rotate-12 '>4</div>
            <div className='rotate-6 lg:translate-y-10 translate-y-5'>0</div>
            <div className='-rotate-6'>4</div>
        </div>

        <div className='w-full text-center text-sm font-bold '>الصفحة غير موجودة</div>

        <Link to={'/'} className='custom-button hover:bg-secondarycolor hover:text-white'>اذهب للصفحة الرئيسية</Link>
    </div>
  )
}

export default NotFoundPage