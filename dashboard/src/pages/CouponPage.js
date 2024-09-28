import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Coupon_DeleteAction, Coupon_ListAction, Coupon_PaidAction, Coupon_ShowAction } from '../redux/action/CouponAction'
import { formattingDateForUpdate } from 'validation/Validation'
import { Link } from 'react-router-dom'
import PaginationComp from 'components/public/PaginationComp'
import CreateComp from 'components/coupon/CreateComp'
import TableHeaderComp from 'components/coupon/TableHeaderComp'

const CouponPage = () => {
    const state = useSelector(state => state.CouponReducer)
    const dispatch = useDispatch()

    // handle pagination
    const handlePagination = (page = 1) => {
        dispatch(Coupon_ListAction({page}))
    }

    // deleting coupon
    const handleDelete = (id) => {
        dispatch(Coupon_DeleteAction(id))
    }

    // showing coupon
    const showingCoupon = id => {
        dispatch(Coupon_ShowAction(id))
    }

    // change paid status
    const paidStatusChange = (id) => [
        dispatch(Coupon_PaidAction(id))
    ]

    useEffect(() => {
        if(!state.total)
            handlePagination()
    } , [])
  return (
    <div className='custom-dashcontainer'>
        <p className='title'>قسائم الشراء</p>

        {/* creating coupon */}
        <CreateComp/>

        <div className='custom-table'>
            {/* table header */}
            <TableHeaderComp/>
            {
                state.items?.map((e , index) => (
                    <div key={index} className='custom-tablerow'>
                        <p className='w-10 justify-center sticky right-0 bg-mainbg'>{e.id}</p>
                        <p className='w-40 justify-center'>{e.coupon ?? <button onClick={() => showingCoupon(e.id)} className='w-full h-full'>****</button>}</p>
                        <p className='w-20 justify-center'>{e.value}</p>
                        <p onClick={() => paidStatusChange(e.id)} className='w-40 justify-center hover:cursor-pointer select-none'>{e.paid ? "تم تسليم" : "لم يتم التسليم"}</p>
                        <p className='w-40 justify-center'>{e.is_used ? <Link className='text-maincolor' to={`/user/update/${e.user_id}`}>مشاهدة المستخدم</Link> : "لم يتم الاستخدام"}</p>
                        <p className='w-40 justify-center'>{formattingDateForUpdate(e.expire_date)}</p>
                        <p className='w-40 justify-center'>{formattingDateForUpdate(e.updated_at)}</p>
                        <p className='w-40 justify-center'>{formattingDateForUpdate(e.created_at)}</p>
                        <p className='w-10 justify-center'><span title={`حذف الكوبون رقم ${e.id}`} onClick={() => handleDelete(e.id)} className="material-symbols-outlined hover:text-red-500">delete</span></p>
                    </div>
                ))
            }
        </div>

        <PaginationComp state={state} handlePagination={handlePagination} />
    </div>
  )
}

export default CouponPage