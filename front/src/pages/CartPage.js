import { useSelector } from 'react-redux'
import CardComp from '../components/cart/CardComp'
import React from 'react'
import CartSummaryComp from 'components/cart/CartSummaryComp'
import CartButtonsComp from 'components/cart/CartButtonsComp'
import CartCouponComp from 'components/cart/CartCouponComp'
import AddressComp from 'components/cart/AddressComp'

const CartPage = () => {
  const state = useSelector(state => state.CartReducer)
  return (
    <div className='custom-container flex flex-col gap-10'>
      <p className='font-semibold text-lg text-gray-500 text-center '>عربة الشراء</p>

      {/* table of products  */}
      <div className='w-full flex flex-col border-y-[1px] border-gray-300 lg:shadow'>

        {/* table title of cart  */}
        <div className='grid grid-cols-7'>
          <div className='text-center py-3 border-inherit border-l-[1px]  bg-secondarybg'>صورة</div>
          <div className='text-center py-3 border-inherit border-l-[1px]  bg-secondarybg col-span-2'>العنوان</div>
          <div className='text-center py-3 border-inherit border-l-[1px]  bg-secondarybg '>سعر الوحدة</div>
          <div className='text-center py-3 border-inherit border-l-[1px]  bg-secondarybg '>الكمية</div>
          <div className='text-center py-3 border-inherit border-l-[1px]  bg-secondarybg '>إجمالي الوحدة</div>
          <div className='text-center py-3 border-inherit border-l-[1px]  bg-secondarybg '>حذف</div>
        </div>

        {/* the cart contents  */}
        {
          state.items.length ? state.items?.map((e , index) => (
            <CardComp key={e.id} data={e}/>
          )) : <p className='text-sm text-center my-20'>لا توجد منتجات</p>
        }
      </div>


      
      {
        state.items.length ? (
          <>

            {/* address selection */}
            <AddressComp/>

            {/* coupon  */}
            <CartCouponComp/>

            {/* cart summary  */}
            <CartSummaryComp/>

            
            {/* buttons  */}
            <CartButtonsComp/>
            
          </>
        ) : null
      }

    </div>
  )
}

export default CartPage