import React from 'react'
import { Link } from 'react-router-dom'

const SocialMediaComp = () => {
  return (
    <>
        <Link to={'/auth/login'} className='custom-button bg-white text-black text-center w-fit hover:bg-maincolor border-transparent hover:text-white'>تسجيل الدخول</Link>
        <ul className='flex gap-4'>
            <a className='w-10 rounded-full aspect-square overflow-hidden' href='www.facebook.com' target='_blank'><img loading='lazy' src='/facebook.png'/></a>
            <a className='w-10 rounded-full aspect-square overflow-hidden' href='www.facebook.com' target='_blank'><img loading='lazy' src='/facebook.png'/></a>
            <a className='w-10 rounded-full aspect-square overflow-hidden' href='www.facebook.com' target='_blank'><img loading='lazy' src='/facebook.png'/></a>
        </ul>            
    </>
  )
}

export default SocialMediaComp