import React from 'react'
import { LargeSpinnerComp } from './SpinnerComp'
import { useSelector } from 'react-redux'

const LoadingComp = () => {
  const auth = useSelector(state => state.AuthReducer)
  const setting = useSelector(state => state.SettingReducer)
  const product_list = useSelector(state => state.ProductListReducer)
  return (
    <>
      {
        setting.page_loading || 
        ['ll' , 'lg' , "lr" , "lpr" , "lud"].includes(auth.status)  ||
        product_list.status != 'n'
        ? (
          <div className='fixed top-0 left-0 w-full h-full bg-white/50 flex justify-center items-center z-50'>
              <LargeSpinnerComp/>
          </div>
        ) : null
      }
    </>
  )
}

export default LoadingComp