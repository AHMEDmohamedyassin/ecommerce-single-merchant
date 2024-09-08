import React from 'react'

const SearchBarComp = () => {
  return (
    <form className='custom-border rounded-full overflow-hidden w-full bg-secondarybg p-[1px] flex justify-between items-center'>
        <input className='p-4 py-2 text-sm border-none w-full bg-transparent' placeholder='ابحث عن المنتجات'/>
        <button className='bg-maincolor custom-button w-28 text-white'>بحث</button>
    </form>
  )
}

export default SearchBarComp