import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { Auth_LogoutAction } from '../../redux/action/AuthAction'

const NavigationComp = () => {
    const dispatch = useDispatch()
    const location = useLocation()

    const urls = [
        {
            title : "لوحة التحكم" ,
            url : "/account",
            icon : "grid_view"
        },
        {
            title : "العناوين" ,
            url : "/account/addresses",
            icon : "person_pin_circle"
        },
        {
            title : "الطلبات" ,
            url : "/account/orders",
            icon : "shopping_bag"
        },
    ]

    const handleLogout = () => {
        dispatch(Auth_LogoutAction())
    }
  return (
        <section className=''>

            {
                urls.map((e, index) => (
                    <Link to={e.url} className={`${location.pathname == e.url ? "font-bold bg-slate-300" : ""} flex items-center gap-2 custom-border p-1 px-3 text-xs border-b-0`}> 
                        <span class="material-symbols-outlined text-xl">{e.icon}</span>
                        <span>{e.title}</span>
                    </Link>
                ))
            }
            
            <button onClick={handleLogout} className='w-full flex items-center gap-2 custom-border p-1 px-3 text-xs'> 
                <span class="material-symbols-outlined text-xl">logout</span>
                <span>تسجيل الخروج</span>
            </button>

        </section>
  )
}

export default NavigationComp