import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const SelectionComp = () => {
    const [open , setOpen] = useState(false)
    const [selected , setSelected] = useState(0)
    const [searchParams, setSearchParams] = useSearchParams();

    // order options 
    const sortOptions = [
        {
            title : "من الأحدث إلي الأقدم" ,
            order : "desc" , 
            orderby : "id"
        },
        {
            title : "من الأقدم إلي الأحدث" ,
            order : "asc" , 
            orderby : "id"
        },
    ]
    
    // handle order function 
    const handleOrder = (index) => {
        const {orderby , order} = sortOptions[index]

        const newSearchParams = new URLSearchParams(searchParams);
        
        newSearchParams.set('orderby', orderby)
        newSearchParams.set('order', order)

        setSearchParams(newSearchParams);
    
        setOpen(false)
        setSelected(index)
    }

  return (
        <div className='relative w-fit z-10'>
            <button onClick={() => setOpen(!open)} className='flex justify-between items-center bg-secondarybg custom-border p-2 px-4 w-56 rounded-full text-sm select-none'>
                <span>{sortOptions[selected]?.title ?? ""}</span>
                <span style={{rotate:open ? '180deg' : '0deg'}} className="material-symbols-outlined">keyboard_arrow_down</span>
            </button>

            {/* options */}
            {
                open ? (
                    <div className='absolute top-[110%] left-2/4 w-[80%] -translate-x-2/4 bg-secondarybg rounded shadow'>
                        {
                            sortOptions.map((e , index) => (
                                <button key={index} onClick={() => handleOrder(index)} className={`w-full text-xs text-center py-4 ${selected == index ? "bg-secondarycolor/20 text-secondarycolor font-bold" : ""}`}>{e.title}</button>
                            ))
                        }
                    </div>
                ) : null
            }
        </div>
  )
}

export default SelectionComp