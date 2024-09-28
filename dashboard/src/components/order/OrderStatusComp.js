import React from 'react'
import { formattingOrderStatus } from '../../validation/OrderValidation'
import { useDispatch } from 'react-redux'

const OrderStatusComp = () => {
    const dispatch = useDispatch()

    // handle select order status
    const handleSelect = (e) => {
        dispatch({type:"Order_Data" , data:{order_state : e.target.value}})
    }

  return (
    <div>
        <p className='text-sm text-gray-500'>حالة الطلب</p>
        <select onChange={handleSelect} className='custom-border  w-56'>
            <option value={'success'}>{formattingOrderStatus("success")}</option>
            <option value={'preparing'}>{formattingOrderStatus("preparing")}</option>
        </select>
    </div>
  )
}

export default OrderStatusComp