import { zodResolver } from '@hookform/resolvers/zod';
import ImageInputUploaderComp from 'components/public/ImageInputUploaderComp';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { CategoryCreateValidation } from '../../validation/CategoryValidation';
import { z } from 'zod';
import { Category_CreateAction } from '../../redux/action/CategoryAction';
import { useDispatch } from 'react-redux';

const CategoryCreateComp = () => {
    const dispatch = useDispatch()
    const [file , setFile] = useState(null)

    // form hook
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode : "onBlur" ,
        resolver: zodResolver(CategoryCreateValidation)
    });

    // submit for
    const submitForm = data => {
        dispatch(Category_CreateAction(data , file))
    }

  return (
    <form onSubmit={handleSubmit(submitForm)} className='w-full custom-border p-4 m-4 rounded-lg shadow flex flex-col gap-4'>
        
        <p className='title'>إضافة قسم</p>

        <div className='custom-inputcontainer '>
            <label>العنوان</label>
            <input {...register('title')} />
            {errors.title && <p>{errors.title.message}</p>}
        </div>
        
        <div className='custom-inputcontainer'>
            <label>الوصف</label>
            <input {...register('description')} />
            {errors.description && <p>{errors.description.message}</p>}
        </div>
        
        <div className=''>
            <p className='text-gray-500 text-sm font-bold mb-2'>قم بإضافة صورة</p>
            <div className='lg:w-2/4 w-full mx-auto'>
                <ImageInputUploaderComp name={"image"} setFile={setFile}/>
            </div>
        </div>

        <button className='custom-button2 w-fit self-center'>تأكيد</button>

    </form>
  )
}

export default CategoryCreateComp