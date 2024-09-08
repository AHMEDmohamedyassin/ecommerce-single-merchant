import React from 'react'
import LocationFormComp from './LocationFormComp'

const LocationComp = () => {
  return (
    <div className='text-xs'>
        <p>أحمد محمد</p>
        <p>الشركة</p>
        <p>مصر</p>
        <p>القاهرة</p>
        <p>111111</p>
        <div className='flex gap-6 mt-2'>
            <button className='text-xs w-20 h-10 custom-border bg-black text-white hover:bg-black/70'>تعديل</button>
            <button className='text-xs w-20 h-10 custom-border hover:border-black hover:border-[1px]'>حذف</button>
        </div>

        <LocationFormComp/>
    </div>
  )
}

export default LocationComp