import React from 'react'
import ButtonsComp from './ButtonsComp'

const DetailsComp = () => {
  return (
          <div className='flex flex-col gap-6'>

            {/* title */}
            <h1 className='font-bold text-xl'>بنطلون رجالي جينز بلو دريم موديل 2160 - تربو وان</h1>
            
            {/* description */}
            <p className='text-xs text-gray-500'>نطلون الجينز الشبابي ماركة بلو دريم موديل 2160، المصمم ليجمع بين الأناقة والراحة. يتميز هذا البنطلون بتصميمه العصري والمميز من قماش الجينز الليكرا، مما يجعله خيارك الأمثل للخروج متوافر بعدة الوان و مقاسات من 30 الي 40 ليناسب كل المقاسات و الاعمار</p>
            
            {/* price */}
            <h2 className='text-2xl font-extrabold text-secondarycolor'>582 جم</h2>

            {/* brand */}
            <p className='flex items-center gap-2 text-xs '>
              <span className='text-gray-500'>العلامة التجارية : </span>
              <span>تربو وان</span>
            </p>

            {/* colors */}
            <div className='flex flex-col gap-2'>
              <p className='text-xs font-bold'>لون : أسود</p>
              <div className='flex flex-wrap gap-2'>
                <img className='aspect-square w-10 custom-border rounded hover:cursor-pointer hover:border-secondarycolor border-[1px]' src='https://tawheedwnour.com/cdn/shop/files/45174912010_3.jpg?v=1723558682&width=160' loading='lazy' />
                <img className='aspect-square w-10 custom-border rounded hover:cursor-pointer hover:border-secondarycolor border-[1px]' src='https://tawheedwnour.com/cdn/shop/files/45174912010_3.jpg?v=1723558682&width=160' loading='lazy' />
                <img className='aspect-square w-10 custom-border rounded hover:cursor-pointer hover:border-secondarycolor border-[1px]' src='https://tawheedwnour.com/cdn/shop/files/45174912010_3.jpg?v=1723558682&width=160' loading='lazy' />
                <img className='aspect-square w-10 custom-border rounded hover:cursor-pointer hover:border-secondarycolor border-[1px]' src='https://tawheedwnour.com/cdn/shop/files/45174912010_3.jpg?v=1723558682&width=160' loading='lazy' />
                <img className='aspect-square w-10 custom-border rounded hover:cursor-pointer hover:border-secondarycolor border-[1px]' src='https://tawheedwnour.com/cdn/shop/files/45174912010_3.jpg?v=1723558682&width=160' loading='lazy' />
              </div>
            </div>

            {/* sizes */}
            <div className='flex flex-col gap-2'>
              <p className='text-xs font-bold'>مقاس : 30</p>
              <div className='flex flex-wrap gap-2'>
                <p className='aspect-square p-1 rounded-full custom-border text-sm text-gray-500 hover:text-white hover:bg-secondarycolor hover:cursor-pointer'>30</p>
                <p className='aspect-square p-1 rounded-full custom-border text-sm text-gray-500 hover:text-white hover:bg-secondarycolor hover:cursor-pointer'>30</p>
                <p className='aspect-square p-1 rounded-full custom-border text-sm text-gray-500 hover:text-white hover:bg-secondarycolor hover:cursor-pointer'>30</p>
                <p className='aspect-square p-1 rounded-full custom-border text-sm text-gray-500 hover:text-white hover:bg-secondarycolor hover:cursor-pointer'>30</p>
              </div>
            </div>

            {/* buttons section */}
            <ButtonsComp/>

          </div>
  )
}

export default DetailsComp