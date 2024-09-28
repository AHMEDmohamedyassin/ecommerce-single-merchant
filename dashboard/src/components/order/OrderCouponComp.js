import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Order_CouponCheckAction } from '../../redux/action/OrderAction'

const OrderCouponComp = () => {
    const dispatch = useDispatch()
    const {register , handleSubmit , formState : {errors}} = useForm({mode:"onBlur"})

    // submitting the form
    const submitForm = data => {
        dispatch(Order_CouponCheckAction(data))
    }

  return (
    <form onSubmit={handleSubmit(submitForm)} className=' flex items-center gap-4'>
        <div className='custom-inputcontainer2 w-80'>
            <label>هل لديك قسيمة</label>
            <div className='flex items-center gap-4 w-full'>
                <input {...register('coupon' , {maxLength:{value : 10, message:"لقد تجاوزت أكبر طول للحقل"} , minLength:{value:10 , message:"يجب إدخال القسيمة مكونة من 10 عناصر"}})}/>
                <button className='custom-button2'>تأكيد</button>
            </div>
            {errors.coupon && <p>{errors.coupon.message}</p>}
        </div>

    </form>
  )
}

export default OrderCouponComp