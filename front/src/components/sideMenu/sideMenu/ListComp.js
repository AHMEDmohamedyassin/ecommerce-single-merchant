import React, { useState } from 'react'

const ListComp = () => {
  return (
    <div data-animation="collabsecontainer" className='ps-4 text-sm hover:cursor-pointer select-none'>
        <div className='flex justify-between items-center border-b-[1px] border-gray-200 py-1'>
            <p className='text-sm'>كل الأقسام</p>
            <div className='flex items-center px-4 gap-4'>
                <div className='h-10 w-[1px] bg-gray-200'></div>
                <span data-animation="collabseicon" className="material-symbols-outlined hidden">remove</span> 
                <span data-animation="collabseicon" className="material-symbols-outlined">add</span>
            </div>
        </div>

        {/* internal lists */}
        <ul data-animation="collabsedata" style={{display:"none"}} className='flex flex-col ps-4 text-gray-500'>
            <li data-menubutton="sidemenu" className='py-3 border-b-[1px] border-gray-200'>ملابس</li>
            <li data-menubutton="sidemenu" className='py-3 border-b-[1px] border-gray-200'>ملابس</li>
            <li data-menubutton="sidemenu" className='py-3 border-b-[1px] border-gray-200'>ملابس</li>
            <li data-menubutton="sidemenu" className='py-3 border-b-[1px] border-gray-200'>ملابس</li>
            <li data-menubutton="sidemenu" className='py-3 border-b-[1px] border-gray-200'>ملابس</li>
            <li data-menubutton="sidemenu" className='py-3 border-b-[1px] border-gray-200'>ملابس</li>
        </ul>
    </div>
  )
}

export default ListComp