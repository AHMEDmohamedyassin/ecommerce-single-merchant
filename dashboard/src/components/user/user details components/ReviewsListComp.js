import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Review_PulishAction } from '../../../redux/action/ReviewAction'
import { formattingDateForUpdate } from 'validation/Validation'

const ReviewsListComp = () => {
    const state = useSelector(state => state.UserReducer)
    const dispatch = useDispatch()

    // handle toggle publish state of reveiw
    const handlePublishToggle = (id) => {
        dispatch(Review_PulishAction(id))
    }
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
                                <p className='justify-center w-40'>التقييم</p>
                                <p className='justify-center w-40'>الحالة</p>
                                <p className='justify-center w-40'>تاريخ التعديل</p>
                                <p className='justify-center w-40'>تاريخ الإنشاء</p>
                                <p className='justify-center w-40'>مشاهدة المنتج</p>
                            </div>
                            {
                                state.review?.items.map((e , index) => (
                                    <div key={index} className='custom-tablerow'>
                                        <p className='justify-center '>{e.id}</p>
                                        <p className='justify-center w-80'>{e.comment}</p>
                                        <p className='w-40 '>
                                            {
                                                Array(e.ratting).fill(0).map((ele , index) => <span key={index} className="material-symbols-outlined text-yellow-500 text-xl">star</span>)
                                            }
                                        </p>
                                        <p onClick={() => handlePublishToggle(e.id)} className='w-40 justify-center hover:cursor-pointer hover:text-maincolor'>{e.public ? "عام" : "مخفي"}</p>
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