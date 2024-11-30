import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { CouponCreateValidation } from '../../validation/CouponValidation'
import { useDispatch } from 'react-redux'
import { Coupon_CreateAction } from '../../redux/action/CouponAction'

const CreateComp = () => {
    const dispatch = useDispatch()

    const {
        register , 
        handleSubmit , 
        formState:{errors}
    } = useForm({
        mode:"onBlur" , 
        resolver:zodResolver(CouponCreateValidation),
        defaultValues:{
            value : 100 , 
            expire_date : 5 ,
            count : 1
        }
    })
  

    // submit creating coupon
    const submitForm = data => {
        dispatch(Coupon_CreateAction(data))
    }

    return (
    <form onSubmit={handleSubmit(submitForm)} className='flex gap-4 sm:items-end max-sm:flex-col xl:w-[600px] mx-auto'>
        <div className='custom-inputcontainer2'>
            <label>القيمة</label>
            <input type='number' {...register('value' , {valueAsNumber:true})} />
            {errors.value && <p>{errors.value.message}</p>}
        </div>
        <div className='custom-inputcontainer2'>
            <label>عدد أيام الصلاحية</label>
            <input type='number' {...register('expire_date'  , {valueAsNumber:true})} />
            {errors.expire_date && <p>{errors.expire_date.message}</p>}
        </div>
        <div className='custom-inputcontainer2'>
            <label>عدد</label>
            <input type='number' {...register('count' , {valueAsNumber:true})}/>
            {errors.count && <p>{errors.count.message}</p>}
        </div>

        <button className='custom-button2 text-nowrap max-sm:self-center'>إضافة القسائم</button>
    </form>
  )
}

export default CreateComp