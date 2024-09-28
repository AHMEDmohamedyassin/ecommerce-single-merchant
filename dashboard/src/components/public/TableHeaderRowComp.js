import React from 'react'
import { useSelector } from 'react-redux'

const TableHeaderRowComp = ({handleOrder , title , value , w , className , state}) => {

  return (
    <p onClick={() => handleOrder(value)} className={`${state.orderby == value ? 'bg-maincolor text-mainbg' : "bg-mainbg" } w-${w} ${className} hover:cursor-pointer hover:bg-maincolor hover:text-mainbg`} title={title}>
      <span className='select-none'>{title}</span>
      {
        state.orderby == value && state.order == 'desc' ? (
          <span class="material-symbols-outlined text-xl">arrow_upward</span>
        ) : state.orderby == value && state.order == 'asc' ? (
          <span class="material-symbols-outlined text-xl">arrow_downward</span>
        ) : null
      }
    </p>
  )
}

export default TableHeaderRowComp