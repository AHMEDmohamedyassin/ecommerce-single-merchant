import React from 'react'

const CounterComp = ({data , changeCartQuantityHandle}) => {
  return (
        <div className=' select-none border-black border-[2px] rounded-full p-3 py-1 flex justify-between items-center w-28 my-5'>
            {
              data.pivot.quantity < 2 ? 
              <span onClick={() => changeCartQuantityHandle("sub")} className="material-symbols-outlined w-fit text-lg hover:cursor-pointer ">delete</span> :
              <span onClick={() => changeCartQuantityHandle("sub")} className='hover:cursor-pointer text-3xl -py-2 -my-1'>-</span>
            }
            <span className='font-semibold'>{data.pivot?.quantity}</span>
            <button disabled={data.pivot.quantity >= data.quantity} onClick={() => changeCartQuantityHandle("add")} className=' select-none disabled:text-gray-300'><span className='text-2xl -my-1 hover:cursor-pointer'>+</span></button>
        </div>
  )
}

export default CounterComp