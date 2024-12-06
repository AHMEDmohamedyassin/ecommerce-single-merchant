import PaginationComp from 'components/public/PaginationComp'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ProductSubList_ListAction } from '../../redux/action/ProductSubListAction'
import { Link } from 'react-router-dom'
import TableRowComp from 'components/ProductSubList/TableRowComp'
import TableHeaderComp from 'components/ProductSubList/TableHeaderComp'

const SubProductListPage = () => {
  const state = useSelector(state => state.ProductSubListReducer)
  const dispatch = useDispatch()

  // pagination handling
  const paginateHandle = (page = 1) => {
    dispatch(ProductSubList_ListAction({page}))
  }

  useEffect(() => {
    paginateHandle()
  } , [])
  return (
    <div className='custom-dashcontainer'>

      <div className='title_container'>
        <p>المنتجات</p>
        <Link to={'/product/create'} className=''>
          <span className="material-symbols-outlined">add</span>
          <span>إضافة منتج</span>  
        </Link>
      </div>


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

export default SubProductListPage