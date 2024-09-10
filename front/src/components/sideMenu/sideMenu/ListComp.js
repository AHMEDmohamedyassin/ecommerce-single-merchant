import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ListComp = ({data}) => {
  return (
    <div data-animation="collabsecontainer" className='ps-4 text-sm hover:cursor-pointer select-none'>
        <div className='flex justify-between items-center border-b-[1px] border-gray-200 py-1'>
            <p className='text-sm'>{data.title}</p>
            <div className='flex items-center px-4 gap-4'>
                <div className='h-10 w-[1px] bg-gray-200'></div>
                <span data-animation="collabseicon" className="material-symbols-outlined hidden">remove</span> 
                <span data-animation="collabseicon" className="material-symbols-outlined">add</span>
            </div>
        </div>

        {/* internal lists */}
        <ul data-animation="collabsedata" style={{display:"none"}} className='flex flex-col ps-4 text-gray-500'>
            {
              data.links && data.links.length ? data.links.map((e , index) => (
                <li key={index} data-menubutton="sidemenu" className='py-3 border-b-[1px] border-gray-200'>
                  <Link to={e.url}>{e.title}</Link>
                </li>
              )) : null
            }
        </ul>
    </div>
  )
}

export default ListComp