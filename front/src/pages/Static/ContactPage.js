import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Static_ContactSendAction, Static_ListStoresAction, Static_ReadAction } from '../../redux/action/StaticAction'
import { ContactValidation } from 'validations/ContactValidation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { APP_URL } from 'Fetch/Url'

const ContactPage = () => {
  const dispatch = useDispatch()
  const state = useSelector(state => state.StaticReducer)
  const auth = useSelector(state => state.AuthReducer)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    mode : "onBlur" ,
    resolver: zodResolver(ContactValidation)
  });

  // sending contact message
  const submitFrom = (data)  => {
    dispatch(Static_ContactSendAction(data))
    reset()
  }

  useEffect(() => {
    dispatch(Static_ReadAction('contact'))
    dispatch(Static_ListStoresAction())
  } , [])
  return (
    <div className='custom-container'>
      
      <div className='grid sm:grid-cols-2 gap-10'>

        {/* contact form  */}
        <form onSubmit={handleSubmit(submitFrom)} className='flex flex-col gap-4'>
          
          <p className='font-bold text-lg'>اترك لنا رسالة</p>

          {
            !auth.token ? (
              <>
                {/* name input */}
                <div className='custom-inputcontainer2'>
                  <label>الاسم</label>
                  <input {...register('name')} />
                  {errors.name && <p>{errors.name.message}</p>}
                </div>
                
                {/* email input */}
                <div className='custom-inputcontainer2'>
                  <label>بريدك الاليكتروني</label>
                  <input {...register('email')} />
                  {errors.email && <p>{errors.email.message}</p>}
                </div>
                
                {/* phone input */}
                <div className='custom-inputcontainer2'>
                  <label>رقم الهاتف</label>
                  <input {...register('phone')} />
                  {errors.phone && <p>{errors.phone.message}</p>}
                </div>
              </>
            ) : null
          }
          
          {/* msg input */}
          <div className='custom-inputcontainer2'>
            <label>رسالتك</label>
            <textarea {...register('msg')} rows={10} />
            {errors.msg && <p>{errors.msg.message}</p>}
          </div>


          <button className='custom-button py-2 border-black hover:border-secondarycolor hover:bg-secondarycolor hover:text-white font-semibold'>إرسال</button>

        </form>




        {/* contact details  */}
        <div>

          <p className='font-bold text-lg'>طرق التواصل</p>
          
          <div className='flex flex-col gap-4 mt-6  text-gray-500'>


            <p className='text-xs'>نحن نحب أن نسمع منكم على خدمة العملاء لدينا، أو المنتجات، أو الموقع الإلكتروني أو أي موضوعات تريد مشاركتها معنا. سيكون موضع تقدير تعليقاتك واقتراحاتك. يرجى ملء النموذج أدناه.</p>


            {
              (state?.stores?.length && state?.stores?.map((e , index) => (
                <p key={e.id} className='flex items-center gap-2'>
                  <span className={`material-symbols-outlined text-xl`}>location_on</span>
                  <span className={` ${e.primary ? 'font-bold' : ''}`}>{e.address}</span>
                </p>
              )))
            }


            {/* address if exists  */}
            {
              state?.contact?.address?.length ? (
                <p className='flex items-center gap-2'>
                  <span className="material-symbols-outlined text-xl">location_on</span>
                  <span>{state.contact?.address}</span>
                </p>
              ) : null
            }


            {/* email  */}
            {
              state?.contact?.email?.length ? state.contact.email.split(/\s+/).map((e , index) =>  (
                <a key={index} href={`mailto:${e}`} className='flex items-center gap-2' target='_blank'>
                  <span className="material-symbols-outlined text-xl">mail</span>
                  <span>{e}</span>
                </a>
              )) : null
            }


            {/* working hours  */}
            {
              state?.contact?.work?.length ? (
                <p className='flex items-center gap-2'>
                  <span className="material-symbols-outlined text-xl">schedule</span>
                  <span>{state.contact?.work}</span>
                </p>
              ) : null
            }


            {/* phone */}
            {
              state.contact?.phone?.length ? state.contact.phone.split(/\s+/).map((e, index) =>  (
                <a key={index} href={`tel:${e}`} className='flex items-center gap-2' target='_blank'>
                  <span className="material-symbols-outlined text-xl">phone</span>
                  <span>{e}</span>
                </a>
              )) : null
            }


            {/* whatsapp */}
            {
              state.contact?.whatsapp?.length ? state.contact.whatsapp.split(/\s+/).map((e , index) => (
                <a key={index} href={`https://api.whatsapp.com/send/?phone=2${e}&text=مرحبا أرغب في التواصل معكم&type=phone_number&app_absent=0`} className='flex items-center gap-2' target='_blank'>
                  <img className='aspect-square w-6 rounded-full' src={`${APP_URL}/images/whatsapp.png`} loading='lazy'/>
                  <span>{e}</span>
                </a>
              )) : null
            }


            {/* social media urls  */}
            {
              state.contact?.urls && Object.keys(state.contact.urls).map((e , index) => (
                <a key={index} href={state.contact.urls[e] ? state.contact.urls[e] : ""} className='flex items-center gap-2' target='_blank'>
                  <img className='aspect-square w-6 rounded-full' src={`${APP_URL}/images/${e}.png`} loading='lazy'/>
                  <span>{state.contact.urls[e] ? state.contact.urls[e] : ""}</span>
                </a>
              ) ) 
            }

          </div>

        </div>




      </div>

    </div>
  )
}

export default ContactPage