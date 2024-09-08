import CardComp from 'components/search/CardComp'
import SelectionComp from 'components/search/SelectionComp'
import SideFilterMenuComp from 'components/sideFilterMenu/SideFilterMenuComp'
import React from 'react'

const SearchPage = () => {
  return (
    <div>

        {/* side filtering menu  */}
        {/* <SideFilterMenuComp/> */}

        {/* controlling results section */}
        <section className='custom-container mb-6 flex justify-between items-center flex-wrap gap-4'> 
            
            {/* sorting button */}
            <SelectionComp/>

            {/* filtering button */}
            <button className='flex justify-between items-center bg-secondarybg custom-border select-none px-4 py-2 rounded-full'>
                <span className="material-symbols-outlined">filter_alt</span>
                <span>التصفية</span>
            </button>

        </section>

        {/* searching results of products */}
        <section className='custom-products-grid'>
            <CardComp/>
            <CardComp/>
            <CardComp/>
            <CardComp/>
            <CardComp/>
            <CardComp/>
            <CardComp/>
            <CardComp/>
            <CardComp/>
        </section>
    </div>
  )
}

export default SearchPage