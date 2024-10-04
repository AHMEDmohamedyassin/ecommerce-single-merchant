import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Cart_AddingAction } from '../../../redux/action/CartAction'

const CheckOutComp = () => {
  const state = useSelector(state => state.CartReducer)
  const dispatch = useDispatch()

  // empty the cart
  const handleEmpytCart = () => {
    dispatch(Cart_AddingAction(0 , "delete_all"))
  }
  
  return state.items.length ? (
    <div style={{boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)'}} className=' px-4 py-6 flex flex-col gap-y-4'>
        <div className='flex-1 flex justify-between items-center'>
            <p>المجموع الفرعي : </p>
            <p>{(state.items || [])?.reduce((previous , current) => previous + (current.price * current.pivot.quantity) , 0)} جم</p>
        </div>
        <p className='text-gray-500 text-sm'>الضرائب و الشحن المحسوبة عند الدفع</p>

        <button className='bg-secondarycolor text-white rounded-full text-sm py-2 hover:bg-maincolor'>إتمام الشراء</button>
        <button onClick={handleEmpytCart} className='bg-black text-white rounded-full text-sm py-2 hover:bg-gray-500'>تفريغ عربة التسوق</button>
    </div>
  ) : null
}

export default CheckOutComp