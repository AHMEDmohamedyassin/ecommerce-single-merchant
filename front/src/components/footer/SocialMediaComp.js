import { APP_URL } from 'Fetch/Url'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const SocialMediaComp = () => {
  const state = useSelector(state => state.AuthReducer)
  const contact = useSelector(state => state.StaticReducer)

  return (
    <>
        <Link to={'/auth/login'} className='custom-button bg-white text-black text-center w-fit hover:bg-maincolor border-transparent hover:text-white'>{state.token ? "بيانات المستخدم" : "تسجيل الدخول"}</Link>
        <div className='flex flex-wrap gap-4'>
            {
              contact.contact?.urls && Object.keys(contact.contact.urls).map((e , index) => (
                <a key={index} className='w-10 rounded-full aspect-square overflow-hidden' href={contact.contact.urls[e] ?? ""} target='_blank'><img loading='lazy' src={`${APP_URL}/images/${e}.png`}/></a>
              ))
            }
        </div>         
        <div className='flex flex-wrap gap-4 text-sm'>
            {
              contact.contact?.whatsapp?.split(/\s+/)?.map((e , index) => (
                  <a key={index} className='' href={`https://api.whatsapp.com/send/?phone=2${e}&text=مرحبا أرغب في التواصل معكم&type=phone_number&app_absent=0`} target='_blank'>{e}</a>
              ))
            }
            {
              contact.contact?.phone?.split(/\s+/)?.map((e , index) => (
                  <a key={index} className='' href={`tel:${e}`} target='_blank'>{e}</a>
              ))
            }
        </div>         
    </>
  )
}

export default SocialMediaComp