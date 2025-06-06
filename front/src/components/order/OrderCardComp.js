import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Order_PayingForOrderAction } from '../../redux/action/OrderAction'
import { formattingDateForUpdate } from '../../validations/Validation'

const OrderCardComp = ({data}) => {
  const setting = useSelector(state => state.SettingReducer)
  const dispatch = useDispatch()

  // handle paying
  const handlePaying = () => {
    dispatch(Order_PayingForOrderAction(data.id))
  }
  return (
            <div className='flex flex-col border-gray-300 border-b-0 border-[1px] shadow'>
                
                {/* order creation date */}
                <div className='w-full grid grid-cols-2  border-inherit border-b-[1px]'>
                    <div className='p-2 text-sm text-gray-500 border-inherit border-e-[1px]'>تارخ الطلب</div>
                    <div className='p-2 text-sm'>{formattingDateForUpdate(data.created_at)}</div>
                </div>
                
                {/* order sum  */}
                <div className='w-full grid grid-cols-2  border-inherit border-b-[1px]'>
                    <div className='p-2 text-sm text-gray-500 border-inherit border-e-[1px]'>المجموع</div>
                    <div className='p-2 text-sm'>{data.cart_total} <span className='px-4 text-gray-500'>جنيه</span></div>
                </div>
                
                
                {/* order shipping address */}
                <div className='w-full grid grid-cols-2  border-inherit border-b-[1px]'>
                    <div className='p-2 text-sm text-gray-500 border-inherit border-e-[1px]'>عنوان التوصيل</div>
                    <div className='p-2 text-sm'>{data.shipping_address?.address}</div>
                </div>

                {/* order status and paying button  */}
                <div className='w-full grid grid-cols-2  border-inherit border-b-[1px]'>
                    <div className='p-2 text-sm text-gray-500 border-inherit border-e-[1px]'>حالة الطلب</div>
                    <div className='p-2 text-sm flex max-lg:flex-wrap lg:justify-between lg:items-center gap-2'>
                      <span className={`${data.status == "success" ? "text-green-500" : "" } ${data.status?.includes('cancel') ? "text-red-500" : "" }`}>{data.ar_status}</span>
                      {
                        data.status == "pending" && setting.items.find(e => e.slug == 'allow_paymentgateway' && parseInt(e.value)) ? 
                          <button onClick={handlePaying} className='custom-button2 lg:mx-4 bg-secondarycolor hover:bg-maincolor py-1'>ادفع الان</button>
                        :null
                      }
                    </div>
                </div>
                
            </div>
  )
}

export default OrderCardComp