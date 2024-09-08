import React, { useState } from 'react'

const CollabsedDetailsComp = () => {
    const [details , setDetails] = useState(false)
  return (
          <div onClick={() => setDetails(!details)} className='custom-border border-[1px] hover:cursor-pointer'>
            <div className='flex justify-between items-center bg-gray-100'>
              <p className='py-2 px-4 text-sm font-semibold'>وصف المنتج</p>
              {
                details ? 
                    <span className="material-symbols-outlined bg-black text-white p-2 py-2">remove</span>
                :
                    <span className="material-symbols-outlined bg-black text-white p-2 py-2">add</span>
              }
            </div>

            {
                details ? (
                    <div className='text-sm text-gray-500 text-justify p-4'>"ارتق بإطلالتك مع بنطلون الجينز الشبابي ماركة بلو دريم موديل 2160، المصمم ليجمع بين الأناقة والراحة. يتميز هذا البنطلون بتصميمه العصري والمميز، مما يجعله خيارك الأمثل للخروج.
                        تصميم عصري: يأتي بتصميم سليم فيت يبرز قوامك بشكل أنيق، مما يجعله مناسبا لمختلف المناسبات اليومية.
                        خامة ليكرا مريحة: مصنوع من قماش الليكرا المرن الذي يوفر راحة كبيرة وحركة سلسة، ويضيف لمسة من المرونة إلى إطلالتك.
                        تفاصيل مخربشة: يتميز بتفاصيل مخربشة تضيف لمسة من الجرأة والتفرد إلى التصميم، مما يجعله مناسبا للأزياء العصرية.
                        إغلاق بأزرار متينة: مزود بإغلاق بأزرار قوية ومتينة، يضيف لمسة من العملية والأناقة ويعزز من سهولة ارتدائه وخلعه.
                        تصميم كاجوال أنيق: يوازن بين الطابع الكاجوال والأناقة، ليكون مناسبا للخروج اليومي أو المناسبات غير الرسمية.
                        ألوان متعددة: متوفر بألوان أساسية تشمل الأسود، الكحلي، والكحلي الغامق، لتناسب اطلالاتك المختلفة.
                        مقاسات متنوعة: يتوفر بمقاسات متعددة تشمل من 30 الي 40، لضمان ملاءمة مثالية لجميع الأجسام.
                        اختر هذا البنطلون لتجربة إطلالة عصرية ومريحة، ولتضيف لمسة من الأناقة إلى خزانة ملابسك.اطلبه الان عبر موقعنا الموثوق واحصل على تجربة تسوق لا مثيل لها."
                    </div>
                ) : null
            }
          </div>
  )
}

export default CollabsedDetailsComp