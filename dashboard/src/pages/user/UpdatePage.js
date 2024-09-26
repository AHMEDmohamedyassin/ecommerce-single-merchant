import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { User_DeleteAction, User_ReadAction, User_UpdateAction } from '../../redux/action/UserAction'
import { useForm } from 'react-hook-form'
import { UpdateUserValidation } from '../../validation/UserValidation'
import { zodResolver } from '@hookform/resolvers/zod'
import { ValidateInputChanges } from 'validation/Validation'
import UpdateUserFormComp from 'components/user/UpdateUserFormComp'
import UserDetailFormComp from 'components/user/UserDetailFormComp'
import AddressCreateComp from 'components/user/AddressCreateComp'
import PermissionsComp from 'components/user/permission_roles/PermissionsComp'
import RolesComp from 'components/user/permission_roles/RolesComp'

const UpdatePage = () => {
    const state = useSelector(state => state.UserReducer)
    const dispatch = useDispatch()
    const params = useParams()
    const navigate = useNavigate()

    
    // getting user data
    useEffect(() => {
        dispatch(User_ReadAction(params.id))
    } , [])
  return (
    <>
        {
            state.status == "n"  && !state.phone ? <p className='text-center text-sm text-red-500'>المستخدم غير موجود</p> 
            : (
                <>
                    {/* update main user informations */}
                    <UpdateUserFormComp/>

                    {/* showing and updating user detailed informations */}
                    <UserDetailFormComp/>

                    {/* creating address to user */}
                    <AddressCreateComp/>

                    {/* permissions  */}
                    <PermissionsComp/>

                    {/* roles  */}
                    <RolesComp/>
                </>
            )
        }
    </>
  )
}

export default UpdatePage