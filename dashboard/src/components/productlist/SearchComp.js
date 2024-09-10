import React from 'react'

const SearchComp = () => {
  return (
      <div className='flex justify-center gap-4'>
        {/* search input container  */}
        <div className='custom-inputcontainer '>
          <label>ابحث عن منتج</label>
          <input />
        </div>

        {/* search button */}
        <button className='custom-button'>بحث</button>
      </div>
  )
}

export default SearchComp