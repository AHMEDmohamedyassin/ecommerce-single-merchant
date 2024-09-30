import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Static_CreateAction, Static_ReadAction } from '../../redux/action/StaticAction'

const PolicyPage = () => {
    const state = useSelector(state => state.StaticReducer)
    const dispatch = useDispatch()
    const [data , setData] = useState()

    // submitting form
    const submitFrom = (e) => {
        e.preventDefault()
        dispatch(Static_CreateAction({type : "policy" , json: data }))
    }

    // reset and initiate content
    const handleReset = () => {
        if(state.policy)
            setData(state.policy)
    }

    // retrieve json data
    useEffect(() => {
        dispatch(Static_ReadAction('policy'))
    } , [])

    // appending questions to useState
    useEffect(() => {
        handleReset()
    } , [state.policy])
  return (
    <div className='custom-dashcontainer'>
        <p className='title'>معلومات التواصل</p>

        <form onSubmit={submitFrom} className='flex flex-col gap-y-4'>

            <div className={`custom-inputcontainer`}>
                <label>سياسة الاسترجاع و التبديل :</label>
                <textarea rows={6} value={data?.return_policy} onChange={input => setData(ele => ({...ele , "return_policy" : input.target.value}))} placeholder='سياسة الاسترجاع و التبديل'></textarea>
            </div>

            <div className={`custom-inputcontainer`}>
                <label>سياسة التوصيل :</label>
                <textarea rows={6} value={data?.shipping_policy} onChange={input => setData(ele => ({...ele , "shipping_policy" : input.target.value}))} placeholder='سياسة التوصيل'></textarea>
            </div>

            <div className='flex gap-4 items-center justify-center flex-wrap'>
                <button className='custom-button2'>تأكيد</button>
                <button onClick={handleReset} type="button" className='custom-button hover:bg-blue-500'>إعادة</button>
            </div>
        </form>
    </div>
  )
}

export default PolicyPage