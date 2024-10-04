import React from 'react'
import SearchBarComp from 'components/header/SearchBarComp'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Cart_ToggleMenuAction } from '../../redux/action/CartAction'

const HeaderComp = () => {
  const dispatch = useDispatch()

  // openning the cart
  const handleOpenCart = () => {
    dispatch(Cart_ToggleMenuAction())
  }
  return (
    <div className='w-full mb-6'>

        <section className='custom-container grid grid-cols-3 lg:py-6 py-2 max-lg:bg-white'>
          
          {/* side menu icon */}
          <div className='flex items-center lg:hidden'>
            <span  data-menubutton="sidemenu" className="material-symbols-outlined sm:text-3xl text-2xl hover:cursor-pointer">segment</span>
          </div>

          {/* logo */}
          <div className='flex items-center justify-center'>
            <img className='lg:w-48 w-28' src='https://cdn.shopify.com/s/files/1/0760/7992/3480/files/T_N_logotype_fullcolor_rgb.svg?v=1695484067' />
          </div>
        
          {/* search bar */}
          <div className='max-lg:hidden'>
            <SearchBarComp/>
          </div>

          {/* icons */}
          <div className='flex justify-end items-center sm:gap-x-2 gap-x-1'>
            <span className="material-symbols-outlined hover:cursor-pointer max-sm:text-xl  lg:hidden">search</span>
            <span onClick={handleOpenCart} data-menubutton="cartmenu" className="material-symbols-outlined hover:cursor-pointer max-sm:text-xl">shopping_cart</span>
            <Link to={'/account'}>
              <span className="material-symbols-outlined hover:cursor-pointer max-sm:text-xl max-sm:hidden">person</span>
            </Link>
            <span className="material-symbols-outlined hover:cursor-pointer max-sm:text-xl max-sm:hidden">favorite</span>
          </div>

        </section>

        {/* categories ribbon */}
        <section className='max-lg:hidden bg-secondarybg'>
          <div className=' custom-container flex items-center gap-x-4 py-2'>
            {/* side menu icon */}
            <div className='flex items-center -my-10'>
              <span  data-menubutton="sidemenu" className="material-symbols-outlined sm:text-3xl text-2xl hover:cursor-pointer">segment</span>
            </div>

            <div>ahmed</div>
            <div className='w-[1px] h-[10px] bg-maincolor'></div>
            <div>ahmed</div>
            <div className='w-[1px] h-[10px] bg-maincolor'></div>
            <div>ahmed</div>
            <div className='w-[1px] h-[10px] bg-maincolor'></div>
            <div>ahmed</div>
            <div className='w-[1px] h-[10px] bg-maincolor'></div>
            <div>ahmed</div>
          </div>
        </section>

    </div>
  )
}

export default HeaderComp