import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Review_DeleteAction, Review_PulishAction } from '../../redux/action/ReviewAction'
import { formattingDateForUpdate } from 'validation/Validation'
import { Link } from 'react-router-dom'

const ReviewTableComp = () => {
    const state = useSelector(state => state.ReviewReducer)
    const dispatch = useDispatch()

    // handle toggle publish state of reveiw
    const handlePublishToggle = (id) => {
        dispatch(Review_PulishAction(id))
    }

    // handle delete 
    const handleDelete = id => {
        dispatch(Review_DeleteAction(id))
    }
  return (
    <>
        {
            state.items.length ? (
                <div className='custom-table'>
                    <div className='custom-tablerow bg-mainbg'>
                        <p className='w-10 justify-center sticky right-0 bg-mainbg'>م</p>
                        <p className='w-80'>التعليق</p>
                        <p className='w-40'>التقييم</p>
                        <p className='w-40 justify-center'>حالة التعليق</p>
                        <p className='w-80'>اسم المستخدم</p>
                        <p className='w-80'>عنوان المنتج</p>
                        <p className='w-40 justify-center'>تاريخ التعديل</p>
                        <p className='w-40 justify-center'>تاريخ الإنشاء</p>
                        <p className='w-10 justify-center'>حذف</p>
                    </div>

                    {
                        state.items.map((e,index) => (
                            <div key={index} className='custom-tablerow'>
                                <p className='w-10 justify-center sticky right-0 bg-mainbg'>{e.id}</p>
                                <p className='w-80'>{e.comment}</p>
                                <p className='w-40 '>
                                    {
                                        Array(e.ratting).fill(0).map((ele , index) => <span key={index} className="material-symbols-outlined text-yellow-500 text-xl">star</span>)
                                    }
                                </p>
                                <p onClick={() => handlePublishToggle(e.id)} className='w-40 justify-center hover:cursor-pointer hover:text-maincolor'>{e.public ? "عام" : "مخفي"}</p>
                                <Link to={`/user/update/${e.user?.id}`} className='w-80'><p>{e.user?.name}</p></Link>
                                <p className='w-80'>{e.product?.title}</p>
                                <p className='w-40 justify-center'>{formattingDateForUpdate(e.updated_at)}</p>
                                <p className='w-40 justify-center'>{formattingDateForUpdate(e.created_at)}</p>
                                <p className='w-10 justify-center'><span onClick={() => handleDelete(e.id)} className="material-symbols-outlined hover:text-red-500">delete</span></p>
                            </div>
                        ))
                    }
                </div>   
            ) : <p className='text-sm text-red-500 text-center my-10'>لا توجد مراجعات</p>
        }
    </>
  )
}

export default ReviewTableComp