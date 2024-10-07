import CardComp from 'components/search/CardComp'
import SelectionComp from 'components/search/SelectionComp'
import SideFilterMenuComp from 'components/sideMenu/sideFilterMenu/SideFilterMenuComp'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ProductList_List } from '../redux/action/ProductListAction'

const SearchPage = () => {
  const state = useSelector(state => state.ProductListReducer)
  const dispatch = useDispatch()

  // initiate the page
  useEffect(() => {
    if(!state.items?.length)
      dispatch(ProductList_List())
  } , [])
  return (
    <div>

        {/* side filtering menu  */}
        <SideFilterMenuComp/>

        {/* controlling results section */}
        <section className='custom-container mb-6 flex justify-between items-center flex-wrap gap-4'> 
            
            {/* sorting button */}
            <SelectionComp/>

            {/* filtering button */}
            <button data-menubutton="filtermenu" className='flex justify-between items-center bg-secondarybg custom-border select-none px-4 py-2 rounded-full'>
                <span className="material-symbols-outlined">filter_alt</span>
                <span>التصفية</span>
            </button>

        </section>

        {/* searching results of products */}
        <section className='custom-products-grid'>
          {
            state.items.map((e , index) => (
              <CardComp key={e.id} data={e}/>
            ))
          }
        </section>
    </div>
  )
}

export default SearchPage