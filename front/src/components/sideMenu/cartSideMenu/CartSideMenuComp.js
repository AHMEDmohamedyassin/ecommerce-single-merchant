import React, { useRef } from 'react'
import CardComp from 'components/sideMenu/cartSideMenu/CardComp'
import CheckOutComp from 'components/sideMenu/cartSideMenu/CheckOutComp'
import { Cart_ToggleMenuAction } from '../../../redux/action/CartAction'
import { useDispatch, useSelector } from 'react-redux'
import { AnimatePresence , motion } from 'motion/react'
import { useSwipeable } from 'react-swipeable'

const CartSideMenuComp = () => {
  const state = useSelector(state => state.CartReducer)
  const dispatch = useDispatch()
  const cartContainer = useRef(null)
  const closeButton = useRef(null)

  // closing cart menu
  const handleCloseCart = e => {
    if(e.target == cartContainer.current || e.target == closeButton.current)
      dispatch(Cart_ToggleMenuAction(false))
  }
  
    // menus open with sliding 
    const handlers = useSwipeable({
      onSwipedLeft: () => {
        dispatch(Cart_ToggleMenuAction(false))
      },
    });
    const handlers2 = useSwipeable({
      onSwipedRight: () => {
        dispatch(Cart_ToggleMenuAction(true))
      },
    });
  return (
    <>
      <div {...handlers2} className=' fixed top-0 left-0 h-full w-8'></div>
      <AnimatePresence>
        {
          state.side_cart ? (
              <div ref={cartContainer} onClick={handleCloseCart} data-menu="cartmenu" data-status="close" data-direction="left" className='max-h-full w-full h-full bg-white/50 fixed top-0 left-0 z-40'>

                  <motion.div 
                    {...handlers} 
                    initial={{left:'-400px'}}
                    exit={{x:'-400px'}}
                    animate={{ left : 0 }}
                    transition={{ duration: 0.2 , ease: "linear"}}
                    className='custom-side-menu max-h-full custom-border shadow-2xl shadow-black/50 flex-col flex'
                  >

                      {/* title */}
                      <div className='flex justify-between items-center p-4 border-b-[1px] border-gray-200'>
                          <span>عربة التسوق</span>
                          <span ref={closeButton} data-menubutton="cartmenu" className="material-symbols-outlined hover:cursor-pointer">close</span>
                      </div>

                      {/* products */}
                      <div className='px-4 h-max overflow-y-auto flex-1'>
                          {
                            state.items.length ? state.items?.map((e , index) => (
                              <CardComp key={index} data={e}/>
                            )) : <p className='text-sm text-center my-20'>لا توجد منتجات</p>
                          }
                      </div>

                      {/* checkout comp */}
                      <CheckOutComp/>

                  </motion.div>
              </div>
          ) : null
        }
      </AnimatePresence>
    </>
  )
}

export default CartSideMenuComp