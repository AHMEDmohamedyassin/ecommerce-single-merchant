import React, { useEffect, useRef, useState } from 'react'
import ListComp from 'components/sideMenu/sideMenu/ListComp'
import PrefInfoComp from './PrefInfoComp'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Setting_SideMenuAction } from '../../../redux/action/SettingAction'

const SideMenuComp = () => {
    const state = useSelector(state => state.SettingReducer)
    const categories = useSelector(state => state.CategoryReducer)
    const auth = useSelector(state => state.AuthReducer)
    const dispatch = useDispatch()
    const menuContainer = useRef(null)
    const closeButton = useRef(null)
    const [links , setLinks] = useState()

    // default links 
    const defaultLinks = [
      {
        title : "خدمة العملاء" ,
        links : [
          {title : "سياسة الاستبدال و الاسترجاع" , url : "/policies"} ,
          {title : "الأسئلة الأكثر شيوعا" , url : "/faqs"} ,
          {title : "الدعم و المساعدة" , url : "/contact"} ,
          {title : "تواصل معنا" , url : "/contact"} ,
        ]
      },
      {
        title : "روابط هامة" ,
        links : [
          {title : "الفروع التابعة" , url : "/contact"} ,
          {title : "معلومات عنا" , url : "/about"} ,
        ]
      }
    ]


    // closing cart menu
    const handleCloseMenu = (e) => {
      if(!e || (e.target == menuContainer.current))
        dispatch(Setting_SideMenuAction(false))
    }

    // appending categories to side menu on fetched 
    useEffect(() => {
      setLinks([...defaultLinks , ...categories.top_categories?.map(e => ({title : e.title == "other" ? "أقسام أخري" : `أقسام ${e.title}` , links : e.categories?.map(ele => ({title : ele.title , url : `/search?categories=${ele.id}`}))}) )])
    } , [categories])
  return (
    <>
      {
        state.side_menu ? (

          <div ref={menuContainer} onClick={handleCloseMenu} className='max-h-full w-full h-full bg-white/50 fixed top-0 left-0 z-40'> 
              <div className='custom-side-menu right-0 max-h-full custom-border shadow-2xl shadow-black/50 flex-col flex'>  

                  {/* sections choose */}
                  {/* <div className='h-14 flex shadow text-sm'>
                      <div className='bg-[#e3e3e3] border-b-[1px] border-secondarycolor w-2/4 h-full flex items-center justify-center'>القائمة</div>
                      <div className='bg-[#f3f3f3] border-b-[1px] border-[#f3f3f3] w-2/4 h-full flex items-center justify-center'>التصنيفات</div>
                  </div> */}

                  {/* header section */}
                  <section className='bg-mainbg h-14 flex justify-between items-center px-4 shadow border-b-secondarycolor border-[1px]'>
                      <span>القائمة</span>
                      <span onClick={() => handleCloseMenu()} ref={closeButton} className="material-symbols-outlined hover:cursor-pointer">close</span>
                  </section>

                  {/* container for : lists , links , pref informations */}
                  <div className='flex-1 overflow-y-auto'>
                      {
                          links && links.length ? links.map((e , index) => (
                              <ListComp key={index} data={e}/>
                          )) : null
                      }


                      {/* links */}
                      <Link onClick={() => handleCloseMenu()} to={'/search'}  className='ms-4 text-sm flex items-center gap-2 border-b-[1px] border-gray-200 py-3'>
                          <span className="material-symbols-outlined">search</span>
                          <span>بحث</span>
                      </Link>

                      <Link  onClick={() => handleCloseMenu()} to={'/auth/login'} className='ms-4 text-sm flex items-center gap-2 border-b-[1px] border-gray-200 py-3'>
                          <span className="material-symbols-outlined">person</span>
                          {
                            auth.token ? 
                            <span>بيانات المستخدم</span>
                            :<span>دخول / تسجيل</span>
                          }
                      </Link>


                      {/* pref informations */}
                      <PrefInfoComp/>

                  </div>


              </div>
          </div>
        ) : null 
      }
    </>
  )
}

export default SideMenuComp