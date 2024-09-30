import React from 'react'
import { Link } from 'react-router-dom'

const HeaderComp = () => {
  return (
    <div className='z-20 w-full bg-maincolor text-secondarybg fixed top-0 left-0'>
        <div className='custom-container flex items-center justify-between py-4 font-bold'>
            <Link to={'/'}>لوحة التحكم</Link>
        </div>
    </div>
  )
}

export default HeaderComp