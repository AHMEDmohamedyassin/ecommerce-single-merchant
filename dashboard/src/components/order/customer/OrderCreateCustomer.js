import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { CreateUserValidation, OrderPageCreateUserValidation } from '../../../validation/UserValidation'

const OrderCreateCustomer = () => {
    const state = useSelector(state => state.UserReducer)
    const dispatch = useDispatch()

    const {
        register , 
        handleSubmit , 
        formState:{errors}} = useForm({
        mode:"all" , 
        resolver:zodResolver(OrderPageCreateUserValidation) ,
        defaultValues:{
            json : {
                governorate : "القاهرة" , 
                city : "القاهرة" , 
            }
        }
    })

    const SubmitForm = user => {
        dispatch({type : "Order_Data" , data : {user}})
    }

  return (
        <div>
            <p className='text-sm text-gray-500 mb-4'>عميل جديد</p>
            <form onSubmit={handleSubmit(SubmitForm)} className='grid gap-4 grid-cols-2 items-start'>
                <div className='custom-inputcontainer'>
                    <label>الاسم</label>
                    <input {...register("name")} />
                    {errors.name && <p>{errors.name.message}</p>}
                </div>

                <div className='custom-inputcontainer'>
                    <label>رقم الهاتف</label>
                    <input {...register("phone")} />
                    {errors.phone && <p>{errors.phone.message}</p>}
                </div>

                <div className='custom-inputcontainer'>
                    <label>البريد الإليكتروني</label>
                    <input {...register("email")} />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>

                <div className='w-full custom-inputcontainer'>
                    <label>عنوان</label>
                    <input {...register('address')}/>
                    {errors.address && <p>{errors.address.message}</p>}
                </div>

                <div className='w-full custom-inputcontainer'>
                <label>مدينة</label>
                <input {...register('json.city')}/>
                {errors.json?.city && <p>{errors.json.city.message}</p>}
                </div>

                <div className='w-full custom-inputcontainer'>
                    <label>محافظة</label>
                    <input {...register('json.governorate')}/>
                    {errors.json?.governorate && <p>{errors.json.governorate.message}</p>}
                </div>
            </form>
        </div>
  )
}

export default OrderCreateCustomer