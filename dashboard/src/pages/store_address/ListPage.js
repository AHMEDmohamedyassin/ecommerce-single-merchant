import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StoreAddress_DeleteAction, StoreAddress_ListAction } from '../../redux/action/StoreAddressAction'
import { formattingDateForUpdate } from 'validation/Validation'
import { Link } from 'react-router-dom'

const ListPage = () => {
    const state = useSelector(state => state.StoreAddressReducer)
    const dispatch = useDispatch()
    const [edit , setEdit] = useState(null)

    const handleDelete = id => {
        dispatch(StoreAddress_DeleteAction(id))
    }

    useEffect(() => {
        dispatch(StoreAddress_ListAction())    
    } , [])
  return (
    <div className='custom-dashcontainer'>
        <div className='title_container'>
          <p>الفروع</p>
          <Link to={'/store-address/create'} className=''>
            <span className="material-symbols-outlined">add</span>
            <span>إضافة فرع</span>  
          </Link>
        </div>

        <div className='custom-table'>
            {/* table header */}
            <div className='custom-tablerow bg-mainbg'>
                <p className='w-10 justify-center sticky right-0 bg-mainbg'>م</p>
                <p className='w-80'>العنوان</p>
                <p className='w-20 justify-center'>حالة الفرع</p>
                <p className='w-80'>أرقام الهاتف</p>
                <p className='w-80'>أرقام الواتساب</p>
                <p className='w-80'>الريد الإليكتروني</p>
                <p className='w-80'>مواعيد العمل</p>
                <p className='w-40 justify-center'>تاريخ التعديل</p>
                <p className='w-40 justify-center'>تاريخ الإنشاء</p>
                <p className='w-10 justify-center'>حذف</p>
            </div>

            {/* table body */}
            {
                state.items?.map((e , index) => (
                    <div key={index} className='custom-tablerow'>
                        <p onMouseEnter={() => setEdit(e.id)} onMouseLeave={() => setEdit(null)} className='w-10 justify-center sticky right-0 bg-mainbg'>
                            {
                                edit == e.id ? <Link to={`/store-address/update/${e.id}`}><span className="material-symbols-outlined text-3xl hover:text-blue-500">edit</span></Link> : e.id
                            }
                        </p>
                        <p className='w-80'>{e.address}</p>
                        <p className='w-20 justify-center'>{e.primary ? "فرع رئيسي" : ""}</p>
                        <p className='w-80'>{e.json?.phone}</p>
                        <p className='w-80'>{e.json?.whatsapp}</p>
                        <p className='w-80'>{e.json?.email}</p>
                        <p className='w-80'>{e.json?.work}</p>
                        <p className='w-40 justify-center'>{formattingDateForUpdate(e.updated_at)}</p>
                        <p className='w-40 justify-center'>{formattingDateForUpdate(e.created_at)}</p>
                        <p className='w-10 justify-center' onClick={() => handleDelete(e.id)}><span className="material-symbols-outlined hover:text-red-500">delete</span></p>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default ListPage