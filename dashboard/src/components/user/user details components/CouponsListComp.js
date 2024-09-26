import React from 'react'
import { useSelector } from 'react-redux'
import { OrderStatus } from 'validation/OrderValidation'
import { formattingDateForUpdate } from 'validation/Validation'

const CouponsListComp = () => {
    const state = useSelector(state => state.UserReducer)
  return (
    <>
        {
            state.detail == 'coupon' ? (
            <>
                {
                    !state.coupon?.total ? <p className='text-sm text-center text-red-500'>لا يوجد عناوين للمستخدم</p> : (
                        <div className='custom-table'>
                            <div className='custom-tablerow'>
                                <p className='justify-center '>م</p>
                                <p className='justify-center w-40'>قيمة الكوبون</p>
                                <p className='justify-center w-40'>تاريخ نهاية الصلاحية</p>
                                <p className='justify-center w-40'>تاريخ التعديل</p>
                                <p className='justify-center w-40'>تاريخ الإنشاء</p>
                            </div>
                            {
                                state.coupon?.items.map((e , index) => (
                                    <div key={index} className='custom-tablerow'>
                                        <p className='justify-center '>{e.id}</p>
                                        <p className='justify-center w-40'>{e.value}</p>
                                        <p className='justify-center w-40'>{formattingDateForUpdate(e.expire_date)}</p>
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

export default CouponsListComp