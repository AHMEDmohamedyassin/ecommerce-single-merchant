import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Review_ReviewSubmitAction } from '../../redux/action/ReviewAction'
import { Setting_Msg } from '../../redux/action/SettingAction'

const ReviewFormComp = () => {
    const state = useSelector(state => state.ProductReducer)
    const dispatch = useDispatch()
    const [star , setStar] = useState(0)

    // handle submitting 
    const handleSubmit = (e) => {
        e.preventDefault()
        const form = new FormData(e.target)

        // check if user select the stars number
        if(star < 1) return Setting_Msg(12000)

        dispatch(Review_ReviewSubmitAction({
            ratting : star , 
            comment : form.get('comment')
        }))
    }
  
    return (
    <>
        {
            state.reviewable ? (
                <form onSubmit={handleSubmit} className='custom-productsection flex flex-col gap-6 custom-border border-x-0 border-t-0 py-4 mb-4'>
                    <p className='text-sm font-bold text-gray-500'>أضف تقييم للمنتج : </p>

                    {/* comment */}
                    <div className='custom-inputcontainer'>
                        <label>تعليق</label>
                        <input name='comment' maxLength={255 } placeholder='اكتب رأيك في المنتج' />
                    </div>

                    {/* stars  */}
                    <div className='flex items-center gap-2'>
                        <div className='text-xs'>التقييم</div>
                        <div>
                            <span onClick={() => setStar(1)} className={`material-symbols-outlined text-yellow-500 ${star >= 1 ? "fill" : ""}`}>star</span>
                            <span onClick={() => setStar(2)} className={`material-symbols-outlined text-yellow-500 ${star >= 2 ? "fill" : ""}`}>star</span>
                            <span onClick={() => setStar(3)} className={`material-symbols-outlined text-yellow-500 ${star >= 3 ? "fill" : ""}`}>star</span>
                            <span onClick={() => setStar(4)} className={`material-symbols-outlined text-yellow-500 ${star >= 4 ? "fill" : ""}`}>star</span>
                            <span onClick={() => setStar(5)} className={`material-symbols-outlined text-yellow-500 ${star >= 5 ? "fill" : ""}`}>star</span>
                        </div>
                    </div>

                    <button className='custom-button2 w-fit'>تأكيد</button>
                </form>
            ) : null
        }
    </>
  )
}

export default ReviewFormComp