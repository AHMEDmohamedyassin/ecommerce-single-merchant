import React from 'react'
import CardComp from 'components/sideMenu/cartSideMenu/CardComp'
import CheckOutComp from 'components/sideMenu/cartSideMenu/CheckOutComp'

const CartSideMenuComp = () => {
  return (
    <div data-menu="cartmenu" data-status="close" data-direction="left" className='max-h-full hidden'>
        <div className='custom-side-menu -left-full max-h-full'>

            {/* title */}
            <div className='flex justify-between items-center p-4 border-b-[1px] border-gray-200'>
                <span>عربة التسوق</span>
                <span data-menubutton="cartmenu" className="material-symbols-outlined hover:cursor-pointer">close</span>
            </div>

            {/* products */}
            <div className='px-4 h-max overflow-y-auto'>
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