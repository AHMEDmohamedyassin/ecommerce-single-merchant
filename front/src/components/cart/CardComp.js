import React from 'react'
import { useDispatch } from 'react-redux'
import CounterComp from './CounterComp'
import { Cart_AddingAction } from '../../redux/action/CartAction'
import { ProductImageURL } from 'Fetch/Url'

const CardComp = ({data}) => {
  const dispatch = useDispatch()

// increase quantity of product in cart 
  const changeCartQuantityHandle = (type = "add") => {
    dispatch(Cart_AddingAction(data.id , type))
  }

  return (
    <div className='grid grid-cols-7 max-lg:grid-cols-3 border-inherit lg:border-r-[1px] border-b-[1px]'>
        <div className='border-inherit lg:border-l-[1px] p-3 flex justify-center items-center'>
            {
              data.image ? 
              <img className='border-inherit border-[1px] shadow-sm h-36 object-cover' loading='lazy' src={`${ProductImageURL}id=${data.collection?.id}&image=${data.image}&width=200`} /> :
              <img className='border-inherit border-[1px] shadow-sm h-36 object-cover' loading='lazy' src={`${ProductImageURL}id=${data.collection?.id}&width=200`} /> 
            }
        </div>

        <div className=' col-span-6 max-lg:col-span-2 grid grid-cols-6 max-lg:grid-cols-2 max-lg:gap-4 max-lg:p-4'>

            {/* title */}
            <div className='border-inherit lg:border-l-[1px] col-span-2 lg:p-4 text-gray-700 flex flex-col justify-between gap-2'>
                <div className=' line-clamp-3 text-sm'>{data.collection.title}</div>
                <div>{data.size} , {data.color}</div>
            </div>

            {/* price  */}
            <div className='border-inherit lg:border-l-[1px] flex flex-col gap-2 lg:items-center justify-center font-semibold text-sm'>
                <div>{data.price} جنيه</div>
                {
                  data.old_price ? 
                    <div className='text-gray-300 relative max-lg:hidden'>{data.old_price} جنيه <div className='w-10 h-[1px] bg-gray-500 absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 rotate-12'></div></div>
                  : null
                }
            </div>

            {/* counter */}
            <div className='border-inherit lg:border-l-[1px] flex items-center lg:justify-center justify-end'>
                <CounterComp data={data} changeCartQuantityHandle={changeCartQuantityHandle} />
            </div>

            {/* total price  */}
            <div className='border-inherit lg:border-l-[1px] flex items-center lg:justify-center font-semibold text-sm text-nowrap'><span className='font-bold me-2'>المجموع : </span>  {data.pivot.quantity * data.price} جنيه </div>

            {/* remove */}
            <div  className='border-inherit lg:border-l-[1px] flex items-center lg:justify-center justify-end'>
                <span onClick={() => changeCartQuantityHandle('delete')} className="material-symbols-outlined hover:text-red-500 cursor-pointer">delete</span>
            </div>

        </div>


    </div>
  )
}

export default CardComp