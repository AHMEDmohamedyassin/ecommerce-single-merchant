import OrderCustomerStateComp from 'components/order/customer/OrderCustomerStateComp'
import OrderCouponComp from 'components/order/OrderCouponComp'
import OrderSerialFormComp from 'components/order/OrderSerialFormComp'
import OrderTotalComp from 'components/order/OrderTotalComp'
import OrdersTableComp from 'components/order/products_table/OrdersTableComp'
import OrderStatusComp from 'components/order/OrderStatusComp'
import { useDispatch, useSelector } from 'react-redux'
import { Order_CreateAction } from '../../redux/action/OrderAction'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const CreatePage = () => {
    const state = useSelector(state => state.OrderReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // submit creating the order
    const SubmitOrder = () => {
        dispatch(Order_CreateAction())    
    }

    // navigation on success creating the prodcut
    useEffect(() => {
        if(state.status == 'sc'){
            dispatch({type:"Order_Status" , data : "n"})
            navigate(`/order/review/${state.id}`)
        }

    } , [state.status])

    // reset the store
    useEffect(() => {
        dispatch({type : "Order_Reset"  })
    } , [])
  return (
    <div className='custom-dashcontainer'>
        <p className='title'>إنشاء طلب</p>

        {/* products table  */}
        <OrdersTableComp/>

        {/* serial form */}
        <OrderSerialFormComp/>

        {/* total of order  */}
        <OrderTotalComp/>

        <div className='flex flex-col gap-10'>

            {/* coupon for order */}
            <OrderCouponComp/>

            {/* creating or select user from existed  */}
            <OrderCustomerStateComp/>

            {/* order status  */}
            <OrderStatusComp/>

            <div className='flex justify-center'>
                <button type='button' onClick={SubmitOrder} className='custom-button2'>تأكيد</button>
            </div>

        </div>
    </div>
  )
}

export default CreatePage