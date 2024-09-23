import React from 'react'
import { Link } from 'react-router-dom'

const SideMenuComp = () => {
  return (
    <div data-animate="sidemenu" className='fixed top-0 right-0 flex h-[100vb] bg-maincolor shadow overflow-hidden w-[60px] pt-10'>
        <div className='flex flex-col justify-between items-start overflow-y-auto overflow-hidden gap-y-4  px-4 py-6 h-full font-semibold'>
            
            {/* closing and opening icons */}
            <span data-animate="sidemenuicon" className="hover:text-maincolor hover:cursor-pointer material-symbols-outlined text-3xl text-inherit">menu</span>
            <span data-animate="sidemenuicon" className="hidden hover:text-maincolor hover:cursor-pointer material-symbols-outlined text-3xl text-inherit">close</span>
            
            {/* links */}
            <Link to={"/"} className='flex items-center gap-4 hover:text-maincolor'>
                <span className="material-symbols-outlined text-3xl text-inherit">dashboard</span>
                <span data-animate="sidemenulabel" className=' text-nowrap'>لوحة التحكم</span>
            </Link>

            <Link to={"/products"} className='flex items-center gap-4 hover:text-maincolor'>
                <span className="material-symbols-outlined text-3xl text-inherit">category</span>
                <span data-animate="sidemenulabel" className=' text-nowrap'>المنتجات</span>
            </Link>

            <Link to={"/login"} className='flex items-center gap-4 hover:text-maincolor'>
                <span className="material-symbols-outlined text-3xl text-inherit">add</span>
                <span data-animate="sidemenulabel" className=' text-nowrap'>إضافة منتج</span>
            </Link>

            <Link to={"/"} className='flex items-center gap-4 hover:text-maincolor'>
                <span className="material-symbols-outlined text-3xl text-inherit">person</span>
                <span data-animate="sidemenulabel" className=' text-nowrap'>المستخدمون</span>
            </Link>
            
            <Link to={"/"} className='flex items-center gap-4 hover:text-maincolor'>
                <span className="material-symbols-outlined text-3xl text-inherit">person_add</span>
                <span data-animate="sidemenulabel" className=' text-nowrap'>إضافة مستخدم</span>
            </Link>
        </div>
    </div>
  )
}

export default SideMenuComp