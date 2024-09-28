import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Permission_ListAction, Permission_UserAppendAction, Role_ListAction } from '../../../redux/action/PermissionAction'
import PermissionCardComp from 'components/permission/PermissionCardComp'
import { useForm } from 'react-hook-form'
import SectionTitleComp from '../SectionTitleComp'

const PermissionsComp = () => {
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
        dispatch(Permission_UserAppendAction(data))
    }

    // fetching permissions
    useEffect(() => {
        dispatch(Permission_ListAction())
    } , [])
  return (
    <div className='custom-dashcontainer'>
        {/* section title with toggle arrow button */}
        <SectionTitleComp title={'الصلاحيات'} section={'permission'}/>

        {
            user.section == 'permission' ? (
                <>
                    {/* form containing list of permissons */}
                    <form onSubmit={handleSubmit(submitHandle)} className='w-full grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-2 '>
                        {
                            permission.permissions?.map((e , index) => 
                                <div key={index} className='flex items-center gap-2'>
                                    <input {...register("permission_id")} value={e.id} defaultChecked={user.permission?.find(ele => ele.id == e.id)} type='checkbox' />
                                    <p>{e.title?.length ? e.title : e.slug}</p>
                                </div>
                            )
                        }
                    </form>
                    
                    {/* submitting button */}
                    <div className='flex justify-center mt-10'>
                        <button onClick={handleSubmit(submitHandle)} className='custom-button2'>تأكيد</button>
                    </div>
                </>
            ) : <div className='text-center -mb-10'><span className="material-symbols-outlined text-5xl">more_horiz</span></div>
        }
    </div>
  )
}

export default PermissionsComp