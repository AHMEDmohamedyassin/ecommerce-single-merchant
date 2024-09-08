import React from 'react'
import { Link } from 'react-router-dom'

const PathComp = () => {
  return (
    <div className='flex items-center text-[12px] select-none mb-6'>

        <Link to={'/'}>الرئيسية</Link>

        <Link to={'/search'} className='flex items-center'> 
          <span className="material-symbols-outlined text-xl">chevron_left</span>  
          <span>ملابس رجالي</span>
        </Link>

        <div className='flex items-center text-gray-500'> 
          <span className="material-symbols-outlined text-xl">chevron_left</span>  
          <span>لنطلون رجالي</span>
        </div>

    </div>
  )
}

export default PathComp