import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { formattingDateForUpdate } from 'validation/Validation'

const ReviewsListComp = () => {
    const state = useSelector(state => state.UserReducer)
  return (
    <>
        {
            state.detail == 'review' ? (
            <>
                {
                    !state.review?.total ? <p className='text-sm text-center text-red-500'>لا يوجد عناوين للمستخدم</p> : (
                        <div className='custom-table'>
                            <div className='custom-tablerow'>
                                <p className='justify-center '>م</p>
                                <p className='justify-center w-80'>التعليق</p>
                                <p className='justify-center w-20'>التقييم</p>
                                <p className='justify-center w-20'>الحالة</p>
                                <p className='justify-center w-40'>تاريخ التعديل</p>
                                <p className='justify-center w-40'>تاريخ الإنشاء</p>
                                <p className='justify-center w-40'>مشاهدة المنتج</p>
                            </div>
                            {
                                state.review?.items.map((e , index) => (
                                    <div key={index} className='custom-tablerow'>
                                        <p className='justify-center '>{e.id}</p>
                                        <p className='justify-center w-80'>{e.comment}</p>
                                        <p className='justify-center w-20'>{e.ratting}</p>
                                        <p className='justify-center w-20'>{e.public ? "عام" : "خاص"}</p>
                                        <p className='justify-center w-40'>{formattingDateForUpdate(e.updated_at)}</p>
                                        <p className='justify-center w-40'>{formattingDateForUpdate(e.created_at)}</p>
                                        <p className='justify-center w-40'><Link className='text-center w-full hover:text-blue-500' to={`/product/update/${e.product_id}`}>مشاهدة المنتج</Link></p>
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

export default ReviewsListComp