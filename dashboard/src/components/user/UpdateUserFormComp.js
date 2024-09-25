import React, { useEffect, useState } from 'react'
import { User_DeleteAction, User_ReadAction, User_UpdateAction } from '../../redux/action/UserAction'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UpdateUserValidation } from '../../validation/UserValidation'
import { ValidateInputChanges } from 'validation/Validation'

const UpdateUserFormComp = () => {
    const state = useSelector(state => state.UserReducer)
    const dispatch = useDispatch()
    const params = useParams()
    const navigate = useNavigate()
    const [defaultValues , setDefaultValues] = useState({})

    const {
        register , 
        handleSubmit , 
        reset,
        watch , 
        formState:{errors}} = useForm({
        mode:"onBlur" , 
        resolver:zodResolver(UpdateUserValidation) ,
    })

    // submitting the form
    const SubmitForm = (data) =>{
        dispatch(User_UpdateAction(ValidateInputChanges(watch , defaultValues)))
    }

    // reset
    const ResetForm = () => {
        reset(defaultValues)
    }

    // handle delete 
    const handleDelete = () => {
        dispatch(User_DeleteAction(state.id))
    }
    
    // setting default values
    useEffect(() => {
        reset(state)
        setDefaultValues(state)

        // navigate user after delete the account
        if(state.status == 'sd'){
            dispatch({type:"User_Reset"})
            navigate('/users')
        }
    } , [state])
  return (
    <div className='custom-dashcontainer'>
        <p className='title'>تعديل المستخدم</p>
        <form onSubmit={handleSubmit(SubmitForm)} className='flex flex-col gap-4'>

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

            {/* buttons  */}
            <div className='flex justify-center gap-4 flex-wrap'>
                <button type='submit' className='custom-button2 w-fit'>تأكيد</button>
                <button onClick={ResetForm} type='button' className='custom-button hover:bg-blue-500'>إعادة</button>
                <button onClick={handleDelete} type='button' className='custom-button hover:bg-red-500'>حذف</button>
            </div>
        </form>
    </div>
  )
}

export default UpdateUserFormComp