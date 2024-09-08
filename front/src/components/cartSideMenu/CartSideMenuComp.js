import React from 'react'
import CardComp from 'components/cartSideMenu/CardComp'
import CheckOutComp from 'components/cartSideMenu/CheckOutComp'

const CartSideMenuComp = () => {
  return (
    <div className='custom-dimming'>
        <div className='custom-side-menu overflow-y-scroll'>

            {/* title */}
            <div className='flex justify-between items-center p-4 border-b-[1px] border-gray-200'>
                <span>عربة التسوق</span>
                <span className="material-symbols-outlined">close</span>
            </div>

            {/* products */}
            <div className='px-4 pt-6 '>
                <CardComp/>
                <CardComp/>
                <CardComp/>
                <CardComp/>
            </div>

            {/* checkout comp */}
            <CheckOutComp/>

        </div>
    </div>
  )
}

export default CartSideMenuComp