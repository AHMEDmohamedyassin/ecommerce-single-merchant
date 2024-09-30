import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Static_CreateAction, Static_ReadAction } from '../../redux/action/StaticAction'

const AboutPage = () => {
    const state = useSelector(state => state.StaticReducer)
    const dispatch = useDispatch()
    const [data , setData] = useState({})

    // submitting form
    const submitFrom = (e) => {
        e.preventDefault()
        dispatch(Static_CreateAction({type : "about" , json: {content : Object.values(data)}}))
    }

    // adding question
    const handleAddQuestion = () => {
        setData(e => ({...e , [new Date().getTime()] : {} }))
    }

    // remove question // neeed upadate data not removed from use form
    const handleRemove = index => {
        setData((prevData) => {
            const { [index]: {}, ...rest } = prevData; 
            return rest;
        });
    }

    // reset and initiate content
    const handleReset = () => {
        if(state.about?.content){
            setData(Object.fromEntries(state.about.content.map((e , index) => [new Date().getTime() + index , e] )) )
        }
    }

    // retrieve json data
    useEffect(() => {
        dispatch(Static_ReadAction('about'))
    } , [])

    // appending questions to useState
    useEffect(() => {
        handleReset()
    } , [state.about])
  return (
    <div className='custom-dashcontainer'>
        <p className='title'>معلومات عن المتجر</p>

        <form onSubmit={submitFrom} className='flex flex-col gap-y-4'>

            {
                Object.keys(data).length ? Object.keys(data)?.map((e,index) => (
                    <div key={e} className={`custom-inputcontainer`}>
                        <div className='flex items-center gap-4'>
                            <label>محتوي رقم : {index + 1}</label>
                            <span onClick={() => handleRemove(e)} className="material-symbols-outlined hover:text-red-500">close</span>
                        </div>
                        <input defaultValue={data[e]?.title} onChange={input => setData(ele => ({...ele , [e] : {...ele[e] , title:input.target.value}}))} placeholder='العنوان'/>
                        <textarea defaultValue={data[e]?.value} onChange={input => setData(ele => ({...ele , [e] : {...ele[e] , value:input.target.value}}))} placeholder='المحتوي'></textarea>
                    </div>
                )) : <p className='text-sm text-red-500 text-center'>لا يوجد بيانات لعرضها</p>
            }

            <div className='flex gap-4 items-center justify-center flex-wrap'>
                <button className='custom-button2'>تأكيد</button>
                <button onClick={handleAddQuestion} type="button" className='custom-button hover:bg-blue-500'>إضافة خانة</button>
                <button onClick={handleReset} type="button" className='custom-button hover:bg-blue-500'>إعادة</button>
            </div>
        </form>
    </div>
  )
}

export default AboutPage