import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Role_ListAction, Role_UserAppendAction } from '../../../redux/action/PermissionAction'
import { useForm } from 'react-hook-form'

const RolesComp = () => {
    const dispatch = useDispatch() 
    const permission = useSelector(state => state.PermissionReducer)
    const user = useSelector(state => state.UserReducer)
    const [show , setShow] = useState(false)

    const {
        register , 
        handleSubmit , 
        formState:{errors}} = useForm({
        mode:"onBlur" , 
    })

    // submitting form by appending permissions
    const submitHandle = (data) => {
        dispatch(Role_UserAppendAction(data))
    }

    // fetching permissions
    useEffect(() => {
        dispatch(Role_ListAction())
    } , [])
  return (
    <div className='custom-dashcontainer'>
        <div className='flex justify-between items-start'>
            <p className='title'>الأدوار</p>
            {
                show ? 
                <span onClick={() => setShow(false)} className="material-symbols-outlined text-4xl">stat_1</span>
                :
                <span onClick={() => setShow(true)} className="material-symbols-outlined text-4xl">stat_minus_1</span>
            }
        </div>

        {
            show ? (
                <>
                    {/* form containing list of roles */}
                    <form onSubmit={handleSubmit(submitHandle)} className='w-full grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-2 '>
                        {
                            permission.roles?.map((e , index) => 
                                <div key={index} className='flex items-center gap-2'>
                                    <input {...register("role_id")} value={e.id} defaultChecked={user.role?.find(ele => ele.id == e.id)} type='checkbox' />
                                    <p>{e.title?.length ? e.title : e.slug}</p>
                                </div>
                            )
                        }
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

export default RolesComp