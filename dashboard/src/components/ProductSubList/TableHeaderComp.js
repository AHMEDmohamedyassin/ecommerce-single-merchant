import TableHeaderRowComp from 'components/public/TableHeaderRowComp'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ProductSubList_ListAction } from '../../redux/action/ProductSubListAction'

const TableHeaderComp = () => {
    const state = useSelector(state => state.ProductSubListReducer)
    const dispatch = useDispatch()

    const handleOrder = (orderby) => {
      let order = 'desc'
      if(state.orderby == orderby && state.order == 'desc')
        order = 'asc'

      dispatch(ProductSubList_ListAction({orderby , order , page : 1}))
    } 

  return (
    <div className='custom-tablerow custom-tablehead'>
        <TableHeaderRowComp state={state} value={"id"} title={'م'} handleOrder={handleOrder} w="10" className={'sticky right-0'}/>
        <p className='w-32 bg-mainbg' title='صورة'>صورة</p>
        <p className='w-80 bg-mainbg' title='العنوان'>العنوان</p>
        <p className='w-80 bg-mainbg' title='الوصف'>الوصف</p>

        <TableHeaderRowComp state={state} value={'quantity'} title={'الكمية المتاحة'} w={32} handleOrder={handleOrder} />
        <TableHeaderRowComp state={state} value={'paid_quantity'} title={'المبيعات'} w={20} handleOrder={handleOrder} />
        <TableHeaderRowComp state={state} value={'size'} title={'المقاس'} w={32} handleOrder={handleOrder} />
        <TableHeaderRowComp state={state} value={'color'} title={'اللون'} w={32} handleOrder={handleOrder} />
        <TableHeaderRowComp state={state} value={'price'} title={'السعر'} w={20} handleOrder={handleOrder} />
        <TableHeaderRowComp state={state} value={'old_price'} title={'سعر قبل الخصم'} w={20} handleOrder={handleOrder} />

        <p className='w-20 bg-mainbg' title='التقييم'>التقييم</p>
        <p className='w-20 bg-mainbg' title='المشاهدات'>المشاهدات</p>
        <p className='w-20 bg-mainbg' title='المراجعات'>المراجعات</p>

        <p className='w-40 bg-mainbg' title='تاريخ النشر'>تاريخ النشر</p>
        <TableHeaderRowComp state={state} value={'updated_at'} title={'تاريخ التعديل'} w={40} handleOrder={handleOrder} />
        <TableHeaderRowComp state={state} value={'id'} title={'تاريخ الإنشاء'} w={40} handleOrder={handleOrder} />
        <p className='w-10 bg-mainbg' title='حذف'>حذف</p>
    </div>
  )
}

export default TableHeaderComp