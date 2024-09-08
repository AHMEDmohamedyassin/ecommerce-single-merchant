import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CollabseLinksComp = () => {
    const [details , setDetails] = useState(false)
  return (
          <div onClick={() => setDetails(!details)} className=' hover:cursor-pointer'>
            <div className='flex justify-between items-center bg-gray-800'>
              <p className='py-2 px-4 text-sm font-semibold'>وصف المنتج</p>
              {
                details ? 
                    <span className="material-symbols-outlined  text-white p-2 py-2">remove</span>
                :
                    <span className="material-symbols-outlined  text-white p-2 py-2">add</span>
              }
            </div>

            {
                details ? (
                    <ul className='text-xs text-white p-4 flex flex-col gap-4'>
                        <Link to="/">سياسة الاستبدال والاسترجاع</Link>
                        <Link to="/">سياسة الشحن</Link>
                        <Link to="/">الدعم والمساعدة</Link>
                        <Link to="/">تواصل معنا</Link>
                        <Link to="/">الأسئلة الأكثر شيوعاً</Link>
                    </ul>
                ) : null
            }
          </div>
  )
}


export default CollabseLinksComp