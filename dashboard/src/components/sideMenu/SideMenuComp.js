import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Auth_LogoutAction } from '../../redux/action/AuthAction'

const SideMenuComp = () => {
    const state = useSelector(state => state.SettingReducer)
    const dispatch = useDispatch()

    const links = [
        {
            href : "/" , 
            title : "لوحة التحكم" ,
            icon : "dashboard"
        },
        {
            href : "/products" , 
            title : "المنتجات" ,
            icon : "category"
        },
        {
            href : "/users" , 
            title : "المستخدمين" ,
            icon : "person"
        },
        {
            href : "/coupon" , 
            title : "القسائم" ,
            icon : "money"
        },
        {
            href : "/orders" , 
            title : "الطلبات" ,
            icon : "shopping_cart"
        },
        {
            href : "/permission" , 
            title : "الصلاحيات" ,
            icon : "check"
        },
        {
            href : "/category" , 
            title : "الأقسام" ,
            icon : "category"
        },
        {
            href : "/store-address" , 
            title : "الفروع" ,
            icon : "pin_drop"
        },
        {
            href : "/review" , 
            title : "المراجعات" ,
            icon : "rate_review"
        },
    ]

    const toggleSideMenu = () => {
        dispatch({type : "Setting_Data" , data : {side_menu : !state.side_menu}})
    }

    // handle logout 
    const handleLogout = () => {
        dispatch(Auth_LogoutAction())
    }

  return (
    <div data-animate="sidemenu" className='h-fit flex bg-secondarybg shadow w-fit custom-border rounded-lg ms-2 sticky top-20'>
        <div className='flex flex-col justify-between items-start overflow-y-auto overflow-hidden gap-y-4  px-4 py-6 h-full font-semibold'>
            
            {/* closing and opening icons */}
            <span onClick={toggleSideMenu} data-animate="sidemenuicon" className="hover:text-maincolor hover:cursor-pointer material-symbols-outlined text-3xl text-inherit">menu</span>
            <span onClick={toggleSideMenu} data-animate="sidemenuicon" className="hidden hover:text-maincolor hover:cursor-pointer material-symbols-outlined text-3xl text-inherit">close</span>
            
            {/* links */}
            {
                links.map((e , index) => (
                    <Link key={index} to={e.href} className='flex items-center gap-4 hover:text-maincolor w-full'>
                        <span className="material-symbols-outlined text-3xl text-inherit">{e.icon}</span>
                        {
                            state.side_menu ? (
                                <span data-animate="sidemenulabel" className=' text-nowrap'>{e.title}</span>
                            ) : null
                        }
                    </Link>
                ))
            }

            <button onClick={handleLogout} className='flex items-center gap-4 hover:text-maincolor w-full'>
                <span className="material-symbols-outlined text-3xl text-inherit">logout</span>
                {
                    state.side_menu ? (
                        <span data-animate="sidemenulabel" className=' text-nowrap'>تسجيل الخروج</span>
                    ) : null
                }
            </button>
        </div>
    </div>
  )
}

export default SideMenuComp