import React from 'react'
import { useSelector } from 'react-redux'
import { formattingDateForUpdate } from 'validation/Validation'

const FavoritListComp = () => {
    const state = useSelector(state => state.UserReducer)

  return (
    <>
        {
            state.detail == 'favorite' ? (
            <>
                {
                    !state.favorite?.total ? <p className='text-sm text-center text-red-500'>لا يوجد عناوين للمستخدم</p> : (
                        <div className='custom-table'>
                            <div className='custom-tablerow'>
                                <p className='justify-center '>م</p>
                                <p className='justify-center w-40'>الكود</p>
                                <p className='justify-center w-80'>العنوان</p>
                                <p className='justify-center w-20'>السعر</p>
                                <p className='justify-center w-20'>السعر قبل الخصم</p>
                                <p className='justify-center w-20'>الكمية المتاحة</p>
                                <p className='justify-center w-40'>تاريخ التعديل</p>
                                <p className='justify-center w-40'>تاريخ الإنشاء</p>
                            </div>
                            {
                                state.favorite?.items.map((e , index) => (
                                    <div key={index} className='custom-tablerow'>
                                        <p className='justify-center '>{e.id}</p>
                                        <p className='justify-center w-40'>{e.serial}</p>
                                        <p className='justify-center w-80'>{e.title}</p>
                                        <p className='justify-center w-20'>{e.price}</p>
                                        <p className='justify-center w-20'>{e.old_price}</p>
                                        <p className='justify-center w-20'>{e.quantity}</p>
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

export default FavoritListComp