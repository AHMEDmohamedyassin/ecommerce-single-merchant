import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { User_DetailAction } from '../../../redux/action/UserAction'

const PaginationComp = () => {
    const state = useSelector(state => state.UserReducer)
    const dispatch = useDispatch()

    // handle pagination
    const paginateHandle = (page = 1) => {
        dispatch(User_DetailAction(state.detail , page))
    }
  return (
    <>
      {
        state.detail?.length && state[state.detail]?.total ? (
          <div className='flex items-center gap-4 mx-auto w-fit'>
            <button disabled={state[state.detail]?.current < 2} onClick={() => paginateHandle(state[state.detail]?.current - 1)} className='custom-button'>السابق</button>
            <div className='flex items-center gap-2'>
              <p>{state[state.detail]?.current}</p>
              <p>/</p>
              <p>{state[state.detail]?.last}</p>
            </div>
            <button disabled={state[state.detail]?.current >= state[state.detail]?.last } onClick={() => paginateHandle(state[state.detail]?.current + 1)} className='custom-button'>التالي</button>
          </div>
        )  : null
      }
    </>
  )
}

export default PaginationComp