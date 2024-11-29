import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ProductList_SearchAction } from '../../redux/action/ProductListAction'
import TableHeaderRowComp from '../public/TableHeaderRowComp'

const TableHeaderComp = () => {
    const state = useSelector(state => state.ProductListReducer)
    const dispatch = useDispatch()
    const [order , setOrder] = useState(null)

    const handleOrder = (orderby) => {
        let is_desc = 'desc'
        
        // check if input is multi-clicked makes its order ascending
        if(orderby == order && state.order == 'desc')
          is_desc = 'asc'
    
        setOrder(orderby)
        dispatch(ProductList_SearchAction({orderby , order : is_desc}))
      }

  return (
    <div className='custom-tablerow custom-tablehead'>
        <TableHeaderRowComp state={state} value={"id"} title={'م'} handleOrder={handleOrder} w="10" className={'sticky right-0'}/>
        <p className='w-32 bg-mainbg' title='صورة'>صورة</p>
        <TableHeaderRowComp state={state} value={'title'} title={'العنوان'} w={80} handleOrder={handleOrder} />
        <TableHeaderRowComp state={state} value={'description'} title={'الوصف'} w={80} handleOrder={handleOrder} />
        <p className='w-20 bg-mainbg' title='الكمية'>الكمية</p>
        <TableHeaderRowComp state={state} value={'ratting'} title={'التقييم'} w={20} handleOrder={handleOrder} />
        <TableHeaderRowComp state={state} value={'views'} title={'المشاهدات'} w={20} handleOrder={handleOrder} />
        <TableHeaderRowComp state={state} value={'reviews'} title={'المراجعات'} w={20} handleOrder={handleOrder} />
        <TableHeaderRowComp state={state} value={'publish_date'} title={'تاريخ النشر'} w={40} handleOrder={handleOrder} />
        <TableHeaderRowComp state={state} value={'updated_at'} title={'تاريخ التعديل'} w={40} handleOrder={handleOrder} />
        <TableHeaderRowComp state={state} value={'id'} title={'تاريخ الإنشاء'} w={40} handleOrder={handleOrder} />
        <p className='w-10 bg-mainbg' title='حذف'>حذف</p>
    </div>
  )
}

export default TableHeaderComp