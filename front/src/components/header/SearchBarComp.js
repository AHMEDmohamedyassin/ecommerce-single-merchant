import React from 'react'
import { useNavigate } from 'react-router-dom'

const SearchBarComp = () => {
  const navigate = useNavigate()

  // handleSubmit 
  const handleSubmit = e => {
    e.preventDefault()
    const form  = new FormData(e.target)

    let query = form.get('query')

    navigate(`/search?search=${query}`)
  }
  return (
    <form onSubmit={handleSubmit} className='custom-border rounded-full overflow-hidden w-full bg-secondarybg p-[1px] flex justify-between items-center'>
        <input name='query' className='p-4 py-2 text-sm border-none w-full bg-transparent' placeholder='ابحث عن المنتجات'/>
        <button className='bg-maincolor custom-button w-28 text-white'>بحث</button>
    </form>
  )
}

export default SearchBarComp