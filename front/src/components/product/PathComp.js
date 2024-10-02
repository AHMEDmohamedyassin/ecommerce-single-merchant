import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const PathComp = () => {
  const state = useSelector(state => state.ProductReducer)
  return (
    <div className='flex items-center text-[12px] select-none mb-6'>

        <Link to={'/'}>الرئيسية</Link>

        {
          state.category[0] ? (
          <Link to={'/search'} className='flex items-center'> 
            <span className="material-symbols-outlined text-xl">chevron_left</span>  
            <span className=' whitespace-nowrap'>{state.category[0].title}</span>
          </Link>
          ) : null
        }

        <div className='flex items-center text-gray-500'> 
          <span className="material-symbols-outlined text-xl">chevron_left</span>  
          <span>{state.title?.slice(0 , 40)}</span>
        </div>

    </div>
  )
}

export default PathComp