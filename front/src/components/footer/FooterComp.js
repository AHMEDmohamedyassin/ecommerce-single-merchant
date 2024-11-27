import React from 'react'
import { Link } from 'react-router-dom'
import LargeScreenLinksComp from './LargeScreenLinksComp'
import CollabseLinksComp from './CollabseLinksComp'
import CollabseSocialMediaComp from './CollabseSocialMediaComp'

const FooterComp = () => {

  const links = [
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
    <div className=' w-full bg-black text-white mt-20'>

        {/* large screen links section */}
        <LargeScreenLinksComp links={links}/>


        {/* small screen links section */}
        <section className='sm:hidden custom-container flex flex-col lg:py-20 pt-20 pb-6 gap-10'>
            {
              links && links.length ? links.map((e , index) => (
                <CollabseLinksComp key={index} data={e}/>
              )) : null
            }

            <CollabseSocialMediaComp/>
        </section>

        <section className='bg-gray-800 w-full  text-center text-xs flex'><a className='py-4 w-full text-center' href='https://mobarmeg.vercel.app/' target='_blank'>{window.globalConfig?.APP_AR_NAME} © 2024. تطوير " Mobarmeg,المبرمج "</a></section>
    </div>
  )
}

export default FooterComp