import React from 'react'
import OrderTableHeaderComp from './OrderTableHeaderComp'
import OrderTableRowComp from './OrderTableRowComp'
import { useDispatch, useSelector } from 'react-redux'

const OrderTableComp = () => {
    const state = useSelector(state => state.OrderListReducer)
    const dispatch = useDispatch()

  return (
        <div className='custom-table'>
            <OrderTableHeaderComp/>
            {
                state.items?.map((e,index) => (
                    <OrderTableRowComp key={index} data={e}/>
                ))
            }
        </div>
  )
}

export default OrderTableComp