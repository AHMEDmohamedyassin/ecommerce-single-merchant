import OrderTotalComp from 'components/order/OrderTotalComp'
import OrdersTableComp from 'components/order/products_table/OrdersTableComp'
import { useDispatch, useSelector } from 'react-redux'
import { Order_ReadAction } from '../../redux/action/OrderAction'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { formattingOrderStatus } from '../../validation/OrderValidation'
import { formattingDateForUpdate } from 'validation/Validation'
import OrderPrintComp from 'components/order/OrderPrintComp'

const ReviewPage = () => {
    const state = useSelector(state => state.OrderReducer)
    const dispatch = useDispatch()
    const params = useParams()

    // getting order data
    useEffect(() => {
        dispatch(Order_ReadAction(params.id))
    } , [])
  return (
    <div className='custom-dashcontainer relative'>
        <div className='w-full h-full absolute top-0 left-0 bg-transparent z-10'></div>

        <p className='title'>بيانات الطلب</p>

        {/* products table  */}
        <OrdersTableComp/>

        {/* total of order  */}
        <OrderTotalComp/>

        <div className='flex flex-col gap-10'>

            {/* coupon for order */}
            {
                state.coupon ? (
                    <div className='flex gap-4 items-center'>
                        <p className='text-sm text-gray-500'>قيمة قسيمة الشراء المستخدمة : </p>
                        <p>{state.coupon?.value} جم</p>
                    </div>
                ) : null
            }

            {/* user data if exists  */}
            {
                state.user ? (
                    <Link to={`/user/update/${state.user.id}`}>
                        <p className='text-sm text-gray-500 mb-2'>بيانات العميل</p>
                        <div className='text-sm py-2 custom-border border-x-0 bg-mainbg hover:cursor-pointer grid grid-cols-3'>
                            <p>{state.user?.name}</p>
                            <p>{state.user?.phone}</p>
                            <p>{state.user?.email}</p>
                        </div>
                    </Link>
                ) : null
            }

            {/* order status  */}
            <div className='flex gap-4 items-center'>
                <p className='text-sm text-gray-500'>حالة الطلب : </p>
                <p>{formattingOrderStatus(state.order_state)}</p>
            </div>


            {/* store address locaion  */}
            {
                state.store_address ? (
                    <div className='flex gap-4 items-center'>
                        <p className='text-sm text-gray-500'>عنوان المتجر : </p>
                        <p>{state.store_address?.address}</p>
                    </div>
                ) : null
            }


            {/* user address locaion  */}
            {
                state.address ? (
                    <div className='flex gap-4 items-center'>
                        <p className='text-sm text-gray-500'>عنوان المستخدم : </p>
                        <p>{state.address?.address}</p>
                    </div>
                ) : null
            }


            {/* billing way  */}
            {
                state.address ? (
                    <div className='flex gap-4 items-center'>
                        <p className='text-sm text-gray-500'>طريقة الدفع : </p>
                        <p>{state.pay_on_diliver? "دفع يدوي" : "دفع إليكتروني"}</p>
                    </div>
                ) : null
            }


            {/* transaction data if exists  */}
            {
                state.transaction?.length ? (
                    <div>
                        <p className='text-sm text-gray-500 mb-4'>بيانات عملية الدفع الإليكتروني</p>
                        <div className='flex flex-col gap-2'>
                            <div className='flex items-center gap-4'>
                                <p className='text-gray-500 text-sm'>المبلغ المدفوع : </p>
                                <p>{state.transaction[0]?.cart_total} جم</p>
                            </div>
                            <div className='flex items-center gap-4'>
                                <p className='text-gray-500 text-sm'>حالة العملية : </p>
                                <p>{state.transaction[0]?.invoice_status}</p>
                            </div>
                            <div className='flex items-center gap-4'>
                                <p className='text-gray-500 text-sm'>رقم العملية : </p>
                                <p>{state.transaction[0]?.referenceNumber}</p>
                            </div>
                            <div className='flex items-center gap-4'>
                                <p className='text-gray-500 text-sm'>تاريخ الدفع : </p>
                                <p>{formattingDateForUpdate(state.transaction[0]?.paid_at)}</p>
                            </div>
                        </div>
                    </div>
                ) : null
            }


            <OrderPrintComp/>
        </div>
    </div>
  )
}

export default ReviewPage