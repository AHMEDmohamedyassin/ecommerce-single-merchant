import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { StoreAddressCreateValidation } from '../../validation/StoreAddressValidation'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { StoreAddress_CreateAction, StoreAddress_ListAction } from '../../redux/action/StoreAddressAction'

const CreatePage = () => {
    const state = useSelector(state => state.StoreAddressReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // form hook
    const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm({mode:"onBlur" , resolver:zodResolver(StoreAddressCreateValidation)})


    // submitting the form
    const submitForm = data => {
        dispatch(StoreAddress_CreateAction(data))
    }

    // navigate to addresses page after creation
    useEffect(() => {
        if(state.status == 'sc'){
            // refresh stored data
            dispatch(StoreAddress_ListAction(true))
            navigate('/store-address')
        }

    } , [state.status])
  return (
    <div className='custom-dashcontainer'>
        <p className='title'>إنشاء فرع</p>

        <form onSubmit={handleSubmit(submitForm)} className='flex flex-col gap-4'>

            <div className='custom-inputcontainer'>
                <label>العنوان</label>
                <input {...register('address')}/>
                {errors.address && <p>{errors.address.message}</p>}
            </div>

            <div className='custom-inputcontainer'>
                <label>أرقام الهاتف</label>
                <input {...register('json.phone')}/>
                {errors.json?.phone && <p>{errors.json?.phone.message}</p>}
            </div>

            <div className='custom-inputcontainer'>
                <label>أرقام الواتساب</label>
                <input {...register('json.whatsapp')}/>
                {errors.json?.whatsapp && <p>{errors.json?.whatsapp.message}</p>}
            </div>

            <div className='custom-inputcontainer'>
                <label>البريد الإليكتروني الخاص بالفرع</label>
                <input {...register('json.email')}/>
                {errors.json?.email && <p>{errors.json?.email.message}</p>}
            </div>

            <div className='custom-inputcontainer'>
                <label>مواعيد العمل</label>
                <input {...register('json.work')}/>
                {errors.json?.work && <p>{errors.json?.work.message}</p>}
            </div>

            <button className='custom-button2 w-fit self-center'>تأكيد</button>
        </form>
    </div>
  )
}

export default CreatePage