import TableHeaderRowComp from 'components/public/TableHeaderRowComp'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { OrderList_ListAction } from '../../redux/action/OrderListAction'

const OrderTableHeaderComp = () => {
  const state = useSelector(state => state.OrderListReducer)
  const dispatch = useDispatch()

  const handleSorting = orderby => {
    let order = 'desc'
        
    // check if input is multi-clicked makes its order ascending
    if(orderby == state.orderby && state.order == 'desc')
      order = 'asc'

    dispatch(OrderList_ListAction({page : 1 , orderby , desc : order}))
  }

  return (
            <div className='custom-tablerow sticky right-0 bg-mainbg'>
                <TableHeaderRowComp state={state} handleOrder={handleSorting} w={10} value={'id'} title={'م'} className={'sticky right-0 bg-mainbg'} />
                <TableHeaderRowComp state={state} handleOrder={handleSorting} w={40} value={'cart_total'} title={'مجموع الدفع'} className={'justify-center'}/>
                <p className='w-40 justify-center'>حالة الدفع</p>
                <p className='w-40 '>اسم العميل</p>
                <p className='w-40 justify-center'>رقم هاتف العميل</p>
                <p className='w-40 '>عنوان العميل</p>
                <p className='w-40 '>عنوان الدفع</p>
                <TableHeaderRowComp state={state} handleOrder={handleSorting} w={40} value={'updated_at'} title={'تاريخ التعديل'} className={'justify-center'}/>
                <TableHeaderRowComp state={state} handleOrder={handleSorting} w={40} value={'created_at'} title={'تاريخ الإنشاء'} className={'justify-center'}/>
            </div>
  )
}

export default OrderTableHeaderComp