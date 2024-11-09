import NavigationComp from 'components/account/NavigationComp'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Order_ListAction } from '../../redux/action/OrderAction'
import OrderCardComp from 'components/order/OrderCardComp'

const OrdersPage = () => {
    const auth = useSelector(state => state.AuthReducer)
    const state = useSelector(state => state.OrderReducer)
    const dispatch = useDispatch()

    // initiate page 
    useEffect(() => {
        if(!state.items?.length && auth.token)
            dispatch(Order_ListAction())
    } , [auth.token])
  return (
    <div className='custom-accountcontainer'>

        {/* list */}
        <NavigationComp/>


        {/* content */}
        <section className='flex flex-col gap-4 lg:col-span-3'>
            {
              state.items.map(e => (
                <OrderCardComp key={e.id} data={e}/>
              ))
            }

        </section>
        
    </div>
  )
}

export default OrdersPage