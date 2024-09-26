import React from 'react'
import { useSelector } from 'react-redux'
import { OrderStatus } from 'validation/OrderValidation'
import { formattingDateForUpdate } from 'validation/Validation'

const OrdersListComp = () => {
    const state = useSelector(state => state.UserReducer)
  return (
    <>
        {
            state.detail == 'order' ? (
            <>
                {
                    !state.order?.total ? <p className='text-sm text-center text-red-500'>لا يوجد عناوين للمستخدم</p> : (
                        <div className='custom-table'>
                            <div className='custom-tablerow'>
                                <p className='justify-center '>م</p>
                                <p className='justify-center w-20'>حالة الطلب</p>
                                <p className='justify-center w-20'>المبلغ المدفوع</p>
                                <p className='justify-center w-20'>قيمة الكوبون</p>
                                <p className='justify-center w-40'>طريقة الدفع</p>
                                <p className='justify-center w-40'>عنوان التوصيل</p>
                                <p className='justify-center w-40'>عنوان الدفع</p>
                                <p className='justify-center w-40'>تاريخ التعديل</p>
                                <p className='justify-center w-40'>تاريخ الإنشاء</p>
                            </div>
                            {
                                state.order?.items.map((e , index) => (
                                    <div key={index} className='custom-tablerow'>
                                        <p className='justify-center '>{e.id}</p>
                                        <p className='justify-center w-20'>{OrderStatus(e.status)}</p>
                                        <p className='justify-center w-20'>{e.cart_total}</p>
                                        <p className='justify-center w-20'>{e.coupon?.value}</p>
                                        <p className='justify-center w-40'>{e.pay_on_diliver ? "دفع عند التوصيل" : "دفع إليكتروني"}</p>
                                        <p className='justify-center w-40'>{e.address?.address}</p>
                                        <p className='justify-center w-40'>{e.store_address?.address}</p>
                                        <p className='justify-center w-40'>{formattingDateForUpdate(e.updated_at)}</p>
                                        <p className='justify-center w-40'>{formattingDateForUpdate(e.created_at)}</p>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </>
            ) : null
        }
    </>
  )
}

export default OrdersListComp