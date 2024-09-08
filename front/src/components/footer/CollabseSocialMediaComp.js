import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SocialMediaComp from './SocialMediaComp'

const CollabseSocialMediaComp = () => {
    const [details , setDetails] = useState(false)
  return (
          <div onClick={() => setDetails(!details)} className=' hover:cursor-pointer'>
            <div className='flex justify-between items-center bg-gray-800'>
              <p className='py-2 px-4 text-sm font-semibold'>تابعنا الآن لمعرفة كافة العروض والخصومات الجديدة</p>
              {
                details ? 
                    <span className="material-symbols-outlined  text-white p-2 py-2">remove</span>
                :
                    <span className="material-symbols-outlined  text-white p-2 py-2">add</span>
              }
            </div>

            {
                details ? (
                    <div className='p-4 flex flex-col gap-4'>
                        <SocialMediaComp/>
                    </div>
                ) : null
            }
          </div>
  )
}

export default CollabseSocialMediaComp