import React from 'react'

const ButtonsComp = () => {
  return (
    <>
      <div className='grid grid-cols-4 w-full gap-4'>

        {/* add to cart button */}
        <button className='max-sm:order-2 flex items-center justify-center gap-2 sm:col-span-3 col-span-4 bg-secondarycolor text-white py-1 text-xs font-semibold rounded-lg custom-border hover:bg-maincolor'>
          <span className="material-symbols-outlined text-xl">shopping_cart</span>
          <span>أضف إلي السلة</span>
        </button>

        {/* count selection */}
        <div className=' max-sm:order-1 max-sm:col-span-2 custom-border border-gray-800 rounded-lg flex justify-between items-center px-2 select-none'>
          <span className='text-xl font-bold hover:cursor-pointer hover:text-maincolor'>+</span>
          <span>3</span>
          <span className='text-xl font-bold hover:cursor-pointer hover:text-maincolor'>-</span>
        </div>

        {/* buying button */}
        <button className='max-sm:order-3 flex items-center justify-center gap-2 col-span-4 bg-black text-white py-1 text-xs font-semibold rounded-lg custom-border hover:bg-secondarycolor'>
          <span className="material-symbols-outlined text-xl">shopping_cart</span>
          <span>اشتري الان</span>
        </button>

      </div>
    </>
  )
}

export default ButtonsComp