import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Static_CreateAction, Static_ReadAction } from '../../redux/action/StaticAction'
import { APP_URL } from 'Fetch/Url'

const ContactPage = () => {
    const state = useSelector(state => state.StaticReducer)
    const dispatch = useDispatch()
    const [data , setData] = useState()


    const socialMedia = [
        {
            title : "رابط صفحة الفيسبوك facebook" ,
            img : `${APP_URL}/images/facebook.png` ,
            name : "facebook"
        },
        {
            title : "رابط صفحة الإنستجرام instagram" ,
            img : `${APP_URL}/images/instagram.png` ,
            name : "instagram"
        },
        {
            title : "رابط صفحة لينكد ان linkedin" ,
            img : `${APP_URL}/images/linkedin.png` ,
            name : "linkedin"
        },
        {
            title : "رابط صفحة سناب شات snapchat" ,
            img : `${APP_URL}/images/snapchat.png` ,
            name : "snapchat"
        },
        {
            title : "رابط صفحة تلجرام telegram" ,
            img : `${APP_URL}/images/telegram.png` ,
            name : "telegram"
        },
        {
            title : "رابط صفحة تيك توك tiktok" ,
            img : `${APP_URL}/images/tiktok.png` ,
            name : "tiktok"
        },
        {
            title : "رابط صفحة تويتر twitter" ,
            img : `${APP_URL}/images/twitter.png` ,
            name : "twitter"
        },
        {
            title : "رابط صفحة وي شات wechat" ,
            img : `${APP_URL}/images/wechat.png` ,
            name : "wechat"
        },
        {
            title : "رابط قناة واتساب whatsapp channel" ,
            img : `${APP_URL}/images/whatsapp.png` ,
            name : "whatsapp"
        },
    ]

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
                <div className='flex items-center gap-2'>
                    <span className="material-symbols-outlined">location_on</span>
                    <label>العنوان :</label>
                </div>
                <textarea value={data?.address} onChange={input => setData(ele => ({...ele , "address" : input.target.value}))} placeholder='العنوان'></textarea>
            </div>

            <div className={`custom-inputcontainer`}>
                <div className='flex items-center gap-2'>
                    <span className="material-symbols-outlined">schedule</span>
                    <label>مواعيد العمل :</label>
                </div>
                <textarea value={data?.work} onChange={input => setData(ele => ({...ele , "work" : input.target.value}))} placeholder='مواعيد العمل'></textarea>
            </div>

            <div className={`custom-inputcontainer`}>
                <div className='flex items-center gap-2'>
                    <span className="material-symbols-outlined">phone</span>
                    <label>أرقام الهاتف ( يجب الفصل بينها بمسافة ) :</label>
                </div>
                <textarea value={data?.phone} onChange={input => setData(ele => ({...ele , "phone" : input.target.value}))} placeholder='أرقام الهاتف'></textarea>
            </div>

            <div className={`custom-inputcontainer`}>
                <div className='flex items-center gap-2'>
                    <img className='aspect-square rounded-full w-6' src={`${APP_URL}/images/whatsapp.png`} loading='lazy'/>
                    <label>أرقام الواتساب ( يجب الفصل بينها بمسافة ) :</label>
                </div>
                <textarea value={data?.whatsapp} onChange={input => setData(ele => ({...ele , "whatsapp" : input.target.value}))} placeholder='أرقام الواتساب'></textarea>
            </div>

            <div className={`custom-inputcontainer gap-2`}>
                <div className='flex items-center gap-2'>
                    <span className="material-symbols-outlined">mail</span>
                    <label>البريد الإليكتروني ( يجب الفصل بينها بمسافة ) :</label>
                </div>
                <textarea value={data?.email} onChange={input => setData(ele => ({...ele , "email" : input.target.value}))} placeholder='البريد الإليكتروني'></textarea>
            </div>

            <hr></hr>

            {/* social media url  */}

            <div className='text-xs text-gray-500'>روابط وسائل التواصل الإجتماعي</div>
            
            {
                socialMedia?.map((e , index) => (
                    <div key={index} className={`custom-inputcontainer gap-2`}>
                        <div className='flex items-center gap-4'>
                            <img className='aspect-square rounded-full w-6' src={e.img} loading='lazy'/>
                            <label>{e.title} :</label>
                        </div>
                        <input value={data?.urls && data.urls[e.name] ? data.urls[e.name] :""} onChange={input => setData(ele => ({...ele , urls : {...ele.urls , [e.name] : input.target.value} }))} placeholder={e.title}></input>
                    </div>
                ))
            }

            {/* buttons  */}
            <div className='flex gap-4 items-center justify-center flex-wrap'>
                <button className='custom-button2'>تأكيد</button>
                <button onClick={handleReset} type="button" className='custom-button hover:bg-blue-500'>إعادة</button>
            </div>

        </form>
    </div>
  )
}

export default ContactPage