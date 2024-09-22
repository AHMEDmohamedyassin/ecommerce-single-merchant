import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { AddressesValidation } from 'validations/AddressValidation'

const LocationFormComp = ({cancelButton , fromData , defaultValues , title}) => {
    const state = useSelector(state => state.AddressReducer)

    const {
        register , 
        handleSubmit , 
        formState:{errors}
    } = useForm({
        mode:"onBlur" , 
        resolver:zodResolver(AddressesValidation) , 
        defaultValues
    })


    // submit form
    const submitForm = data => {
        let address = data.address
        let the_default = data.default
        delete data.address
        delete data.default
        let json = data
        if(fromData) fromData({address , json , default : the_default})
    }
  return (
    <form onSubmit={handleSubmit(submitForm)} className='flex flex-col gap-4 custom-border shadow-lg p-8 my-6'>

        <p className='font-bold text-sm text-center'>{title ?? "أضف عنوانا جديدا"}</p>

        <div className='w-full custom-inputcontainer'>
            <label>غنوان</label>
            <input {...register('address')}/>
            {errors.address && <p>{errors.address.message}</p>}
        </div>

        <div className='w-full custom-inputcontainer'>
            <label>اسم الشخص</label>
            <input {...register('name')}/>
            {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div className='w-full custom-inputcontainer'>
            <label>شركة</label>
            <input {...register('company')}/>
            {errors.company && <p>{errors.company.message}</p>}
        </div>

        <div className='w-full custom-inputcontainer'>
            <label>مدينة</label>
            <input {...register('city')}/>
            {errors.city && <p>{errors.city.message}</p>}
        </div>

        <div className='w-full custom-inputcontainer'>
            <label>محافظة</label>
            <input {...register('governorate')}/>
            {errors.governorate && <p>{errors.governorate.message}</p>}
        </div>

        <div className='w-full custom-inputcontainer'>
            <label>دولة</label>
            <input {...register('country')}/>
            {errors.country && <p>{errors.country.message}</p>}
        </div>

        <div className='w-full custom-inputcontainer'>
            <label>كود بريدي</label>
            <input {...register('postal_code')}/>
            {errors.postal_code && <p>{errors.postal_code.message}</p>}
        </div>

        <div className='w-full custom-inputcontainer'>
            <label>رقم هاتف</label>
            <input {...register('phone')}/>
            {errors.phone && <p>{errors.phone.message}</p>}
        </div>

        <div className='w-full flex items-center gap-2'>
            <input type='checkbox'  {...register('default')}/>
            <p className='text-xs'>تعيين كعنوان افتراضي</p>
        </div>

        <div className='flex gap-6 mt-2'>
            <button disabled={["lc" , "le"].includes(state.status)} className='text-xs w-20 h-10 custom-border bg-black text-white hover:bg-black/70'>
                {
                    ["lc" , "le"].includes(state.status) ? "جاري التحميل" : "تأكيد"
                }
            </button>
            <button onClick={cancelButton} type='button' className='text-xs w-20 h-10 custom-border hover:border-black hover:border-[1px]'>إلغاء</button>
        </div>
        
    </form>
  )
}

export default LocationFormComp