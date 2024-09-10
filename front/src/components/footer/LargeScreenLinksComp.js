import React from 'react'
import { Link } from 'react-router-dom'
import SocialMediaComp from './SocialMediaComp'

const LargeScreenLinksComp = ({links}) => {
  return (
        <section className='max-sm:hidden custom-container grid lg:grid-cols-4 grid-cols-2 py-20 gap-10'>
            

            {/* urls component  */}
            {
                links && links.length ? links.map((e , index) => (
                    <div key={index} className='text-xs flex flex-col gap-10'>
                        <p>{e.title}</p>
                        <ul className='flex flex-col gap-4'>
                            {
                                e.links && e.links.length ? e.links.map((ele , i) => (
                                    <Link key={i} className='hover:text-maincolor' to={ele.url}>{ele.title}</Link>
                                )) : null
                            }
                        </ul>
                    </div>
                )) : null 
            }


            {/* social media component */}
            <div className='text-xs flex flex-col gap-10'>
                <p>تابعنا لمعرفة كافة العروض و التخفيضات</p>
                <SocialMediaComp/>
            </div>


        </section>
  )
}

export default LargeScreenLinksComp