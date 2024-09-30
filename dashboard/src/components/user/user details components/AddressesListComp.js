import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { User_DeleteAddressAction } from '../../../redux/action/UserAction'
import { formattingDateForUpdate } from 'validation/Validation'

const AddressesListComp = () => {
    const state = useSelector(state => state.UserReducer)
    const dispatch = useDispatch()

    // handle Delete the address 
    const handleDeleteAddress = (id) => {
        dispatch(User_DeleteAddressAction(id))
    }
  return (
    <>
        {
            state.detail == 'address' ? (
            <>
                {
                    !state.address?.total ? <p className='text-sm text-center text-red-500'>لا يوجد عناوين للمستخدم</p> : (
                        <div className='custom-table '>
                            <div className='custom-tablerow bg-mainbg'>
                                <p className='justify-center sticky right-0 bg-mainbg'>م</p>
                                <p className='w-40'>عنوان</p>
                                <p className='justify-center w-40'>اسم</p>
                                <p className='justify-center w-40'>الهاتف</p>
                                <p className='justify-center w-20'>مدينة</p>
                                <p className='justify-center w-20'>محافظة</p>
                                <p className='justify-center w-20'>بلد</p>
                                <p className='justify-center w-20'>رمز بريدي</p>
                                <p className='justify-center w-20'>شركة</p>
                                <p className='justify-center w-20'>افتراضي</p>
                                <p className='justify-center w-40'>تاريخ إنشاء</p>
                                <p className='justify-center w-40'>تاريخ تعديل</p>
                                <p className='justify-center w-10'>حذف</p>
                            </div>
                            {
                                state.address?.items.map((e , index) => (
                                    <div key={index} className='custom-tablerow'>
                                        <p className='justify-center sticky right-0 bg-mainbg'>{e.id}</p>
                                        <p className='w-40'>{e.address}</p>
                                        <p className='justify-center w-40'>{e.name}</p>
                                        <p className='justify-center w-40'>{e.phone}</p>
                                        <p className='justify-center w-20'>{e.city}</p>
                                        <p className='justify-center w-20'>{e.governorate}</p>
                                        <p className='justify-center w-20'>{e.country}</p>
                                        <p className='justify-center w-20'>{e.postal_code}</p>
                                        <p className='justify-center w-20'>{e.company}</p>
                                        <p className='justify-center w-20'>{e.default ? 'افتراضي' : ''}</p>
                                        <p className='justify-center w-40'>{formattingDateForUpdate(e.created_at)}</p>
                                        <p className='justify-center w-40'>{formattingDateForUpdate(e.updated_at)}</p>
                                        <p className='justify-center w-10'><span onClick={() => handleDeleteAddress(e.id)} className="material-symbols-outlined hover:text-red-500 hover:cursor-pointer">delete</span></p>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </>
            ) : null
        }
    </>
  )
}

export default AddressesListComp