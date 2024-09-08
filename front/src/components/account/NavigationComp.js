import React from 'react'
import { Link } from 'react-router-dom'

const NavigationComp = () => {
  return (
        <section className=''>

            <Link to="/account" className='flex items-center gap-2 custom-border p-1 px-3 text-xs border-b-0 font-bold bg-slate-300'> 
                <span class="material-symbols-outlined text-xl">grid_view</span>
                <span>لوحة التحكم</span>
            </Link>
            <Link to="/account/addresses" className='flex items-center gap-2 custom-border p-1 px-3 text-xs border-b-0'> 
                <span class="material-symbols-outlined text-xl">person_pin_circle</span>
                <span>عناوين</span>
            </Link>
            <Link to="/account" className='flex items-center gap-2 custom-border p-1 px-3 text-xs'> 
                <span class="material-symbols-outlined text-xl">logout</span>
                <span>تسجيل الخروج</span>
            </Link>

        </section>
  )
}

export default NavigationComp