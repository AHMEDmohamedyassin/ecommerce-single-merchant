import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Setting_ListAction, Setting_UpdateAction } from '../redux/action/SettingAction'

const SettingPage = () => {
    const state = useSelector(state => state.SettingReducer)
    const dispatch = useDispatch()

    // handle update
    const handleUpdate = (form , id) => {
        form.preventDefault()
        const from = new FormData(form.target)
        let value = from.get('value')

        dispatch(Setting_UpdateAction({id , value}))
    }

    // getting data 
    useEffect(() => {
        dispatch(Setting_ListAction())
    } , [])
  return (
    <div className='custom-dashcontainer'>
        <p className='title'>الإعدادات</p>

        <div className='flex flex-col gap-4 w-full'>
            {
                state.items?.sort((a , b) => b.updatable - a.updatable)?.map((e,index) => {
                    if(['auto_public_review' , 'allow_coupon' , 'allow_paymentgateway' , 'allow_cachier'].includes(e.slug))
                        return (
                            <>
                                <form onSubmit={ele => handleUpdate(ele , e.id)} key={index} className='custom-inputcontainer'>
                                    <label>{e.title}</label>
                                    <div className='flex items-end gap-16'>
                                        <div>
                                            <label>نعم</label>
                                            <input disabled={!e.updatable} type='radio' name='value' value={1} defaultChecked={e.value == 1} />
                                        </div>
                                        <div>
                                            <label>لا</label>
                                            <input  disabled={!e.updatable} type='radio' name='value' value={0} defaultChecked={e.value == 0} />
                                        </div>
                                        {
                                            e.updatable ? 
                                                <button className='custom-button2 mx-2'>تأكيد</button>
                                            :null
                                        }
                                    </div>
                                </form>
                            </>
                        )
                    else if(['ORDER_EMAIL_NOTIFICATION'].includes(e.slug))
                        return (
                            <>
                                <form onSubmit={ele => handleUpdate(ele , e.id)} key={index} className='custom-inputcontainer w-full'>
                                    <label>{e.title}</label>
                                    <div className='flex items-end gap-4 w-full'>
                                        <input disabled={!e.updatable} maxLength={255} name='value' defaultValue={e.value} />
                                        {
                                            e.updatable ? 
                                                <button className='custom-button2'>تأكيد</button>
                                            :null
                                        }
                                    </div>
                                </form>
                            </>
                        )
                    else return (
                        <form onSubmit={ele => handleUpdate(ele , e.id)} key={index} className='custom-inputcontainer'>
                            <label>{e.title}</label>
                            <div className='flex items-end gap-4'>
                                <input disabled={!e.updatable} maxLength={255} type='number' name='value' defaultValue={e.value} />
                                {
                                    e.updatable ? 
                                        <button className='custom-button2'>تأكيد</button>
                                    :null
                                }
                            </div>
                        </form>
                    )
                })
            }
        </div>
    </div>
  )
}

export default SettingPage