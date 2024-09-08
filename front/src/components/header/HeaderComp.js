import React from 'react'
import SearchBarComp from 'components/header/SearchBarComp'

const HeaderComp = () => {
  return (
    <div className='w-full mb-6'>

        <section className='custom-container grid grid-cols-3 lg:py-6 py-2 max-lg:bg-white'>
          
          {/* side menu icon */}
          <div className='flex items-center lg:hidden'>
            <span className="material-symbols-outlined sm:text-3xl text-2xl hover:cursor-pointer">segment</span>
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
            <span className="material-symbols-outlined hover:cursor-pointer max-sm:text-xl">shopping_cart</span>
            <span className="material-symbols-outlined hover:cursor-pointer max-sm:text-xl max-sm:hidden">person</span>
            <span className="material-symbols-outlined hover:cursor-pointer max-sm:text-xl max-sm:hidden">favorite</span>
          </div>

        </section>

        {/* categories ribbon */}
        <section className='max-lg:hidden bg-secondarybg'>
          <div className=' custom-container flex items-center gap-x-4 py-2'>
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