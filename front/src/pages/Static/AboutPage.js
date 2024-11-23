import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Static_ReadAction } from '../../redux/action/StaticAction'

const AboutPage = () => {
  const state = useSelector(state => state.StaticReducer.about)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(Static_ReadAction('about'))
  } , []) 
  return (
    <div className='custom-container'>
      <p className='text-center font-bold sm:text-lg text-sm sm:px-10 mb-10'>معلومات عنا</p>

      <div className='flex flex-col gap-4'>

        {
          state?.content ? state.content.map((e, index) => (
            <div key={index} className='flex flex-col gap-2 bg-secondarybg shadow custom-border p-4'>
              <p>{e.title}</p>
              <p className='text-sm text-gray-500 font-semibold'>{e.value} </p>
            </div>
          ))  : <p className='mx-auto text-gray-500'>لم يتم التحديد</p>
        }

      </div>
    </div>
  )
}

export default AboutPage