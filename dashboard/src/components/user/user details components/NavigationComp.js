import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { User_DetailAction } from '../../../redux/action/UserAction'

const NavigationComp = () => {
    const state = useSelector(state => state.UserReducer)
    const dispatch = useDispatch()
    const sections = [
        {
            value : "coupon" ,
            title : "الكوبونات المستخدمة"
        } ,
        {
            value : "order" ,
            title : "الطلبات"
        } ,
        {
            value : "review" ,
            title : "المراجعات"
        } ,
        {
            value : "contact" ,
            title : "طلبات التواصل"
        } ,
        {
            value : "block" ,
            title : "الحظر"
        } ,
        {
            value : "favorite" ,
            title : "المفضلة"
        } ,
        {
            value : "cart" ,
            title : "سلة المشتريات"
        } ,
        {
            value : "transaction" ,
            title : "عمليات الدفع"
        } ,
        {
            value : "address" ,
            title : "العناوين"
        } ,
    ]

    // getting user details accourding to selected
    const handleSelect = (val) => {
        dispatch(User_DetailAction(val))
    }
  return (
        <div className='mb-10'>
            {
                sections.map((e , index) => (
                    <button key={index} onClick={() => handleSelect(e.value)} className={`custom-button ${state.detail == e.value ? "bg-maincolor text-white" : ""}`}>{e.title}</button>
                ))
            }
        </div>
  )
}

export default NavigationComp