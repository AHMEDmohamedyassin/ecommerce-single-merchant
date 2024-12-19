import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Setting_CacheResetAction } from '../../redux/action/SettingAction'

const StaticPagesNavComp = () => {
  const dispatch = useDispatch()

  const handleCacheReset = () => {
    dispatch(Setting_CacheResetAction())
  }
  return (
    <div className='mt-20'>
        <p className='text-sm text-gray-500 mb-2 font-bold'>الصفحات الثابته</p>
        <div className='flex gap-4 flex-wrap'>
            <Link to={'/identity'} className='custom-button'>الشعار</Link>
            <Link to={'/about'} className='custom-button'>معلومات عنا</Link>
            <Link to={'/contact'} className='custom-button'>تواصل معنا</Link>
            <Link to={'/faq'} className='custom-button'>الأسئلة الأكثر شيوعا</Link>
            <Link to={'/policy'} className='custom-button'>السياسات</Link>
            <Link to={'/setting'} className='custom-button'>الإعدادات</Link>
            <button onClick={handleCacheReset} className='custom-button2'>cache reset</button>
        </div>
    </div>
  )
}

export default StaticPagesNavComp