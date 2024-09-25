import SearchComp from 'components/productlist/SearchComp'
import TableRowComp from 'components/productlist/TableRowComp'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ProductList_SearchAction } from '../../redux/action/ProductListAction'
import TableHeaderComp from '../../components/productlist/TableHeaderComp'

const ListPage = () => {
  const state = useSelector(state => state.ProductListReducer)
  const dispatch = useDispatch()

  // pagination handling
  const paginateHandle = (page = 1) => {
    dispatch(ProductList_SearchAction({page}))
  }

  useEffect(() => {
    paginateHandle()
  } , [])
  return (
    <div className='custom-dashcontainer'>
      <p className='title'>المنتجات</p>


      {/* search component */}
      <SearchComp/>


      {/* table */}
      <div className='custom-table'>
        {/* table header */}
        <TableHeaderComp/>

        {/* table body  */}
        {
          state.items?.map((e , index) => (
            <TableRowComp key={index} data={e} />
          ))
        }
      </div>
            

      {/* sum of result */}
      <div className='flex items-center gap-2 text-sm text-gray-500'>
        <p>مجموع النتائج : </p>
        <p>{state.total}</p>
      </div>


      {/* pagination */}
      <div className='flex items-center gap-4 mx-auto w-fit'>
        <button disabled={state.current < 2} onClick={() => paginateHandle(state.current - 1)} className='custom-button'>السابق</button>
        <div className='flex items-center gap-2'>
          <p>{state.current}</p>
          <p>/</p>
          <p>{state.last}</p>
        </div>
        <button disabled={state.current >= state.last } onClick={() => paginateHandle(state.current + 1)} className='custom-button'>التالي</button>
      </div>

    </div>
  )
}

export default ListPage