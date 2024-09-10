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
    <div className='w-full bg-black text-white mt-20'>

        {/* large screen links section */}
        <LargeScreenLinksComp links={links}/>


        {/* small screen links section */}
        <section className='sm:hidden custom-container flex flex-col py-20 gap-10'>
            {
              links && links.length ? links.map((e , index) => (
                <CollabseLinksComp key={index} data={e}/>
              )) : null
            }
            <CollabseSocialMediaComp/>
        </section>

        <section className='bg-gray-800 w-full py-4 text-center text-xs'>التوحيد والنور © 2024. تطوير KMPN Agency</section>
    </div>
  )
}

export default FooterComp