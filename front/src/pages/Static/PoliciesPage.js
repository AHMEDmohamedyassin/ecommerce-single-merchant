import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Static_ReadAction } from '../../redux/action/StaticAction'

const PoliciesPage = () => {
  const state = useSelector(state => state.StaticReducer.policy)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(Static_ReadAction('policy'))
  } , [])
  return (
    <div className='custom-container'>
      
      {/* title of page */}
      <p className='text-center font-bold sm:text-lg text-sm sm:px-10'>في "{window.globalConfig?.APP_AR_NAME}"، نسعى دائمًا لتقديم تجربة تسوق مرضية لعملائنا. إذا لم تكن راضيًا عن مشترياتك، يمكنك
      الاستفادة من سياسة الاستبدال والاسترجاع و سياسة التوصيل لدينا وفق الشروط التالية</p>

      <div className='relative flex flex-col gap-1 bg-gray-200 p-6 sm:pe-12 pe-8 text-gray-500 font-semibold sm:text-xs italic mt-10 mb-10'>
        
        <span className='absolute top-4 left-6 sm:text-3xl text-xl'>&#x275D;</span>

        <p className='font-bold text-lg mb-4'>سياسة الإسترجاع</p>

        <div className='flex items-center gap-4'>
          <p className='aspect-square w-1 rounded-full bg-gray-500'></p>
          <p>{state?.return_policy ?? "لم يتم تحديدها"}</p>
        </div>


      </div>

      {
        state?.shipping_policy ? (
            <div className='relative flex flex-col gap-1 bg-gray-200 p-6 sm:pe-12 pe-8 text-gray-500 font-semibold sm:text-xs italic mt-10 mb-40'>
              
              <span className='absolute top-4 left-6 sm:text-3xl text-xl'>&#x275D;</span>

              <p className='font-bold text-lg mb-4'>سياسة التوصيل</p>

              <div className='flex items-center gap-4'>
                <p className='aspect-square w-1 rounded-full bg-gray-500'></p>
                <p>{state?.shipping_policy}</p>
              </div>


            </div>
        ) : null
      }

    </div>
  )
}

export default PoliciesPage