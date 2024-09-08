import React from 'react'
import { Link } from 'react-router-dom'
import LargeScreenLinksComp from './LargeScreenLinksComp'
import CollabseLinksComp from './CollabseLinksComp'
import CollabseSocialMediaComp from './CollabseSocialMediaComp'

const FooterComp = () => {
  return (
    <div className='w-full bg-black text-white mt-20'>

        {/* large screen links section */}
        <LargeScreenLinksComp/>


        {/* small screen links section */}
        <section className='sm:hidden custom-container flex flex-col py-20 gap-10'>
            <CollabseLinksComp/>
            <CollabseLinksComp/>
            <CollabseSocialMediaComp/>
        </section>

        <section className='bg-gray-800 w-full py-4 text-center text-xs'>التوحيد والنور © 2024. تطوير KMPN Agency</section>
    </div>
  )
}

export default FooterComp