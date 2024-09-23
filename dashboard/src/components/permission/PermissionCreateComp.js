import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Role_CreateAction } from '../../redux/action/PermissionAction'
import { RoleValidation } from '../../validation/RoleValidation'

const PermissionCreateComp = () => {
    const dispatch = useDispatch()

    // from hook
    const {register , handleSubmit , formState:{errors}} = useForm({mode:"onBlur" , resolver:zodResolver(RoleValidation)})

    // submit form
    const submitForm = data => {
        dispatch(Role_CreateAction(data))
    }

  return (
    <form onSubmit={handleSubmit(submitForm)} className='my-10 px-4 flex flex-col items-center'>
        <p className='title'>إنشاء صلاحية</p>

        <div className='w-full flex max-lg:flex-col items-start gap-4'>
            <div className='custom-inputcontainer'>
                <label>العنوان</label>
                <input {...register("title")} />
                {errors.title && <p>{errors.title.message}</p>}
            </div>
            <div className='custom-inputcontainer'>
                <label>الوصف</label>
                <input {...register("description")} />
                {errors.description && <p>{errors.description.message}</p>}
            </div>
        </div>

        <button className='custom-button2 mt-4'>تأكيد</button>
    </form>
  )
}

export default PermissionCreateComp