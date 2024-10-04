import React, { useState } from 'react'

const CollabsedDetailsComp = ({title , data}) => {
    const [details , setDetails] = useState(false)
  return (
          <div onClick={() => setDetails(!details)} className='custom-border border-[1px] hover:cursor-pointer'>
            <div className='flex justify-between items-center bg-gray-100'>
              <p className='py-2 px-4 text-sm font-semibold'>{title}</p>
              {
                details ? 
                    <span className="material-symbols-outlined bg-black text-white p-2 py-2">remove</span>
                :
                    <span className="material-symbols-outlined bg-black text-white p-2 py-2">add</span>
              }
            </div>

            {
                details ? (
                    <div className='text-sm text-gray-500 text-justify p-4'>{data ?? <p >لا توجد</p>}</div>
                ) : null
            }
          </div>
  )
}

export default CollabsedDetailsComp