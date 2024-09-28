import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { User_AddAdressAction } from '../../redux/action/UserAction'
import { UserAddressesValidation } from 'validation/UserValidation'
import SectionTitleComp from './SectionTitleComp'

const AddressCreateComp = () => {
    const state = useSelector(state => state.UserReducer)
    const  dispatch  = useDispatch()

    const {
        register , 
        handleSubmit , 
        formState:{errors},
        reset
    } = useForm({
        mode:"onBlur" , 
        resolver:zodResolver(UserAddressesValidation) , 
    })


    // submit form
    const submitForm = data => {
        dispatch(User_AddAdressAction(data))
    }

    // setting default values from stored data in state
    useEffect(() => {
        reset({
            json : {
                name : state.name , 
                phone  : state.phone
            }
        })
    } , [state])

  return (
    <div className='custom-dashcontainer'>

        {/* section title with toggle arrow button */}
        <SectionTitleComp title={'أضف عنوانا للمستخدم'} section={'address'}/>

        {
            state.section == 'address' ? (
                <>
                    <form onSubmit={handleSubmit(submitForm)} className='flex flex-col gap-4 '>

                        <div className='w-full custom-inputcontainer'>
                            <label>غنوان</label>
                            <input {...register('address')}/>
                            {errors.address && <p>{errors.address.message}</p>}
                        </div>

                        <div className='w-full custom-inputcontainer'>
                            <label>اسم الشخص</label>
                            <input {...register('json.name')}/>
                            {errors.json?.name && <p>{errors.json?.name.message}</p>}
                        </div>

                        <div className='w-full custom-inputcontainer'>
                            <label>شركة</label>
                            <input {...register('json.company')}/>
                            {errors.json?.company && <p>{errors.json?.company.message}</p>}
                        </div>

                        <div className='w-full custom-inputcontainer'>
                            <label>مدينة</label>
                            <input {...register('json.city')}/>
                            {errors.json?.city && <p>{errors.json?.city.message}</p>}
                        </div>

                        <div className='w-full custom-inputcontainer'>
                            <label>محافظة</label>
                            <input {...register('json.governorate')}/>
                            {errors.json?.governorate && <p>{errors.json?.governorate.message}</p>}
                        </div>

                        <div className='w-full custom-inputcontainer'>
                            <label>دولة</label>
                            <input {...register('json.country')}/>
                            {errors.json?.country && <p>{errors.json?.country.message}</p>}
                        </div>

                        <div className='w-full custom-inputcontainer'>
                            <label>كود بريدي</label>
                            <input {...register('json.postal_code')}/>
                            {errors.json?.postal_code && <p>{errors.json?.postal_code.message}</p>}
                        </div>

                        <div className='w-full custom-inputcontainer'>
                            <label>رقم هاتف</label>
                            <input {...register('json.phone')}/>
                            {errors.json?.phone && <p>{errors.json?.phone.message}</p>}
                        </div>

                        <div className='w-full flex items-center gap-2'>
                            <input type='checkbox'  {...register('default')}/>
                            <p className='text-xs'>تعيين كعنوان افتراضي</p>
                        </div>

                        <button className='custom-button2 w-fit self-center'>تأكيد</button>
                        
                    </form>
                </>
            ) : <div className='text-center -mb-10'><span className="material-symbols-outlined text-5xl">more_horiz</span></div>
        }
    </div>
  )
}

export default AddressCreateComp