import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { OrderList_ListAction } from '../../redux/action/OrderListAction'
import OrderTableComp from 'components/orderlist/OrderTableComp'
import PaginationComp from 'components/public/PaginationComp'
import { formattingOrderStatus } from 'validation/OrderValidation'
import { Link } from 'react-router-dom'

const ListPage = () => {
    const state = useSelector(state => state.OrderListReducer)
    const dispatch = useDispatch()

    const handlePaginate = (page = 1) => {
        dispatch(OrderList_ListAction({page}))
    }
    
    const handleSelectStatus = (status = "all") => {
        dispatch(OrderList_ListAction({status}))
    } 

    useEffect(() => {
        if(!state.total)
            handlePaginate()
    } , [])
  return (
    <div className='custom-dashcontainer'>
        <div className='title_container'>
          <p>الطلابات</p>
          <Link to={'/order/create'} className=''>
            <span className="material-symbols-outlined">add</span>
            <span>إضافة طلب</span>  
          </Link>
        </div>

        {/* select order status */}
        <select onChange={e => handleSelectStatus(e.target.value)} className='custom-border'>
            <option value={"all"}>الكل</option>
            <option value={"pending"}>{formattingOrderStatus("pending")}</option>
            <option value={"ready"}>{formattingOrderStatus("ready")}</option>
            <option value={"preparing"}>{formattingOrderStatus("preparing")}</option>
            <option value={"success"}>{formattingOrderStatus("success")}</option>
            <option value={"canceled"}>{formattingOrderStatus("canceled")}</option>
            <option value={"canceled without refund"}>{formattingOrderStatus("canceled without refund")}</option>
        </select>

        {/* Orders table */}
        <OrderTableComp/>

        {/* pagination component */}
        <PaginationComp state={state} handlePagination={handlePaginate}/>
    </div>
  )
}

export default ListPage