import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Review_ReviewReadAction } from '../../redux/action/ReviewAction'
import { formattingDateForUpdate } from '../../validations/Validation'

const ReviewsListComp = () => {
  const state = useSelector(state => state.ReviewReducer)
  const product = useSelector(state => state.ProductReducer)
  const dispatch = useDispatch()

  const loadMore = () => {
    dispatch(Review_ReviewReadAction(state.current + 1 , 3))
  }

  useEffect(() => {
    dispatch(Review_ReviewReadAction(1 , 3))
  } , [product.id])

  return (
    <>
      {
        state.items?.length ? (
          <div className='custom-productsection'>
            <p className='font-bold  text-gray-500 text-sm'>المراجعات السابقة : </p>
            {/* reviews lists  */}
              {
                state.items?.map(e => (
                  <div key={e.id} className='custom-border py-6 border-x-0 border-t-0'>
                      <div className='flex items-center  gap-x-2  flex-wrap'>
                          <h1 className='text-sm font-bold'>{e.user?.name}</h1>

                          <div className=''>
                              {
                                e.ratting && Array(e.ratting).fill(0).map((star , index) => (
                                  <span key={index} className="material-symbols-outlined fill text-yellow-500 text-lg">star</span>
                                ))
                              }
                              {
                                e.ratting && Array(5 - e.ratting ).fill(0).map((star , index) => (
                                  <span key={index} className="material-symbols-outlined text-gray-300 text-lg">star</span>
                                ))
                              }
                          </div>

                          <div className='text-sm font-bold text-gray-500'>{e.ratting}</div>

                          <div className='w-full text-sm text-gray-500'>{e.created_at ? formattingDateForUpdate(e.created_at) : null}</div>
                      </div>

                      <p className='text-sm font-semibold text-gray-500 mt-4'>{e.comment}</p>
                  </div>
                ))
              }

              {/* loading more button  */}
              <button disabled={!state.hasMore} onClick={loadMore} className='flex items-center justify-center gap-1 mx-auto mt-4 disabled:text-gray-300 disabled:cursor-not-allowed'>
                <span>المزيد</span>
                <span className="material-symbols-outlined">arrow_drop_down</span>
              </button>
          </div>
          
        ) : null
      }
    </>
  )
}

export default ReviewsListComp