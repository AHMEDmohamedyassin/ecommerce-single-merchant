import PermissionCardComp from 'components/permission/PermissionCardComp'
import RoleCardComp from 'components/permission/RoleCardComp'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Permission_ListAction, Role_ListAction } from '../redux/action/PermissionAction'
import PermissionCreateComp from 'components/permission/PermissionCreateComp'

const PermissionPage = () => {
    const state = useSelector(state => state.PermissionReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(Role_ListAction())    
        dispatch(Permission_ListAction())    
    } , [])

  return (
    <div className='custom-dashcontainer'>
        <p className='title'>الصلاحيات</p>

        {/* create permission component  */}
        <PermissionCreateComp/>

        <div className='flex flex-col'>
            {
                state.roles?.map((e) => (
                    <div key={e.id}>
                        <RoleCardComp  data={e}/>
                    </div>
                ))
            }
            {
                !state.roles?.length ? <p className='text-red-500 text-center'>لا توجد صلاحيات لعرضها</p> : null
            }
        </div>
    </div>
  )
}

export default PermissionPage