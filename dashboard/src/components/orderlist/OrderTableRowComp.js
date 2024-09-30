import React, { useState } from 'react'
import { formattingOrderStatus } from '../../validation/OrderValidation'
import { formattingDateForUpdate } from '../../validation/Validation'
import { useDispatch } from 'react-redux'
import { OrderList_StatusAction } from '../../redux/action/OrderListAction'
import { Link } from 'react-router-dom'

const OrderTableRowComp = ({data}) => {
  const dispatch = useDispatch()
    const [edit , setEdit] = useState(null)

    // handle deleting
    const handleStatusChange = (status) => {
      dispatch(OrderList_StatusAction({status , id : data.id}))
    }

  return (
    <div className='custom-tablerow'>
        <p onMouseEnter={() => setEdit(data.id)} onMouseLeave={() => setEdit(null)} className='w-10 justify-center sticky right-0 bg-mainbg'>
            {
                edit == data.id ? <Link to={`/order/review/${data.id}`}> <span className="material-symbols-outlined text-blue-500 text-3xl">visibility</span></Link> : data.id
            }
        </p>
        <p className='w-40 justify-center'>{data.cart_total}</p>
        {/* status review and changing  */}
        <p className='w-40 justify-center'>
          <select onChange={e => handleStatusChange(e.target.value)} value={data.status} className='h-full w-full'>
              <option value={"pending"}>{formattingOrderStatus("pending")}</option>
              <option value={"ready"}>{formattingOrderStatus("ready")}</option>
              <option value={"preparing"}>{formattingOrderStatus("preparing")}</option>
              <option value={"success"}>{formattingOrderStatus("success")}</option>
              <option value={"canceled"}>{formattingOrderStatus("canceled")}</option>
              <option value={"canceled without refund"}>{formattingOrderStatus("canceled without refund")}</option>
          </select>
        </p>
        <p className='w-40 '>{data.user?.name}</p>
        <p className='w-40 justify-center'>{data.user?.phone}</p>
        <p className='w-40 '>{data.address?.address}</p>
        <p className='w-40 '>{data.store_address?.address}</p>
        <p className='w-40 justify-center'>{formattingDateForUpdate(data.updated_at)}</p>
        <p className='w-40 justify-center'>{formattingDateForUpdate(data.created_at)}</p>
    </div>
  )
}

export default OrderTableRowComp