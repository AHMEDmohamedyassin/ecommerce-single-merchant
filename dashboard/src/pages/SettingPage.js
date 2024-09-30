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

        console.log(value)
        dispatch(Setting_UpdateAction({id , value}))
    }

    // getting data 
    useEffect(() => {
        dispatch(Setting_ListAction())
    } , [])
  return (
    <div className='custom-dashcontainer'>
        <p className='title'>الإعدادات</p>

        <div className='flex flex-col gap-4'>
            {
                state.items?.map((e,index) => (
                    <form onSubmit={ele => handleUpdate(ele , e.id)} key={index} className='custom-inputcontainer'>
                        <label>{e.title}</label>
                        <div className='flex items-end gap-4'>
                            <input maxLength={255} type='number' name='value' defaultValue={e.value} />
                            <button className='custom-button2'>تأكيد</button>
                        </div>
                    </form>
                ))
            }
        </div>
    </div>
  )
}

export default SettingPage