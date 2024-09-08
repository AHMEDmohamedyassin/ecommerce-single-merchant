import React, { useState } from 'react'

const ListComp = () => {
    const [isOpen , setIsOpen] = useState(false)
  return (
    <div onClick={() => setIsOpen(!isOpen)} className='ps-4 text-sm hover:cursor-pointer select-none'>
        <div className='flex justify-between items-center border-b-[1px] border-gray-200 py-1'>
            <p className='text-sm'>كل الأقسام</p>
            <div className='flex items-center px-4 gap-4'>
                <div className='h-10 w-[1px] bg-gray-200'></div>
                {
                    isOpen ? 
                    <span className="material-symbols-outlined">remove</span> :
                    <span className="material-symbols-outlined">add</span>
                }
            </div>
        </div>

        {/* internal lists */}
        <ul style={{display:isOpen ? 'flex' : 'none'}} className='flex flex-col ps-4 text-gray-500'>
            <li className='py-3 border-b-[1px] border-gray-200'>ملابس</li>
            <li className='py-3 border-b-[1px] border-gray-200'>ملابس</li>
            <li className='py-3 border-b-[1px] border-gray-200'>ملابس</li>
            <li className='py-3 border-b-[1px] border-gray-200'>ملابس</li>
            <li className='py-3 border-b-[1px] border-gray-200'>ملابس</li>
            <li className='py-3 border-b-[1px] border-gray-200'>ملابس</li>
        </ul>
    </div>
  )
}

export default ListComp