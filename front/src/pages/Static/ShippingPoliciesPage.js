import React from 'react'

const ShippingPoliciesPage = () => {
  return (
    <div className='custom-container'>
      
      {/* title of page */}
      <p className='text-center font-bold sm:text-lg text-sm sm:px-10'>في "التوحيد والنور"، نسعى دائمًا لتقديم تجربة تسوق مرضية لعملائنا. إذا لم تكن راضيًا عن مشترياتك، يمكنك
      الاستفادة من سياسة الاستبدال والاسترجاع لدينا وفق الشروط التالية</p>

      <div className='relative flex flex-col gap-1 bg-gray-200 p-6 sm:pe-12 pe-8 text-gray-500 font-semibold sm:text-xs text-[10px] italic mt-10 mb-40'>
        
        <span className='absolute top-4 left-6 sm:text-3xl text-xl'>&#x275D;</span>

        <div className='flex items-center gap-4'>
          <p className='aspect-square w-1 rounded-full bg-gray-500'></p>
          <p>يجب أن يتم الاسترجاع أو الاستبدال خلال 14 يومًا من تاريخ الشراء.</p>
        </div>
        <div className='flex items-center gap-4'>
          <p className='aspect-square w-1 rounded-full bg-gray-500'></p>
          <p>يجب أن يتم الاسترجاع أو الاستبدال خلال 14 يومًا من تاريخ الشراء.</p>
        </div>
        <div className='flex items-center gap-4'>
          <p className='aspect-square w-1 rounded-full bg-gray-500'></p>
          <p>يجب أن يتم الاسترجاع أو الاستبدال خلال 14 يومًا من تاريخ الشراء.</p>
        </div>
        <div className='flex items-center gap-4'>
          <p className='aspect-square w-1 rounded-full bg-gray-500'></p>
          <p>يجب أن يتم الاسترجاع أو الاستبدال خلال 14 يومًا من تاريخ الشراء.</p>
        </div>

      </div>
    </div>
  )
}

export default ShippingPoliciesPage