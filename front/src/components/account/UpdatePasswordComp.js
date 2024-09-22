import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Auth_DataUpdate } from '../../redux/action/AuthAction'
import { NewPasswordValidation } from '../../validations/NewPasswordValidation'

const UpdatePasswordComp = () => {
    const state = useSelector(state => state.AuthReducer)
    const dispatch = useDispatch()

    // from hook
    const {
        register , 
        handleSubmit , 
        formState:{errors},
    } = useForm({
        mode:"onBlur" ,
        resolver:zodResolver(NewPasswordValidation)
    })

    // submitting form
    const formSubmit = data => {
        dispatch(Auth_DataUpdate(data))
    }

  return (
    <form className='w-full flex flex-col items-center' onSubmit={handleSubmit(formSubmit)}>
        <p className='font-bold text-xs mb-4 self-start'>تفاصيل الحساب : </p>

        <div className='w-full text-xs custom-border border-b-0'>
            <div className='grid grid-cols-2'>
                <div className='custom-border border-t-0 border-x-0 px-4 sm:py-3 py-2'>كلمة المرور الجديدة {errors.new_password && <span className='text-red-500 text-xs ms-4'>{errors.new_password.message}</span>}</div>
                <input {...register('new_password')} className='custom-border border-t-0 border-e-0 px-4 sm:py-3 py-2 bg-transparent' />
            </div>
            <div className='grid grid-cols-2'>
                <div className='custom-border border-t-0 border-x-0 px-4 sm:py-3 py-2'>تأكيد كلمة المرور {errors.password_confirmation && <span className='text-red-500 text-xs ms-4'>{errors.password_confirmation.message}</span>}</div>
                <input {...register('password_confirmation')} className='custom-border border-t-0 border-e-0 px-4 sm:py-3 py-2 bg-transparent' type='password' />
            </div>
            <div className='grid grid-cols-2'>
                <div className='custom-border border-t-0 border-x-0 px-4 sm:py-3 py-2'>كلمة المرور القديمة {errors.password && <span className='text-red-500 text-xs ms-4'>{errors.password.message}</span>}</div>
                <input {...register('password')} className='custom-border border-t-0 border-e-0 px-4 sm:py-3 py-2 bg-transparent' />
            </div>
        </div>
        
        {/* // buttons */}
        <button disabled={state.status == 'lud'} className='custom-button2 mt-2 w-fit'>{
            state.status == "lud" ? "جاري التحميل" : "تعديل البيانات"
        }</button>
    </form>
  )
}

export default UpdatePasswordComp