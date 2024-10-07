import { ProductImageURL } from 'Fetch/Url'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Cart_AddingAction } from '../../../redux/action/CartAction'

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
            <div className=' select-none border-black border-[2px] rounded-full p-3 py-1 flex justify-between items-center w-28 my-5'>
                {
                  data.pivot.quantity < 2 ? 
                  <span onClick={() => changeCartQuantityHandle("sub")} className="material-symbols-outlined w-fit text-lg hover:cursor-pointer ">delete</span> :
                  <span onClick={() => changeCartQuantityHandle("sub")} className='hover:cursor-pointer text-3xl -py-2 -my-1'>-</span>
                }
                <span className='font-semibold'>{data.pivot?.quantity}</span>
                <button disabled={data.pivot.quantity >= data.quantity} onClick={() => changeCartQuantityHandle("add")} className=' select-none disabled:text-gray-300'><span className='text-2xl -my-1 hover:cursor-pointer'>+</span></button>
            </div>
    
            {/* icons  */}
            <span onClick={() => changeCartQuantityHandle("delete")} className="material-symbols-outlined hover:cursor-pointer w-fit">delete</span>
    
        </div>
    </div>
  )
}

export default CardComp