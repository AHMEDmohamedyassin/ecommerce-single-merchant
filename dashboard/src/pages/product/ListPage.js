import SearchComp from 'components/productlist/SearchComp'
import TableRowComp from 'components/productlist/TableRowComp'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ProductList_SearchAction } from '../../redux/action/ProductListAction'
import TableHeaderComp from '../../components/productlist/TableHeaderComp'
import PaginationComp from 'components/public/PaginationComp'

const ListPage = () => {
  const state = useSelector(state => state.ProductListReducer)
  const dispatch = useDispatch()

  // pagination handling
  const paginateHandle = (page = 1) => {
    dispatch(ProductList_SearchAction({page}))
  }

  // initiate loading products data
  useEffect(() => {
    if(!state.total)
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
      <PaginationComp state={state} handlePagination={paginateHandle}/>

    </div>
  )
}

export default ListPage