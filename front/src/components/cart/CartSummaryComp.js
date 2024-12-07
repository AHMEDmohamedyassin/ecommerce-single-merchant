import React from 'react'
import { useSelector } from 'react-redux'

const CartSummaryComp = () => {
    const state = useSelector(state => state.CartReducer)
    const total = (state.items.reduce((acc , curr) => acc + curr.price  * curr.pivot.quantity , 0) || 0) - (state.coupon_value || 0 )
    
  return (
      <div className='border-gray-300 border-[1px] border-b-0 shadow '>

        {/* pieces count  */}
        <div className='grid lg:grid-cols-2 grid-cols-3 border-inherit border-b-[1px]'>
          <div className='max-lg:col-span-2 border-inherit border-e-[1px] p-2 text-sm'>عدد القطع</div>
          <div className='max-lg:text-center p-2 font-bold bg-secondarybg'>{state.items.reduce((acc , curr) => acc + (curr.pivot?.quantity || 0) , 0)}</div>
        </div>

        {/* old_price sum  */}
        <div className='grid lg:grid-cols-2 grid-cols-3 border-inherit border-b-[1px]'>
          <div className='max-lg:col-span-2 border-inherit border-e-[1px] p-2 text-sm'>المجموع قبل الخصم</div>
          <div className='max-lg:text-center p-2 font-bold text-gray-500 bg-secondarybg'>{state.items.reduce((acc , curr) => acc + (curr.old_price && curr.old_price > 0 ? curr.old_price : curr.price) * curr.pivot.quantity , 0)}</div>
        </div>

        {/* discount sum  */}
        <div className='grid lg:grid-cols-2 grid-cols-3 border-inherit border-b-[1px]'>
          <div className='max-lg:col-span-2 border-inherit border-e-[1px] p-2 text-sm'>إجمالي الخصم</div>
          <div className='max-lg:text-center p-2 font-bold text-red-500 bg-secondarybg'> - {Math.abs(state.items.reduce((acc , curr) => acc + ( /**get price incase of old price is not found or zero */ (curr.old_price && curr.old_price > 0 ? curr.old_price : curr.price) - curr.price)  * curr.pivot.quantity , 0) || 0)}</div>
        </div>

        {/* coupon discount  */}
        {
          state.coupon_valid && state.coupon_value ? (
          <div className='grid lg:grid-cols-2 grid-cols-3 border-inherit border-b-[1px]'>
            <div className='max-lg:col-span-2 border-inherit border-e-[1px] p-2 text-sm'>خصم القسيمة</div>
            <div className='max-lg:text-center p-2 font-bold text-red-500 bg-secondarybg'> - {state.coupon_value}</div>
          </div>
          ) : null
        }

        {/* price sum  */}
        <div className='grid lg:grid-cols-2 grid-cols-3 border-inherit border-b-[1px]'>
          <div className='max-lg:col-span-2 border-inherit border-e-[1px] p-2 text-sm'>المجموع بعد الخصم</div>
          <div className='max-lg:text-center p-2 font-bold bg-secondarybg'>{total > 0 ? total : 0}</div>
        </div>

      </div>
  )
}

export default CartSummaryComp