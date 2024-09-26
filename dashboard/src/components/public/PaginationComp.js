import React from 'react'

const PaginationComp = ({state , handlePagination}) => {
  return (
      <div className='flex items-center gap-4 mx-auto w-fit'>
        <button disabled={state.current < 2} onClick={() => handlePagination(state.current - 1)} className='custom-button'>السابق</button>
        <div className='flex items-center gap-2'>
          <p>{state.current}</p>
          <p>/</p>
          <p>{state.last}</p>
        </div>
        <button disabled={state.current >= state.last } onClick={() => handlePagination(state.current + 1)} className='custom-button'>التالي</button>
      </div>
  )
}

export default PaginationComp