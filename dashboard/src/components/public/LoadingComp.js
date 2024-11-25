import React from 'react'
import { LargeSpinnerComp } from './SpinnerComp'
import { useSelector } from 'react-redux'

const LoadingComp = () => {
  const state = useSelector(state => state)
  return (
    <>
      {
        state.SettingReducer?.page_loading || 
        Object.values(state).filter(reducer => reducer.status != 'n')?.length 
        ? (
          <div className='z-50 fixed top-0 left-0 w-full h-full bg-white/50 flex justify-center items-center'>
              <LargeSpinnerComp/>
          </div>
        ) : null
      }
    </>
  )
}

export default LoadingComp