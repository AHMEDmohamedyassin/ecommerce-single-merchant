import React from 'react'
import SearchBarComp from 'components/header/SearchBarComp'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Cart_ToggleMenuAction } from '../../redux/action/CartAction'
import CategoriesRibbonComp from './CategoriesRibbonComp'
import { Setting_SideMenuAction } from '../../redux/action/SettingAction'
import { ImageURL } from 'Fetch/Url'

const HeaderComp = () => {
  const fav = useSelector(state => state.FavoriteReducer)
  const cart = useSelector(state => state.CartReducer)
  const dispatch = useDispatch()

  // openning the cart
  const handleOpenCart = () => {
    dispatch(Cart_ToggleMenuAction())
  }

  // opening side menu 
  const openSideMenu = () => {
    dispatch(Setting_SideMenuAction())
  }

  return (
    <div className='w-full mb-6'>

        <section className='custom-container grid grid-cols-3 lg:py-6 py-2 max-lg:bg-white'>
          
          {/* side menu icon */}
          <div className='flex items-center lg:hidden'>
            <span  onClick={openSideMenu} className="material-symbols-outlined sm:text-3xl text-2xl hover:cursor-pointer">segment</span>
          </div>

          {/* logo */}
          <Link to={'/'} className='flex items-center justify-center'>
            <img className='lg:w-48 w-28' src={`${ImageURL}type=setting&width=400`} />
          </Link>
        
          {/* search bar */}
          <div className='max-lg:hidden'>
            <SearchBarComp/>
          </div>

          {/* icons */}
          <div className='flex justify-end items-center sm:gap-x-2 gap-x-1'>
            {/* search icon */}
            <span className="material-symbols-outlined hover:cursor-pointer max-sm:text-xl  lg:hidden">search</span>
            {/* cart icon */}
            <div className='relative'>
              <span onClick={handleOpenCart} data-menubutton="cartmenu" className="material-symbols-outlined hover:cursor-pointer max-sm:text-xl">shopping_cart</span>
              {
                cart.items?.length ? <span className='absolute -bottom-1 -right-1 bg-mainbg p-0'>{cart.items.length}</span> : null
              }
            </div>
            {/* user icon */}
            <Link to={'/account'}>
              <span className="material-symbols-outlined hover:cursor-pointer max-sm:text-xl max-sm:hidden">person</span>
            </Link>
            {/* favorite icon */}
            <Link className='relative' to={'/favorite'}>
              <span className={`${fav.total ? "fill text-red-500" : ""} material-symbols-outlined cursor-pointer hover:text-red-500 hoverfill max-sm:text-xl max-sm:hidden`}>favorite</span>
              {
                fav.total ? (
                  <span className='absolute -bottom-1 right-0'>{fav.total}</span>
                ) : null
              }
            </Link>
          </div>

        </section>

        {/* categories ribbon */}
        <CategoriesRibbonComp/>

    </div>
  )
}

export default HeaderComp