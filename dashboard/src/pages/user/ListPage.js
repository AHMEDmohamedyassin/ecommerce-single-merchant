import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserList_DeleteAction, UserList_ListAction } from '../../redux/action/UserListAction'
import { formattingDateForUpdate } from 'validation/Validation'
import SearchComp from '../../components/user/SearchComp'
import PaginationComp from 'components/public/PaginationComp'
import { Link } from 'react-router-dom'

const ListPage = () => {
  const state = useSelector(state => state.UserListReducer)
  const dispatch = useDispatch()
  const [showEdit , setShowEdit] = useState(0)

  // pagination and first page load
  const handlePagination = (page = 1) => {
    dispatch(UserList_ListAction({page}))
  }

  // handle deleting user 
  const handleDelete = (id) => {
    dispatch(UserList_DeleteAction(id))
  }

  // initiate loading users data
  useEffect(() => {
    if(!state.total)
      handlePagination()
  } , [])
  return (
    <div className='custom-dashcontainer'>
      <p className='title'>المستخدمين</p>

      {/* search components  */}
      <SearchComp/>

      <div className='custom-table'>

        {/* table header */}
        <div className='custom-tablerow relative'>
          <p className='bg-mainbg justify-center w-10 sticky right-0'>م</p>
          <p className='bg-mainbg w-80'>الاسم</p>
          <p className='bg-mainbg justify-center w-40'>رقم الهاتف</p>
          <p className='bg-mainbg justify-center w-80'>البريد الإليكتروني</p>
          <p className='bg-mainbg justify-center w-40'>حالة البريد الإليكتروني</p>
          <p className='bg-mainbg justify-center w-40'>تاريخ التعديل</p>
          <p className='bg-mainbg justify-center w-40'>تاريخ الإنشاء</p>
          <p className='bg-mainbg justify-center w-10'>حذف</p>
        </div>

        {/* table body */}
        {
          state.items?.map((e , index) => (
            <div key={index} className='custom-tablerow relative'>
              <p onMouseEnter={() => setShowEdit(e.id)} onMouseLeave={() => setShowEdit(0)} className='justify-center w-10 sticky right-0 bg-mainbg'>
                {
                  showEdit == e.id ? 
                  <Link to={`/user/update/${e.id}`}><span className="material-symbols-outlined text-3xl text-blue-500">edit</span></Link>
                  : e.id
                }
              </p>
              <p className='w-80'>{e.name}</p>
              <p className='justify-center w-40'>{e.phone}</p>
              <p className='justify-center w-80'>{e.email}</p>
              <p className='justify-center w-40'>{e.email_verified_at ? "تم التحقق" : "لم يتم التحقق"}</p>
              <p className='justify-center w-40'>{formattingDateForUpdate(e.updated_at)}</p>
              <p className='justify-center w-40'>{formattingDateForUpdate(e.created_at)}</p>
              <p className='justify-center w-10' title={`حذف ${e.name}`}><span onClick={() => handleDelete(e.id)} class="material-symbols-outlined hover:cursor-pointer hover:text-red-500">delete</span></p>
            </div>
          ))
        }
      </div>


      {/* sum of result */}
      <div className='flex items-center gap-2 text-sm text-gray-500'>
        <p>مجموع النتائج : </p>
        <p>{state.total}</p>
      </div>


      {/* pagination */}
      <PaginationComp state={state} handlePagination={handlePagination}/>

    </div>
  )
}

export default ListPage