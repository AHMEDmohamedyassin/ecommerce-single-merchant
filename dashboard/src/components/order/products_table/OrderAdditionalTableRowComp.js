import React from 'react'
import { ImageURL } from 'Fetch/Url'
import { useDispatch } from 'react-redux'
import { Order_AdditionalUpdateAction} from '../../../redux/action/OrderAction'

const OrderAdditionalTableRowComp = ({data}) => {
    const dispatch = useDispatch()

    // adding or subtracting count of products or assign direct count
    const handleChange = (change) => {
        console.log(change , data)
        dispatch(Order_AdditionalUpdateAction({...data , ...change}))
    }

  return (
        <div className='custom-tablerow'>
            <p className='w-10 justify-center'><span onClick={() => handleChange({quantity : 0})} className="material-symbols-outlined hover:text-red-500">close</span></p>
            <p className='w-20'><img className='w-full h-full object-cover' src={`${ImageURL}`} loading='lazy'/></p>
            <p className='w-80'>
                <input onChange={e => handleChange({title : e.target.value})} value={data.title} className='w-full h-full' />
            </p>
            <p className='w-40 justify-center'>
                <span onClick={() => handleChange({quantity : data.quantity + 1})} class="material-symbols-outlined hover:text-blue-500">add</span>
                <input onChange={e => handleChange({quantity : parseInt(e.target.value)})} type='number' className='custom-border text-center rounded w-20' value={data.quantity} />
                <span onClick={() => handleChange({quantity : data.quantity - 1})} className="material-symbols-outlined hover:text-red-500">remove</span>
            </p>
            <p className='w-40 justify-center'><input onChange={e => handleChange({price : parseInt(e.target.value)})} type='number' className='w-full h-full text-center' /></p>
            <p className='w-40 justify-center'>{data.price ? data.price * data.quantity : ""}</p>
        </div>
  )
}

export default OrderAdditionalTableRowComp