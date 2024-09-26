import React from 'react'
import { useSelector } from 'react-redux'

const ProductDetailsComp = () => {
    const state = useSelector(state => state.ProductReducer)
  return (
    <div className='grid lg:grid-cols-4 sm:grid-cols-2 gap-4 mb-10'>
        <div className='flex items-center gap-2 text-sm'>
            <p className='text-gray-500'>متوسط التقييمات : </p>
            <p>5 / {state.ratting}</p>
        </div>
        <div className='flex items-center gap-2 text-sm'>
            <p className='text-gray-500'>عدد المشاهدات : </p>
            <p>{String(state.views).padStart(4 , '0')}</p>
        </div>
        <div className='flex items-center gap-2 text-sm'>
            <p className='text-gray-500'>عدد المراجعات :</p>
            <p>{String(state.reviews).padStart(4 , '0')}</p>
        </div>
        <div className='flex items-center gap-2 text-sm'>
            <p className='text-gray-500'>عدد المبيعات : </p>
            <p>{String(state.paid_quantity).padStart(2 , '0')}</p>
        </div>
    </div>
  )
}

export default ProductDetailsComp