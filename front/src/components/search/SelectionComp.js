import React, { useState } from 'react'

const SelectionComp = () => {
    const [open , setOpen] = useState(false)
  return (
        <div className='relative w-fit '>
            <button onClick={() => setOpen(!open)} className='flex justify-between items-center bg-secondarybg custom-border p-2 px-4 w-56 rounded-full text-sm select-none'>
                <span>السعر من الأقل إلي الأعلي</span>
                <span style={{rotate:open ? '180deg' : '0deg'}} className="material-symbols-outlined">keyboard_arrow_down</span>
            </button>

            {/* options */}
            {
                open ? (
                    <div className='absolute top-[110%] left-2/4 w-[80%] -translate-x-2/4 bg-secondarybg rounded shadow'>
                        <button className='w-full text-xs text-center py-4 bg-secondarycolor/20 text-secondarycolor font-bold'>السعر من أعلي إلي الأقل</button>
                        <button className='w-full text-xs text-center py-4'>السعر من الأقل إلي الأعلي</button>
                        <button className='w-full text-xs text-center py-4'>تاريخ النشر</button>
                    </div>
                ) : null
            }
        </div>
  )
}

export default SelectionComp