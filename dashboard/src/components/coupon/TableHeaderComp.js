import TableHeaderRowComp from 'components/productlist/TableHeaderRowComp'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Coupon_ListAction } from '../../redux/action/CouponAction'

const TableHeaderComp = () => {
    const state = useSelector(state => state.CouponReducer)
    const dispatch = useDispatch()

    const handleOrder = orderby => {
        let desc = state.order == 'desc' ? true : false

        if(state.orderby == orderby)
            desc = !desc

        dispatch(Coupon_ListAction({orderby , order : desc ? "desc" : "asc"}))
    }

  return (
    <div className='custom-tablerow bg-mainbg'>
        <TableHeaderRowComp w={10} title={'م'} value={'id'} className={'sticky right-0 justify-center'} handleOrder={handleOrder} state={state} />
        <p className='justify-center w-40'>القسيمة</p>
        <TableHeaderRowComp w={20} title={'القيمة'} className={'justify-center'} value={'value'} handleOrder={handleOrder} state={state} />
        <TableHeaderRowComp w={40} title={'حالة التسليم'} className={'justify-center'} value={'paid'} handleOrder={handleOrder} state={state} />
        <TableHeaderRowComp w={40} title={'حالة الإستخدام'} className={'justify-center'} value={'is_used'} handleOrder={handleOrder} state={state} />
        <TableHeaderRowComp w={40} title={'تاريخ نهاية الصلاحية'} className={'justify-center'} value={'expire_date'} handleOrder={handleOrder} state={state} />
        <TableHeaderRowComp w={40} title={'تاريخ التعديل'} className={'justify-center'} value={'updated_at'} handleOrder={handleOrder} state={state} />
        <TableHeaderRowComp w={40} title={'تاريخ الإنشاء'} className={'justify-center'} value={'created_at'} handleOrder={handleOrder} state={state} />
        <p className='w-10 justify-center'>حذف</p>
    </div>
  )
}

export default TableHeaderComp