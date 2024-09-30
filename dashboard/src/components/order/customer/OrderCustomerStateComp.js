import React, { useEffect, useState } from 'react'
import OrderSearchCustomerComp from './OrderSearchCustomerComp'
import { useDispatch, useSelector } from 'react-redux'
import CreatePage from 'pages/user/CreatePage'
import { useLocation } from 'react-router-dom'

const OrderCustomerStateComp = () => {
    const state = useSelector(state => state.OrderReducer)
    const user = useSelector(state => state.UserReducer)
    const dispatch = useDispatch()
    const location = useLocation()

    // selecting handle
    const handleChangeUserState = (user_state) => {
        dispatch({type : "Order_Data" , data : {user_state , user : null}})
    }

    // appending user to order store to be appended with order
    useEffect(() => {
        if(user.status == 'sc' && location.pathname == '/order/create'){
            dispatch({type:"User_Status"  , data : "n"})
            dispatch({type:"Order_Data"  , data : {user : user}})
        }
    } , [user.status])
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
                    {
                        state.user ? <p className=' text-sm '>تم إنشاء المستخدم</p> :  
                        <CreatePage/>
                    }
                </>
            ) : null
        }
    </div>
  )
}

export default OrderCustomerStateComp