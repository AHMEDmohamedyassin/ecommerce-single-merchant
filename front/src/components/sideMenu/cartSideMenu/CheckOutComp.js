import React from 'react'

const CheckOutComp = () => {
  return (
    <div style={{boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)'}} className=' px-4 py-6 flex flex-col gap-y-4'>
        <div className='flex-1 flex justify-between items-center'>
            <p>المجموع الفرعي : </p>
            <p>300 جم</p>
        </div>
        <p className='text-gray-500 text-sm'>الضرائب و الشحن المحسوبة عند الدفع</p>

        <button className='bg-secondarycolor text-white rounded-full text-sm py-2'>عرض عربة التسوق</button>
        <button className='bg-black text-white rounded-full text-sm py-2'>عرض عربة التسوق</button>
    </div>
  )
}

export default CheckOutComp