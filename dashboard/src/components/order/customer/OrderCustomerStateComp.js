import React, { useState } from 'react'
import OrderCreateCustomer from './OrderCreateCustomer'
import OrderSearchCustomerComp from './OrderSearchCustomerComp'
import { useDispatch, useSelector } from 'react-redux'

const OrderCustomerStateComp = () => {
    const state = useSelector(state => state.OrderReducer)
    const dispatch = useDispatch()

    // selecting handle
    const handleChangeUserState = (user_state) => {
        dispatch({type : "Order_Data" , data : {user_state , user : null}})
    }

  return (
    <div className=''>
        <select onChange={e => handleChangeUserState(e.target.value)} className='custom-border mb-4 w-56'>
            <option value={null}>بدون تحديد العميل</option>
            <option value={'old'}>عميل موجود مسبقا</option>
            <option value={'new'}>عميل جديد</option>
        </select>

        {
            state.user_state == 'old' ? (
                <>
                    {/* searching for customer */}
                    <OrderSearchCustomerComp/>
                </>
            )
            : state.user_state == 'new' ?(
                <>
                    {/* creating new customer  */}
                    <OrderCreateCustomer/>
                </>
            ) : null
        }
    </div>
  )
}

export default OrderCustomerStateComp