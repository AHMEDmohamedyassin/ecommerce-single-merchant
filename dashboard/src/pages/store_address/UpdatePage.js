import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { StoreAddressCreateValidation } from '../../validation/StoreAddressValidation'
import { useDispatch, useSelector } from 'react-redux'
import { StoreAddress_DeleteAction, StoreAddress_ReadAction, StoreAddress_UpdateAction } from '../../redux/action/StoreAddressAction'

const UpdatePage = () => {
    const params = useParams()
    const state = useSelector(state => state.StoreAddressReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // form hook
    const {
        register,
        handleSubmit,
        reset ,
        formState:{errors}
    } = useForm({mode:"onBlur" , resolver:zodResolver(StoreAddressCreateValidation)})


    // submitting the form
    const submitForm = data => {
        dispatch(StoreAddress_UpdateAction(data))
    }

    // resetting form
    const resetFrom = () => {
        reset(state)
    }

    // resetting form
    const deleteHandle = () => {
        dispatch(StoreAddress_DeleteAction())
    }

    // navigate to addresses page after creation and initiate default values
    useEffect(() => {
        if(state.status == 'sd'){
            dispatch({type :"StoreAddress_Status" , data:"n"})
            navigate('/store-address')
        }

        // setting default values after fetching store data
        reset(state)

    } , [state.status])

    useEffect(() => {
        // initial getting the store data
        dispatch(StoreAddress_ReadAction(params.id))
    } , [])
  return (
    <div className='custom-dashcontainer'>
        <p className='title'>تعديل الفرع</p>

        {
            state.status == 'n' && !state.id ? <p className='text-red-500 text-center text-sm'>بيانات الفرع غير موجودة</p> :
            (
                <>
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

                        <div className='flex items-center gap-4 self-center'>
                            <button className='custom-button2 w-fit self-center'>تأكيد</button>
                            <button type='button' onClick={resetFrom} className='custom-button hover:bg-blue-500 w-fit self-center'>إعادة</button>
                            <button type='button' onClick={deleteHandle} className='custom-button hover:bg-red-500 w-fit self-center'>حذف</button>
                        </div>
                    </form>
                </>
            )
        }
    </div>
  )
}

export default UpdatePage