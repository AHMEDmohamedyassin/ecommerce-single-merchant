import { ProductImageURL } from 'Fetch/Url'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Cart_AddingAction } from '../../../redux/action/CartAction'
import CounterComp from 'components/cart/CounterComp'

const CardComp = ({data}) => {
  const dispatch = useDispatch() 

  // increase quantity of product in cart 
  const changeCartQuantityHandle = (type = "add") => {
    dispatch(Cart_AddingAction(data.id , type))
  }

  return (
    <div className='grid grid-cols-2 gap-x-2 text-sm items-center border-b-[1px] border-gray-200 py-6'>
        {/* image */}
        <div>
            {
              data.image ? 
              <img className='custom-img-cover' loading='lazy' src={`${ProductImageURL}id=${data.collection?.id}&image=${data.image}&width=200`} /> :
              <img className='custom-img-cover' loading='lazy' src={`${ProductImageURL}id=${data.collection?.id}&width=200`} /> 
            }
        </div>
    
        {/* details */}
        <div className=' col-span-1 flex flex-col gap-y-1'>
    
            <p className='text-sm custom-text-truncate'>{data.collection?.title}</p>
            <p className='text-gray-500'>{data.color}  /  {data.size}</p>
            <p>{data.price} جم</p>
            
            {/* counter */}
            <CounterComp data={data} changeCartQuantityHandle={changeCartQuantityHandle}/>
    
            {/* icons  */}
            <span onClick={() => changeCartQuantityHandle("delete")} className="material-symbols-outlined hover:cursor-pointer w-fit">delete</span>
    
        </div>
    </div>
  )
}

export default CardComp