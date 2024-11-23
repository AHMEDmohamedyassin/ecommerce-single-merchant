import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { useReactToPrint } from 'react-to-print'
import { formattingDateForUpdate } from 'validation/Validation'

const OrderPrintComp = () => {
    const state = useSelector(state => state.OrderReducer)
    const contentRef = useRef()
    const reactToPrintLarge = useReactToPrint({ contentRef , pageStyle : `@page { size: A4; margin: 0}` , bodyClass : "print-body" });
    const reactToPrintSmall = useReactToPrint({ contentRef , pageStyle : `@page { size: A5; margin: 0}` , bodyClass : "print-body" });


  return (
    <div className='z-20'>
        <div className='flex gap-4 items-center mb-4'>
            <button onClick={reactToPrintSmall} className='custom-button flex items-center gap-2 rounded-lg'>
                <span className="material-symbols-outlined">print</span>
                <span>طباعة فاترة صغيرة</span>
            </button>
            <button onClick={reactToPrintLarge} className='custom-button flex items-center gap-2 rounded-lg'>
                <span className="material-symbols-outlined">print</span>
                <span>طباعة فاتورة كبيرة</span>
            </button>
        </div>


        {/* printing coneent */}
        <div dir='rlt' ref={contentRef} className="p-6 border rounded-lg bg-gray-100 w-full mx-auto">
          <h1 className="text-3xl font-bold text-center mb-4">فاتورة</h1>
          <p className="text-right mb-2">التاريخ: {formattingDateForUpdate(state.updated_at)}</p>
          <p className="mb-6">رقم الطلب : {state.id}</p>

          <table className="table-auto min-w-full mb-6">
            <thead>
              <tr className="bg-gray-200">
                <th className="w-3/6 px-4 py-2 text-center">عنصر</th>
                <th className="w-1/6 px-4 py-2 text-center">سعر</th>
                <th className="w-1/6 px-4 py-2 text-center">كمية</th>
                <th className="w-1/6 px-4 py-2 text-center">مجموع</th>
              </tr>
            </thead>
            <tbody>
                {
                    state.products.map(e => (
                        <tr key={e.id} className="border-t overflow-hidden">
                            <td className="px-4 py-2 text-sm"><p className='line-clamp-3'>{e.title}</p> </td>
                            <td className="px-4 py-2">{e.price} ج</td>
                            <td className="px-4 py-2">{e.count}</td>
                            <td className="px-4 py-2">{e.price * e.count} ج</td>
                        </tr>
                    ))
                }
                {
                    state.additional.map((e , index) => (
                        <tr key={index} className="border-t overflow-hidden">
                            <td className="px-4 py-2 text-sm"><p className='line-clamp-3'>{e.title}</p> </td>
                            <td className="px-4 py-2">{e.price} ج</td>
                            <td className="px-4 py-2">{e.quantity}</td>
                            <td className="px-4 py-2">{e.price * e.quantity} ج</td>
                        </tr>
                    ))
                }
            </tbody>
          </table>

        
        {/* in case of coupon  */}
          {
            state.coupon ? (
                <>
                    <div className="text-right mb-2">
                        <p className="">المجموع : {state.cart_total} جنيه</p>
                    </div>
                    <div className="text-right mb-2">
                        <p className="">قسيمة شراء : {state.coupon.value} جنيه</p>
                    </div>
                </>
            ) : null
          }

          {/* sum  */}
          <div className="text-right">
            <p className="text-xl font-bold">المجموع الكلي: {state.coupon?.value ? state.cart_total - state.coupon.value : state.cart_total} جنيه</p>
          </div>

          <div className='w-full text-center mt-6'>{window.globalConfig?.APP_NAME}</div>
        </div>

    </div>
  )
}

export default OrderPrintComp