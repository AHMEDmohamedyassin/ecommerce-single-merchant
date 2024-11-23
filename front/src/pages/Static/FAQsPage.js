import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Static_ReadAction } from '../../redux/action/StaticAction'
import 'scripts/faqsScript'

const FAQsPage = () => {
  const state = useSelector(state => state.StaticReducer)
  const dispatch = useDispatch()
  const [opened , setOpened] = useState(0)


  useEffect(() => {
    dispatch(Static_ReadAction('faq'))
  } , [])
  return (
    <div className='custom-container flex flex-col gap-4'>

      
      {/* question */}
      {
        state.faq?.questions?.map((e , index) => (
          <div key={index} onClick={() => setOpened(index)} className='custom-border shadow'>
            <div data-animation="question" className=' select-none bg-secondarybg flex justify-between items-center py-2 px-6 text-sm'>
              <p>{e.question}</p>
              <div data-animation="iconcontainer" className='flex items-center justify-center w-10 aspect-square rounded-full bg-secondarycolor text-secondarybg'>
                <span data-animation="inactiveicon" className="material-symbols-outlined text-3xl">add</span>
                <span data-animation="activeicon" className="hidden material-symbols-outlined">remove</span>
              </div>
            </div>
            
            <p className={`${opened != index ? 'hidden' : ""} text-sm text-gray-500 px-6 py-4 bg-secondarybg shadow-sm`}>{e.answer}</p>
          </div>
        ))
      }


    </div>
  )
}

export default FAQsPage