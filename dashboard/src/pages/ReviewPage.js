import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Review_ListAction } from '../redux/action/ReviewAction'
import ReviewTableComp from 'components/review/ReviewTableComp'
import PaginationComp from 'components/public/PaginationComp'
import SearchComp from 'components/public/SearchComp'

const ReviewPage = () => {
    const state = useSelector(state => state.ReviewReducer)
    const dispatch = useDispatch()

    const handlePagination = (page = 1) => {
      dispatch(Review_ListAction({page}))
    }

    useEffect(() => {
      if(!state.items.length)
        handlePagination(1)
    } , [])
  return (
    <div className='custom-dashcontainer'>
        <p className='title'>المراجعات</p>

        {/* search form  */}
        <SearchComp state={state} placeholder={'ابحث في المراجعات'} action={Review_ListAction}/>

        {/* reviews table  */}
        <ReviewTableComp/>
        
        {/* paginate */}
        <PaginationComp state={state} handlePagination={handlePagination}/>
    </div>
  )
}

export default ReviewPage