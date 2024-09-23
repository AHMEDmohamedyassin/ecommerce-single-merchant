import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { TopCategory_CreateAction } from '../../redux/action/CategoryAction';
import {TopCategoryCreateValidation } from 'validation/CategoryValidation';

const TopCategoryCreateComp = () => {
    const dispatch = useDispatch()

    // form hook
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode : "onBlur" ,
        resolver: zodResolver(TopCategoryCreateValidation)
    });

    // submit for
    const submitForm = data => {
        dispatch(TopCategory_CreateAction(data))
    }

  return (
    <form onSubmit={handleSubmit(submitForm)} className='w-full custom-border p-4 m-4 rounded-lg shadow flex flex-col gap-4'>
        
        <p className='title'>إضافة مجموعة أقسام</p>

        <div className='custom-inputcontainer '>
            <label>العنوان</label>
            <input {...register('title')} />
            {errors.title && <p>{errors.title.message}</p>}
        </div>

        <button className='custom-button2 w-fit self-center'>تأكيد</button>

    </form>
  )
}

export default TopCategoryCreateComp