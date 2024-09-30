import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserList_ListAction } from '../../redux/action/UserListAction'

const SearchComp = ({placeholder , state , action}) => {
  const [search , setSearch] = useState('')
  const dispatch = useDispatch()

  const handleSearch = (e) => {
    e.preventDefault()
    dispatch(action({search}) )
  }

  return (
      <form onSubmit={handleSearch} className='flex justify-center  gap-4'>
        {/* search input container  */}
        <div className='custom-inputcontainer '>
          <input onChange={e => setSearch(e.target.value)} defaultValue={state.search} placeholder={placeholder ?? "بحث"}/>
        </div>

        {/* search button */}
        <button className='custom-button'>بحث</button>
      </form>
  )
}

export default SearchComp