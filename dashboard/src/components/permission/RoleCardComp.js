import React, { useState } from 'react'
import PermissionCardComp from './PermissionCardComp'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { RoleValidation } from '../../validation/RoleValidation'
import { Role_DeleteAction, Role_UpdateAction } from '../../redux/action/PermissionAction'

const RoleCardComp = ({data}) => {
    const state = useSelector(state => state.PermissionReducer)
    const dispatch = useDispatch()
    const [showPermissions , setShowPermissions] = useState(false)

    // form hook
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode : "onBlur" ,
        defaultValues:{
            title : data.title?.length ? data.title : data.slug ,
            description : data.description  
        },
        resolver: zodResolver(RoleValidation)
    });

    // update role handeling
    const handleRoleUpdate = (form_data) => {
        dispatch(Role_UpdateAction({...form_data , id : data.id}))
    }

    // delete role
    const deleteHandle = () => {
        dispatch(Role_DeleteAction(data.id))
    }

  return (
        <form onSubmit={handleSubmit(handleRoleUpdate)}  className='flex flex-col custom-border border-x-0 '>
            {/* role title and description  */}
            <div className='flex justify-between items-center gap-4 py-4'>
                <div className='flex items-start max-lg:flex-wrap gap-x-4 gap-y-2 w-full'>
                    {/* role title */}
                    <div>
                        <input {...register("title")} className='font-semibold' />
                        {errors.title && <p className='text-xs text-red-500'>{errors.title.message}</p>}
                    </div>

                    {/* role description */}
                    <div className='w-full'>
                        <input {...register("description")} placeholder='اضف وصفا للدور' className='font-light text-gray-500 w-full' />
                        {errors.description && <p className='text-xs text-red-500'>{errors.description.message}</p>}
                    </div>
                </div>

                {/* button to show permissions of role */}
                <span onClick={() => setShowPermissions(!showPermissions)} style={{rotate:showPermissions?"180deg" : "0deg"}} className="material-symbols-outlined hover:cursor-pointer">keyboard_arrow_down</span>
            </div>

            {/* permissions list */}
            {
                showPermissions ? (
                    <div className='flex flex-wrap gap-8 p-4'>
                        <div className='w-full grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-2 '>
                            {
                                state.permissions?.map((e , index) => 
                                    <PermissionCardComp key={index} data={e} register={register} checked={data.permission.find(ele => ele.id == e.id)}/>
                                )
                            }
                        </div>

                        {/* delete and update button of role */}
                        <div className='flex justify-between items-center flex-wrap gap-x-4 gap-y-2'>
                            <button type='submit' className='custom-button2'>تأكيد</button>
                            <button onClick={deleteHandle} type='button' className='custom-button2 '>حذف الدور</button>
                        </div>
                    </div>
                ) : null
            }
        </form>
  )
}

export default RoleCardComp