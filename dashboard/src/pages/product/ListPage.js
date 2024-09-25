import SearchComp from 'components/productlist/SearchComp'
import TableRowComp from 'components/productlist/TableRowComp'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ProductList_SearchAction } from '../../redux/action/ProductListAction'

const ListPage = () => {
  const state = useSelector(state => state.ProductListReducer)
  const dispatch = useDispatch()
  const [order , setOrder] = useState(null)

  // pagination handling
  const paginateHandle = (page = 1) => {
    dispatch(ProductList_SearchAction({page}))
  }

  // not tested
  const handleOrder = (order) => {
    setOrder(order)
    dispatch(ProductList_SearchAction({orderby : order}))
  }

  useEffect(() => {
    paginateHandle()
  } , [])
  return (
    <div className='custom-dashcontainer'>
      <p className='title'>المنتجات</p>

      {/* search container */}
      <SearchComp/>

      {/* table */}
        <div className='custom-table'>
            <div className='custom-tablerow custom-tablehead'>
              <p onClick={() => setOrder('id')} className='w-10 sticky right-0 hover:cursor-pointer hover:bg-maincolor hover:text-mainbg' title='م'>م</p>
              <p className='w-32' title='صورة'>صورة</p>
              <p onClick={() => setOrder('title')} className='w-80 hover:cursor-pointer hover:bg-maincolor hover:text-mainbg' title='العنوان'>العنوان</p>
              <p className='w-80' title='الوصف'>الوصف</p>
              <p onClick={() => setOrder('price')} className='w-20 hover:cursor-pointer hover:bg-maincolor hover:text-mainbg' title='السعر'>السعر</p>
              <p onClick={() => setOrder('old_price')} className='w-20 hover:cursor-pointer hover:bg-maincolor hover:text-mainbg' title='السعر قبل الخصم'>السعر قبل الخصم</p>
              <p onClick={() => setOrder('quantity')} className='w-20 hover:cursor-pointer hover:bg-maincolor hover:text-mainbg' title='الكمية'>الكمية</p>
              <p onClick={() => setOrder('ratting')} className='w-20 hover:cursor-pointer hover:bg-maincolor hover:text-mainbg' title='التقييم'>التقييم</p>
              <p onClick={() => setOrder('views')} className='w-20 hover:cursor-pointer hover:bg-maincolor hover:text-mainbg' title='المشاهدات'>المشاهدات</p>
              <p onClick={() => setOrder('reviews')} className='w-20 hover:cursor-pointer hover:bg-maincolor hover:text-mainbg' title='المراجعات'>المراجعات</p>
              <p onClick={() => setOrder('paid_quantity')} className='w-20 hover:cursor-pointer hover:bg-maincolor hover:text-mainbg' title='المبيعات'>المبيعات</p>
              <p onClick={() => setOrder('publish_date')} className='w-40 hover:cursor-pointer hover:bg-maincolor hover:text-mainbg' title='تاريخ النشر'>تاريخ النشر</p>
              <p onClick={() => setOrder('updated_at')} className='w-40 hover:cursor-pointer hover:bg-maincolor hover:text-mainbg' title='تاريخ التعديل'>تاريخ التعديل</p>
              <p onClick={() => setOrder('id')} className='w-40 hover:cursor-pointer hover:bg-maincolor hover:text-mainbg' title='تاريخ الإنشاء'>تاريخ الإنشاء</p>
              <p className='w-10' title='حذف'>حذف</p>
            </div>

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