import React from 'react'
import { LargeSpinnerComp } from './SpinnerComp'
import { useSelector } from 'react-redux'

const LoadingComp = () => {
  const auth = useSelector(state => state.AuthReducer)
  const setting = useSelector(state => state.SettingReducer)
  const permission = useSelector(state => state.PermissionReducer)
  const category = useSelector(state => state.CategoryReducer)
  const product = useSelector(state => state.ProductReducer)
  const product_List = useSelector(state => state.ProductListReducer)
  return (
    <>
      {
        setting.page_loading || 
        ['lg'].includes(auth.status) || 
        permission.status != "n"  ||
        category.status != "n"  ||
        product.status != 'n' ||
        product_List.status != 'n' 
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