import React from 'react'
import { Link } from 'react-router-dom'

const StaticPagesNavComp = () => {
  return (
    <div className='mt-20'>
        <p className='text-sm text-gray-500 mb-2 font-bold'>الصفحات الثابته</p>
        <div className='flex gap-4 flex-wrap'>
            <Link to={'/about'} className='custom-button'>معلومات عنا</Link>
            <Link to={'/contact'} className='custom-button'>تواصل معنا</Link>
            <Link to={'/faq'} className='custom-button'>الأسئلة الأكثر شيوعا</Link>
            <Link to={'/policy'} className='custom-button'>السياسات</Link>
        </div>
    </div>
  )
}

export default StaticPagesNavComp