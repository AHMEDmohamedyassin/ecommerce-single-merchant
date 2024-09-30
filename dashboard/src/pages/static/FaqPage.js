import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Static_CreateAction, Static_ReadAction } from '../../redux/action/StaticAction'

const FaqPage = () => {
    const state = useSelector(state => state.StaticReducer)
    const dispatch = useDispatch()
    const [data , setData] = useState({})

    // submitting form
    const submitFrom = (e) => {
        e.preventDefault()
        dispatch(Static_CreateAction({type : "faq" , json: {questions : Object.values(data)}}))
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

    const handleReset = () => {
        if(state.faq?.questions){
            setData(Object.fromEntries(state.faq.questions.map((e , index) => [new Date().getTime() + index , e] )) )
        }
    }

    // retrieve json data
    useEffect(() => {
        dispatch(Static_ReadAction('faq'))
    } , [])

    // appending questions to useState
    useEffect(() => {
        handleReset()
    } , [state.faq])
  return (
    <div className='custom-dashcontainer'>
        <p className='title'>الأسئلة الأكثر شيوعا</p>

        <form onSubmit={submitFrom} className='flex flex-col gap-y-4'>

            {
                Object.keys(data).length ? Object.keys(data)?.map((e,index) => (
                    <div key={e} className={`custom-inputcontainer`}>
                        <div className='flex items-center gap-4'>
                            <label>السؤال رقم : {index + 1}</label>
                            <span onClick={() => handleRemove(e)} className="material-symbols-outlined hover:text-red-500">close</span>
                        </div>
                        <input defaultValue={data[e]?.question} onChange={input => setData(ele => ({...ele , [e] : {...ele[e] , question:input.target.value}}))} placeholder='السؤال'/>
                        <textarea defaultValue={data[e]?.answer} onChange={input => setData(ele => ({...ele , [e] : {...ele[e] , answer:input.target.value}}))} placeholder='الجواب'></textarea>
                    </div>
                )) : <p className='text-sm text-red-500 text-center'>لا يوجد بيانات لعرضها</p>
            }

            <div className='flex gap-4 items-center justify-center flex-wrap'>
                <button className='custom-button2'>تأكيد</button>
                <button onClick={handleAddQuestion} type="button" className='custom-button hover:bg-blue-500'>إضافة سؤال</button>
                <button onClick={handleReset} type="button" className='custom-button hover:bg-blue-500'>إعادة</button>
            </div>
        </form>
    </div>
  )
}

export default FaqPage