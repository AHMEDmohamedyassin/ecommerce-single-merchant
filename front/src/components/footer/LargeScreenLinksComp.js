import React from 'react'
import { Link } from 'react-router-dom'
import SocialMediaComp from './SocialMediaComp'

const LargeScreenLinksComp = () => {
  return (
        <section className='max-sm:hidden custom-container grid lg:grid-cols-4 grid-cols-2 py-20 gap-10'>

            <div className='text-xs flex flex-col gap-10'>
                <p>خدمة العملاء</p>
                <ul className='flex flex-col gap-4'>
                    <Link to="/">سياسة الاستبدال والاسترجاع</Link>
                    <Link to="/">سياسة الشحن</Link>
                    <Link to="/">الدعم والمساعدة</Link>
                    <Link to="/">تواصل معنا</Link>
                    <Link to="/">الأسئلة الأكثر شيوعاً</Link>
                </ul>
            </div>

            <div className='text-xs flex flex-col gap-10'>
                <p>التصنيفات الأساسية</p>
                <ul className='flex flex-col gap-4'>
                    <Link to={'/'}>ملابس</Link>
                    <Link to={'/'}>المطبخ</Link>
                    <Link to={'/'}>شنط</Link>
                    <Link to={'/'}>ادوات منزلية</Link>
                    <Link to={'/'}>لعب اطفال</Link>
                    <Link to={'/'}>اكسسوارات</Link>
                    <Link to={'/'}>مستلزمات البيبي</Link>
                </ul>
            </div>

            <div className='text-xs flex flex-col gap-10'>
                <p>التصنيفات الأساسية</p>
                <ul className='flex flex-col gap-4'>
                    <Link to={'/'}>ملابس</Link>
                    <Link to={'/'}>المطبخ</Link>
                    <Link to={'/'}>شنط</Link>
                    <Link to={'/'}>ادوات منزلية</Link>
                    <Link to={'/'}>لعب اطفال</Link>
                    <Link to={'/'}>اكسسوارات</Link>
                    <Link to={'/'}>مستلزمات البيبي</Link>
                </ul>
            </div>


            {/* social media component */}
            <div className='text-xs flex flex-col gap-10'>
                <p>تابعنا لمعرفة كافة العروض و التخفيضات</p>
                <SocialMediaComp/>
            </div>


        </section>
  )
}

export default LargeScreenLinksComp