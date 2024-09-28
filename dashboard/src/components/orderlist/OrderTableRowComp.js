import React, { useState } from 'react'
import { formattingOrderStatus } from '../../validation/OrderValidation'
import { formattingDateForUpdate } from '../../validation/Validation'

const OrderTableRowComp = ({data}) => {
    const [edit , setEdit] = useState(null)
    
  return (
    <div className='custom-tablerow'>
        <p onMouseEnter={() => setEdit(data.id)} onMouseLeave={() => setEdit(null)} className='w-10 justify-center sticky right-0 bg-mainbg'>
            {
                edit == data.id ? <span className="material-symbols-outlined text-blue-500 text-3xl">edit</span> : data.id
            }
        </p>
        <p className='w-40 justify-center'>{data.cart_total}</p>
        <p className='w-40 justify-center'>{formattingOrderStatus(data.status)}</p>
        <p className='w-40 '>{data.user?.name}</p>
        <p className='w-40 justify-center'>{data.user?.phone}</p>
        <p className='w-40 '>{data.address?.address}</p>
        <p className='w-40 '>{data.store_address?.address}</p>
        <p className='w-40 justify-center'>{formattingDateForUpdate(data.updated_at)}</p>
        <p className='w-40 justify-center'>{formattingDateForUpdate(data.created_at)}</p>
        <p className='w-10 justify-center'><span className="material-symbols-outlined hover:text-red-500">delete</span></p>
    </div>
  )
}

export default OrderTableRowComp