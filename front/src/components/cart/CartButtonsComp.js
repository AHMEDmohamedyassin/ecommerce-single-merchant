import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Cart_AddingAction } from '../../redux/action/CartAction'
import { useNavigate } from 'react-router-dom'
import { Order_CreateAction } from '../../redux/action/OrderAction'

const CartButtonsComp = () => {
    const state = useSelector(state => state.OrderReducer)
    const setting = useSelector(state => state.SettingReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [pay_on_diliver , setPay_on_diliver] = useState(false)

    // reset cart 
    const handleCartReset = () => {
        dispatch(Cart_AddingAction(0 , "delete_all"))
        navigate('/')
    }

    // create order 
    const CreateOrderHandle = () => {
      dispatch(Order_CreateAction())
    }

    // changing payment method on user choose the method 
    useEffect(() => {
      dispatch({type : "Order_Data" , data : {pay_on_diliver}})
    } , [pay_on_diliver])

    // navigate to order page after submitting order
    useEffect(() => {
      console.log(state.status)
      if(['lp' , 'll'].includes(state.status))
        navigate(`/account/orders`)

    } , [state.status])
  return (
    <>
      <div className='custom-inputcontainer gap-4'>
        <label>اختر وسيلة الدفع</label>

        <div className='flex gap-x-10 gap-y-2 flex-wrap'>

          {
            setting.items.find(e => e.slug == 'allow_paymentgateway')?.value == 1 ? 
              <div className='flex items-center gap-2'>
                <input type='radio' name='paymentmethod' onChange={e => setPay_on_diliver(false)} className='aspect-square w-6'></input>
                <label>الدفع أون لاين</label>
              </div>
            :null
          }

          <div className='flex items-center gap-2'>
            <input type='radio' name='paymentmethod' onChange={e => setPay_on_diliver(true)} defaultChecked className='aspect-square w-6'></input>
            <label>الدفع عند الإستلام</label>
          </div>

        </div>

      </div>

      <div className='flex items-center flex-wrap gap-2'>
          <button onClick={CreateOrderHandle} className='custom-button2 hover:bg-maincolor bg-secondarycolor flex-1'>إتمام الشراء</button>
          <button onClick={handleCartReset} className='custom-button2 flex-1'>تفريغ عربة الشراء</button>
      </div>
    </>
  )
}

export default CartButtonsComp