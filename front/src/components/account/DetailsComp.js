import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Auth_DataUpdate } from '../../redux/action/AuthAction'
import { UpdateUserDataValidation } from '../../validations/UpdateUserDataValidation'
import { ValidateInputChanges } from '../../validations/Validation'

const DetailsComp = () => {
    const state = useSelector(state => state.AuthReducer)
    const dispatch = useDispatch()

    // set inputs default values
    const defaultValues = {
        name : state.name ,
        email : state.email ,
        phone : state.phone ,
    }

    // from hook
    const {
        register , 
        handleSubmit , 
        formState:{errors},
        watch ,
        reset
    } = useForm({
        mode:"onBlur" ,
        resolver:zodResolver(UpdateUserDataValidation),
        defaultValues
    })

    // submitting form
    const formSubmit = data => {
        // get only changed values input
        const changedValues = ValidateInputChanges(watch , defaultValues)
        // check if changed input is not only password
        if(Object.keys(changedValues).length > 1)
            dispatch(Auth_DataUpdate(changedValues))
    }

    const formReset = () => {
        reset(defaultValues)
    }

  return (
    <form className='w-full flex flex-col items-center' onSubmit={handleSubmit(formSubmit)}>
        <p className='font-bold text-xs mb-4 self-start'>تفاصيل الحساب : </p>

        <div className='w-full text-xs custom-border border-b-0'>
            <div className='grid grid-cols-2'>
                <div className='custom-border border-t-0 border-x-0 px-4 sm:py-3 py-2'>الاسم {errors.name && <span className='text-red-500 text-xs ms-4'>{errors.name.message}</span>}</div>
                <input {...register('name')} className='custom-border border-t-0 border-e-0 px-4 sm:py-3 py-2 bg-transparent' />
            </div>
            <div className='grid grid-cols-2'>
                <div className='custom-border border-t-0 border-x-0 px-4 sm:py-3 py-2'>البريد الإليكتروني {errors.email && <span className='text-red-500 text-xs ms-4'>{errors.email.message}</span>}</div>
                <input {...register('email')} className='custom-border border-t-0 border-e-0 px-4 sm:py-3 py-2 bg-transparent' />
            </div>
            <div className='grid grid-cols-2'>
                <div className='custom-border border-t-0 border-x-0 px-4 sm:py-3 py-2'>رقم الهاتف {errors.phone && <span className='text-red-500 text-xs ms-4'>{errors.phone.message}</span>}</div>
                <input {...register('phone')} className='custom-border border-t-0 border-e-0 px-4 sm:py-3 py-2 bg-transparent' />
            </div>
            <div className='grid grid-cols-2'>
                <div className='custom-border border-t-0 border-x-0 px-4 sm:py-3 py-2'>كلمة المرور {errors.password && <span className='text-red-500 text-xs ms-4'>{errors.password.message}</span>}</div>
                <input {...register('password')} className='custom-border border-t-0 border-e-0 px-4 sm:py-3 py-2 bg-transparent' type='password' />
            </div>
        </div>
        
        {/* // buttons */}
        <div className='flex gap-4 flex-wrap'>
            <button disabled={state.status == 'lud'} className='custom-button2 mt-2 w-fit'>{
                state.status == "lud" ? "جاري التحميل" : "تعديل البيانات"
            }</button>

            <button type='button' onClick={formReset} className='custom-button3 mt-2 w-fit'>إعادة ضبط</button>
        </div>
    </form>
  )
}

export default DetailsComp