import React from 'react'

const SearchBarComp = () => {
  return (
    <form className='custom-border rounded-full overflow-hidden w-full bg-mainbg p-[2px] shadow flex justify-between items-center'>
        <input className='p-4 py-2 text-sm border-none w-full' placeholder='ابحث عن المنتجات'/>
        <button className='bg-maincolor rounded-full w-28 text-white py-2'>بحث</button>
    </form>
  )
}

export default SearchBarComp