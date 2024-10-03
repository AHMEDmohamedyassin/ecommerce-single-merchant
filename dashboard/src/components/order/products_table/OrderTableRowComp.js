import { ImageURL } from 'Fetch/Url'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Order_ChangeCountAction } from '../../../redux/action/OrderAction'

const OrderTableRowComp = ({data}) => {
    const dispatch = useDispatch()

    // adding or subtracting count of products or assign direct count
    const handleCount = (add = true , value = null) => {
        let the_count = 0;

        if(add)       // adding or remove one step
            the_count = data.count + 1
        else the_count = data.count - 1

        if(value !== null)      // directly assign value
            the_count = value

        return dispatch(Order_ChangeCountAction(data.id , parseInt(the_count)))
    }

  return (
        <div className='custom-tablerow'>
            <p className='w-10 justify-center'><span onClick={() => handleCount(true , 0)} className="material-symbols-outlined hover:text-red-500">close</span></p>
            <p className='w-20'><img className='w-full h-full object-cover' src={`${ImageURL}?type=product&id=${data.collection_id}&width=200`} loading='lazy'/></p>
            <p className='w-80'>{data.title}</p>
            <p className='w-40 justify-center'>
                <span onClick={handleCount} class="material-symbols-outlined hover:text-blue-500">add</span>
                <input onChange={e => handleCount(true , e.target.value)} type='number' className='custom-border text-center rounded w-20' value={data.count} />
                <span onClick={() => handleCount(false)} className="material-symbols-outlined hover:text-red-500">remove</span>
            </p>
            <p className='w-40 justify-center'>{data.price}</p>
            <p className='w-40 justify-center'>{data.price * data.count}</p>
        </div>
  )
}

export default OrderTableRowComp