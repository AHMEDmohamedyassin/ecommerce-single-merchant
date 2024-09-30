import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { CreateUserValidation } from '../../validation/UserValidation'
import { useDispatch, useSelector } from 'react-redux'
import { User_CreateAction } from '../../redux/action/UserAction'
import { useLocation, useNavigate } from 'react-router-dom'

const CreatePage = () => {
    const state = useSelector(state => state.UserReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const {register , handleSubmit , formState:{errors}} = useForm({mode:"onBlur" , resolver:zodResolver(CreateUserValidation)})

    const SubmitForm = data => {
        dispatch(User_CreateAction({...data , json : {...data.json , name : data.name , phone : data.phone}}))
    }

    // navigate to update page after creating user
    // handle navigation only when user create page in open not when page is implemented in other page
    useEffect(() => {
        if(state.status == 'sc' && location.pathname == `/user/create`){
            dispatch({type:"User_Status" , data : "n"})
            navigate(`/user/update/${state.id}`)
        }
    } , [state.status])
  return (
    <div className='custom-dashcontainer'>
        
        <p className='title'>إنشاء مستخدم</p>

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

            <div className='w-full custom-inputcontainer'>
                <label>عنوان</label>
                <input {...register('address')}/>
                {errors.address && <p>{errors.address.message}</p>}
            </div>

            <div className='w-full custom-inputcontainer'>
                <label>شركة</label>
                <input {...register('json.company')}/>
                {errors.json?.company && <p>{errors.json.company.message}</p>}
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

            <div className='w-full custom-inputcontainer'>
                <label>دولة</label>
                <input {...register('json.country')}/>
                {errors.json?.country && <p>{errors.json.country.message}</p>}
            </div>

            <div className='w-full custom-inputcontainer'>
                <label>كود بريدي</label>
                <input {...register('json.postal_code')}/>
                {errors.json?.postal_code && <p>{errors.json.postal_code.message}</p>}
            </div>

            <div className='w-full flex items-center gap-2'>
                <input type='checkbox'  {...register('default')}/>
                <p className='text-xs'>تعيين كعنوان افتراضي</p>
            </div>

            <button className='custom-button2 w-fit self-center'>تأكيد</button>
        </form>
    </div>
  )
}

export default CreatePage