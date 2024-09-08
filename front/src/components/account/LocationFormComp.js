import React from 'react'

const LocationFormComp = () => {
  return (
    <div className='flex flex-col gap-4 custom-border shadow-lg p-8 my-6'>

        <p className='font-bold text-sm text-center'>أضف عنوانا جديدا</p>

        <div className='flex max-lg:flex-col gap-y-4'>
            <div className='w-full custom-inputcontainer lg:border-e-0'>
                <label>الاسم الأول</label>
                <input/>
            </div>
            <div className='w-full custom-inputcontainer'>
                <label>الاسم الأول</label>
                <input/>
            </div>
        </div>

        <div className='w-full custom-inputcontainer'>
            <label>الشركة</label>
            <input/>
        </div>

        <div className='w-full custom-inputcontainer'>
            <label>غنوان 1</label>
            <input/>
        </div>

        <div className='w-full custom-inputcontainer'>
            <label>عنوان 2</label>
            <input/>
        </div>

        <div className='w-full flex items-center gap-2'>
            <input type='checkbox' />
            <p className='text-xs'>تعيين كعنوان افتراضي</p>
        </div>

        <div className='flex gap-6 mt-2'>
            <button className='text-xs w-20 h-10 custom-border bg-black text-white hover:bg-black/70'>أضف عنوان</button>
            <button className='text-xs w-20 h-10 custom-border hover:border-black hover:border-[1px]'>إلغاء</button>
        </div>
        
    </div>
  )
}

export default LocationFormComp