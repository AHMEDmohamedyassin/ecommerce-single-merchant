import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Static_CreateAction, Static_ReadAction } from '../../redux/action/StaticAction'

const ContactPage = () => {
    const state = useSelector(state => state.StaticReducer)
    const dispatch = useDispatch()
    const [data , setData] = useState()

    // submitting form
    const submitFrom = (e) => {
        e.preventDefault()
        dispatch(Static_CreateAction({type : "contact" , json: data }))
    }

    // reset and initiate content
    const handleReset = () => {
        if(state.contact)
            setData(state.contact)
    }

    // retrieve json data
    useEffect(() => {
        dispatch(Static_ReadAction('contact'))
    } , [])

    // appending questions to useState
    useEffect(() => {
        handleReset()
    } , [state.contact])
  return (
    <div className='custom-dashcontainer'>
        <p className='title'>معلومات التواصل</p>

        <form onSubmit={submitFrom} className='flex flex-col gap-y-4'>

            <div className={`custom-inputcontainer`}>
                <label>العنوان :</label>
                <textarea value={data?.address} onChange={input => setData(ele => ({...ele , "address" : input.target.value}))} placeholder='العنوان'></textarea>
            </div>

            <div className={`custom-inputcontainer`}>
                <label>مواعيد العمل :</label>
                <textarea value={data?.work} onChange={input => setData(ele => ({...ele , "work" : input.target.value}))} placeholder='مواعيد العمل'></textarea>
            </div>

            <div className={`custom-inputcontainer`}>
                <label>أرقام الهاتف :</label>
                <textarea value={data?.phone} onChange={input => setData(ele => ({...ele , "phone" : input.target.value}))} placeholder='أرقام الهاتف'></textarea>
            </div>

            <div className={`custom-inputcontainer`}>
                <label>أرقام الواتساب :</label>
                <textarea value={data?.whatsapp} onChange={input => setData(ele => ({...ele , "whatsapp" : input.target.value}))} placeholder='أرقام الواتساب'></textarea>
            </div>

            <div className={`custom-inputcontainer`}>
                <label>البريد الإليكتروني :</label>
                <textarea value={data?.email} onChange={input => setData(ele => ({...ele , "email" : input.target.value}))} placeholder='البريد الإليكتروني'></textarea>
            </div>

            <div className='flex gap-4 items-center justify-center flex-wrap'>
                <button className='custom-button2'>تأكيد</button>
                <button onClick={handleReset} type="button" className='custom-button hover:bg-blue-500'>إعادة</button>
            </div>
        </form>
    </div>
  )
}

export default ContactPage