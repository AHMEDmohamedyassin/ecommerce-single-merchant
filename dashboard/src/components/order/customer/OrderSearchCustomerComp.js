import SearchComp from 'components/public/SearchComp'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserList_ListAction } from '../../../redux/action/UserListAction'

const OrderSearchCustomerComp = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.UserListReducer)
    const order = useSelector(state => state.OrderReducer)

    // selecting user
    const handleSelectUser = user => {
        dispatch({type : "Order_Data" , data : {user}})
    }

    // reset selecting user
    const handleReset = () => {
        dispatch({type : "Order_Data" , data : {user : null}})
    }

  return (
        <>
            {
                order.user ? (
                    <div onClick={handleReset} className='text-sm py-2 custom-border border-x-0 bg-mainbg hover:cursor-pointer grid grid-cols-3'>
                        <p className=''>{order.user?.name}</p>
                        <p>{order.user?.phone}</p>
                        <p>{order.user?.email}</p>
                    </div>
                ) : (
                    <div>
                        <p className='text-sm text-gray-500 mb-4'>ابحث عن العميل</p>

                        <SearchComp placeholder={'بحث باسم المستخدم و رقم الهاتف و البريد الإليكتروني'} state={user} action={UserList_ListAction} />

                        {/* listing users  */}
                        <div className='flex flex-col mt-4 px-4'>
                            {
                                user.items?.map((e , index) => (
                                    <div key={index} onClick={() => handleSelectUser(e)} className='text-sm py-2 custom-border border-x-0 hover:bg-mainbg hover:cursor-pointer grid grid-cols-3'>
                                        <p className=''>{e.name}</p>
                                        <p>{e.phone}</p>
                                        <p>{e.email}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </>
  )
}

export default OrderSearchCustomerComp