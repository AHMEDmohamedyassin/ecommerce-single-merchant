import React from 'react'
import ListComp from 'components/sideMenu/sideMenu/ListComp'
import PrefInfoComp from './PrefInfoComp'
import { Link } from 'react-router-dom'

const SideMenuComp = () => {
    
    const links = [
        {
          title : "خدمة العملاء" ,
          links : [
            {title : "سياسة الاستبدال و الاسترجاع" , url : "/exchange-policies"} ,
            {title : "سياسة الشحن" , url : "/shipping-policies"} ,
            {title : "الأسئلة الأكثر شيوعا" , url : "/faqs"} ,
            {title : "الدعم و المساعدة" , url : "/contact"} ,
            {title : "تواصل معنا" , url : "/contact"} ,
          ]
        },
        {
          title : "روابط هامة" ,
          links : [
            {title : "الفروع التابعة" , url : "/contact"} ,
            {title : "قصة التوحيد و النور" , url : "/about"} ,
          ]
        },
        {
          title : "التصنيفات الأساسية" ,
          links : [
            {title : "ملابس" , url : ""} ,
            {title : "المطبخ" , url : ""} ,
            {title : "شنط" , url : ""} ,
          ]
        }
      ]

  return (

    // class : custom-dimming
    <div data-menu="sidemenu" data-status="close" data-direction="right" className=''> 
        <div className='custom-side-menu -right-full'>

            {/* sections choose */}
            {/* <div className='h-14 flex shadow text-sm'>
                <div className='bg-[#e3e3e3] border-b-[1px] border-secondarycolor w-2/4 h-full flex items-center justify-center'>القائمة</div>
                <div className='bg-[#f3f3f3] border-b-[1px] border-[#f3f3f3] w-2/4 h-full flex items-center justify-center'>التصنيفات</div>
            </div> */}

            {/* header section */}
            <section className='bg-mainbg h-14 flex justify-between items-center px-4 shadow border-b-secondarycolor border-[1px]'>
                <span>القائمة</span>
                <span data-menubutton="sidemenu" className="material-symbols-outlined hover:cursor-pointer">close</span>
            </section>

            {/* container for : lists , links , pref informations */}
            <div className='flex-1 overflow-y-auto'>
                {
                    links && links.length ? links.map((e , index) => (
                        <ListComp key={index} data={e}/>
                    )) : null
                }


                {/* links */}
                <Link to={'/search'} data-menubutton="sidemenu" className='ms-4 text-sm flex items-center gap-2 border-b-[1px] border-gray-200 py-3'>
                    <span className="material-symbols-outlined">search</span>
                    <span>بحث</span>
                </Link>

                <Link data-menubutton="sidemenu" to={'/auth/login'} className='ms-4 text-sm flex items-center gap-2 border-b-[1px] border-gray-200 py-3'>
                    <span className="material-symbols-outlined">person</span>
                    <span>دخول / تسجيل</span>
                </Link>


                {/* pref informations */}
                <PrefInfoComp/>

            </div>


        </div>
    </div>
  )
}

export default SideMenuComp