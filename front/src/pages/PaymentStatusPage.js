import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const PaymentStatusPage = () => {
    const location = useLocation()
    const params = new URLSearchParams(location.search)

  return (
    <div className='custom-container min-h-[50vb] flex flex-col items-center justify-center'>

        <div className='p-6 flex flex-col items-center gap-4 bg-secondarybg rounded-lg shadow-lg lg:min-w-96 max-lg:w-3/4 max-sm:w-fit'>
            {
                location.pathname == '/payment/success' ? 
                <p className='font-bold text-lg text-green-500'>عملية دفع ناجحة</p> : null
            }
            {
                location.pathname == '/payment/fail' ? 
                <p className='font-bold text-lg text-red-500'>عملية دفع غير ناجحة</p> : null
            }
            {
                location.pathname == '/payment/pending' ? 
                <p className='font-bold text-lg text-orange-500'>في انتظار الدفع ...</p> : null
            }
            {
                params.has('invoice_id') ? (
                    <div className='flex items-center justify-center gap-4 max-sm:flex-wrap'>
                        <p className='text-sm font-semibold text-gray-500'>رقم المعملية : </p>
                        <p className='font-bold text-lg'>{params.get('invoice_id')}</p>
                    </div>
                ) : null
            }

            <Link className='custom-button2 mt-10' to={'/'}>الذهاب للصفحة الرئيسية</Link>
        </div>

    </div>
  )
}

export default PaymentStatusPage