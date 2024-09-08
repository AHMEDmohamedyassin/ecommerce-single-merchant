import React from 'react'

const CardComp = () => {
  return (
    <div className='grid grid-cols-2 gap-x-2 text-sm items-center border-b-[1px] border-gray-200 pb-6 mb-6'>
        {/* image */}
        <div>
            <img className='custom-img-cover' loading='lazy' src='https://tawheedwnour.com/cdn/shop/files/19170184010.jpg?v=1722261195&width=600' />
        </div>
    
        {/* details */}
        <div className=' col-span-1 flex flex-col gap-y-1'>
    
            <p className='text-sm custom-text-truncate'>طقم معدات واقي باتنيج كبير- عزت غريب</p>
            <p className='text-gray-500'>اللون</p>
            <p>300 جم</p>
            
            {/* counter */}
            <div className='border-black border-[2px] rounded-full p-3 py-1 flex justify-between items-center w-28 my-5'>
                <span className='text-xl'>-</span>
                <span className='text-lg font-bold'>3</span>
                <span className='text-xl'>+</span>
            </div>
    
            {/* icons  */}
            <span className="material-symbols-outlined w-fit">delete</span>
    
        </div>
    </div>
  )
}

export default CardComp