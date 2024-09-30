import React from 'react'
import OrderTableRowComp from './OrderTableRowComp'
import { useDispatch, useSelector } from 'react-redux'
import OrderAdditionalTableRowComp from './OrderAdditionalTableRowComp'
import { Order_AdditionalCreateAction } from '../../../redux/action/OrderAction'
import { useLocation } from 'react-router-dom'

const OrdersTableComp = () => {
    const state = useSelector(state => state.OrderReducer)
    const dispatch = useDispatch()
    const location = useLocation()


    const handleAddingAdditional = () => {
        dispatch(Order_AdditionalCreateAction())
    }
    
  return (
    <>
        <div className='custom-table'>
            <div className='custom-tablerow bg-mainbg'>
                <p className='w-10 justify-center'></p>
                <p className='w-20 justify-center'>الصورة</p>
                <p className='w-80'>عنوان المنتج</p>
                <p className='w-40 justify-center'>الكمية</p>
                <p className='w-40 justify-center'>سعر الوحدة</p>
                <p className='w-40 justify-center'>المجموع الفرعي</p>
            </div>
            
            {/* orders table row for products  */}
            {
                state.products?.map((e , index) => 
                    <OrderTableRowComp key={index} data={e}/>
                )
            }

            {/* orders table row for additionals */}
            {
                state.additional?.map((e , index) => 
                    <OrderAdditionalTableRowComp key={e.id} data={{...e}}/>
                )
            }
            
            
            {/* adding additional product  */}
            {
                location.pathname == '/order/create' ? (
                    <button onClick={handleAddingAdditional} type='button' className='custom-button2 text-xs py-1'>إضافة</button>
                ) : null
            }
        
        </div>
    </>
  )
}

export default OrdersTableComp