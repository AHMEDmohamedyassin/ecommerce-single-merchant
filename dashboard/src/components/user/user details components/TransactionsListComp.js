import React from 'react'
import { useSelector } from 'react-redux'
import { formattingDateForUpdate } from 'validation/Validation'

const TransactionsListComp = () => {
    const state = useSelector(state => state.UserReducer)
  return (
    <>
        {
            state.detail == 'transaction' ? (
            <>
                {
                    !state.transaction?.total ? <p className='text-sm text-center text-red-500'>لا يوجد عناوين للمستخدم</p> : (
                        <div className='custom-table'>
                            <div className='custom-tablerow'>
                                <p className='justify-center '>م</p>
                                <p className='justify-center w-20'>حالة الدفع</p>
                                <p className='justify-center w-20'>المبلغ</p>
                                <p className='justify-center w-20'>الوسيلة</p>
                                <p className='justify-center w-40'>تاريخ الدفع</p>
                                <p className='justify-center w-40'>رقم العملية</p>
                                <p className='justify-center w-20'>بوابة الدفع</p>
                                <p className='justify-center w-40'>تاريخ طلب الدفع</p>
                            </div>
                            {
                                state.transaction?.items.map((e , index) => (
                                    <div key={index} className='custom-tablerow'>
                                        <p className='justify-center '>{e.id}</p>
                                        <p className='justify-center w-20'>{e.invoice_status}</p>
                                        <p className='justify-center w-20'>{e.cart_total}</p>
                                        <p className='justify-center w-20'>{e.payment_method}</p>
                                        <p className='justify-center w-40'>{formattingDateForUpdate(e.paid_at)}</p>
                                        <p className='justify-center w-40'>{e.referenceNumber}</p>
                                        <p className='justify-center w-20'>{e.gateway_name}</p>
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

export default TransactionsListComp