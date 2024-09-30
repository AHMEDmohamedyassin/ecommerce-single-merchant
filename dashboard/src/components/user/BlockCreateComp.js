import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import SectionTitleComp from './SectionTitleComp'
import { Block_CreateAction } from '../../redux/action/UserBlockAction'

const BlockCreateComp = () => {
    const dispatch = useDispatch() 
    const user = useSelector(state => state.UserReducer)

    const {
        register , 
        handleSubmit , 
        formState:{errors}} = useForm({
        mode:"onBlur" , 
    })

    // submitting form by appending permissions
    const submitHandle = (data) => {
        dispatch(Block_CreateAction({...data , id : user.id}))
    }

  return (
    <div className='custom-dashcontainer'>
        {/* section title with toggle arrow button */}
        <SectionTitleComp title={'حظر المستخدم'} section={'block'}/>

        {
            user.section == 'block' ? (
                <>
                    {/* form containing list of roles */}
                    <form onSubmit={handleSubmit(submitHandle)} className='flex flex-col gap-4'>
                        <div className='custom-inputcontainer '>
                            <label>سبب الحظر</label>
                            <input {...register('reason' , {maxLength:{message : "تجاوزت أكبر طول للحقل" , value:255}})}/>
                            {errors.reason && <p>{errors.reason.message}</p>}
                        </div>
                        <div className='custom-inputcontainer '>
                            <label>أيام الحظر</label>
                            <input type='number' {...register('expire_days' , {required:"الرجاء إدخال عدد أيام الحظر" , min:{message : "يجب أن تكون الأرجام موجبة" , value:1}})}/>
                            {errors.expire_days && <p>{errors.expire_days.message}</p>}
                        </div>
                    </form>
                    
                    {/* submitting form button  */}
                    <div className='flex justify-center mt-10'>
                        <button onClick={handleSubmit(submitHandle)} className='custom-button2'>تأكيد</button>
                    </div>
                </>
            ) : <div className='text-center -mb-10'><span className="material-symbols-outlined text-5xl">more_horiz</span></div>
        }
    </div>
  )
}


export default BlockCreateComp