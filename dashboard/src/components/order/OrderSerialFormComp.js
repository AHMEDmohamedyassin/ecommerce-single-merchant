import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Order_ProductSerailRetrieveAction } from '../../redux/action/OrderAction'
import { useForm } from 'react-hook-form'

// needs to implement the scanner

const OrderSerialFormComp = () => {
  const dispatch = useDispatch()
  const [serial , setSerial] = useState(null)

  const {register , handleSubmit , formState : {errors}} = useForm({mode:"onBlur"})

  // submitting handle
  const submitForm = (data) => {

    dispatch(Order_ProductSerailRetrieveAction(data.serial))
  }

  return (
        <form onSubmit={handleSubmit(submitForm)} className='flex items-center w-80 gap-4'>
            <div className='custom-inputcontainer2'>
                <label>ادخل رمز المنتج</label>
                <div className='flex items-center w-full gap-4'>
                  <input {...register('serial' , {required:"الرجاء إدخال كود المنتج"})} className='' placeholder='234452'/>
                  <button className='custom-button'>تأكيد</button>
                </div>
                {errors.serial && <p>{errors.serial.message}</p>}
            </div>
        </form>
  )
}

export default OrderSerialFormComp