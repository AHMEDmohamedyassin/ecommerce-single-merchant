import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Cart_CouponCheckAction } from '../../redux/action/CartAction'

const CartCouponComp = () => {
    const state = useSelector(state => state.CartReducer)
    const dispatch = useDispatch()
    const [coupon , setCoupon] = useState(null)

    // checking coupon
    const couponCheck = () => {
        dispatch(Cart_CouponCheckAction(coupon))
    }

  return (
    <div className='flex items-end gap-4 '>
        <div className='custom-inputcontainer flex-1'>
            <label>هل لديك قسيمة شراء</label>
            <input onChange={e => setCoupon(e.target.value)} placeholder='اضف قسيمة الشراء '/>
            {
                !state.coupon_valid ? <p>قسيمة الشراء غير صالحة</p> : null
            }
        </div>

        <button onClick={couponCheck} className='custom-button2'>تأكيد القسيمة</button>
    </div>
  )
}

export default CartCouponComp