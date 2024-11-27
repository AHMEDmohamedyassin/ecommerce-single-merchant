import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SocialMediaComp from './SocialMediaComp'

const CollabseSocialMediaComp = () => {
    const [details , setDetails] = useState(false)
  return (
          <div onClick={() => setDetails(!details)} className=' hover:cursor-pointer'>
            <div className='flex justify-between items-center bg-gray-800'>
              <p className='py-2 px-4 text-sm font-semibold'>تابعنا الآن لمعرفة كافة العروض والخصومات الجديدة</p>
              {/* <span data-animation="collabseicon" className="hidden material-symbols-outlined  text-white p-2 py-2">remove</span> */}
              {/* <span data-animation="collabseicon" className="material-symbols-outlined  text-white p-2 py-2">add</span> */}
            </div>
            
            <ul data-animation="collabsedata" className='flex p-4 flex-col gap-4'>
                <SocialMediaComp/>
            </ul>
          </div>
  )
}

export default CollabseSocialMediaComp