import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { ProductList_SearchAction } from '../../redux/action/ProductListAction'

const SearchComp = () => {
  const [search , setSearch] = useState('')
  const dispatch = useDispatch()

  const handleSearch = (e) => {
    e.preventDefault()
    dispatch(ProductList_SearchAction({search}) )
  }
  return (
      <form onSubmit={handleSearch} className='flex justify-center  gap-4'>
        {/* search input container  */}
        <div className='custom-inputcontainer '>
          <input onChange={e => setSearch(e.target.value)} placeholder='بحث في العنوان و السعر و الوصف'/>
        </div>

        {/* search button */}
        <button className='custom-button'>بحث</button>
      </form>
  )
}

export default SearchComp