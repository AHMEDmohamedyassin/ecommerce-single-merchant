import React from 'react'

const GalleryComp = () => {
  return (
          <div>
            <div className='relative'>

              {/* the image */}
              <img className='custom-img-cover' src='https://tawheedwnour.com/cdn/shop/files/45174912010_2.jpg?v=1723558682&width=600' loading='lazy' />

              {/* navigation arrows */}
              <span class="material-symbols-outlined absolute top-2/4 left-2 -translate-y-2/4 hover:cursor-pointer text-2xl">arrow_back_ios</span>
              <span class="material-symbols-outlined absolute top-2/4 right-2 -translate-y-2/4 hover:cursor-pointer text-2xl">arrow_forward_ios</span>

              {/* expanding button  */}
              <button className='absolute left-2 bottom-2 flex items-center gap-2 text-[10px] custom-button py-0 px-2 '>
                <span class="material-symbols-outlined rotate-45 text-xl">open_with</span>
                <span>اضغط للتكبير</span>
              </button>

            </div>

            <div className='max-w-full flex items-center overflow-x-auto hide-scrollbar'>
              <img className='opacity-100 border-gray-200 custom-border aspect-square w-1/4 opacity-70 hover:opacity-100 hover:cursor-pointer' loading='lazy' src='https://tawheedwnour.com/cdn/shop/files/45174912010_1.jpg?v=1723558682&width=160' />
              <img className='custom-border border-transparent aspect-square w-1/4 opacity-70 hover:opacity-100 hover:cursor-pointer' loading='lazy' src='https://tawheedwnour.com/cdn/shop/files/45174912010_3.jpg?v=1723558682&width=160' />
              <img className='custom-border border-transparent aspect-square w-1/4 opacity-70 hover:opacity-100 hover:cursor-pointer' loading='lazy' src='https://tawheedwnour.com/cdn/shop/files/45174912010_1.jpg?v=1723558682&width=160' />
              <img className='custom-border border-transparent aspect-square w-1/4 opacity-70 hover:opacity-100 hover:cursor-pointer' loading='lazy' src='https://tawheedwnour.com/cdn/shop/files/45174912010_3.jpg?v=1723558682&width=160' />
              <img className='custom-border border-transparent aspect-square w-1/4 opacity-70 hover:opacity-100 hover:cursor-pointer' loading='lazy' src='https://tawheedwnour.com/cdn/shop/files/45174912010_1.jpg?v=1723558682&width=160' />
              <img className='custom-border border-transparent aspect-square w-1/4 opacity-70 hover:opacity-100 hover:cursor-pointer' loading='lazy' src='https://tawheedwnour.com/cdn/shop/files/45174912010_3.jpg?v=1723558682&width=160' />
              <img className='custom-border border-transparent aspect-square w-1/4 opacity-70 hover:opacity-100 hover:cursor-pointer' loading='lazy' src='https://tawheedwnour.com/cdn/shop/files/45174912010_1.jpg?v=1723558682&width=160' />
              <img className='custom-border border-transparent aspect-square w-1/4 opacity-70 hover:opacity-100 hover:cursor-pointer' loading='lazy' src='https://tawheedwnour.com/cdn/shop/files/45174912010_3.jpg?v=1723558682&width=160' />
            </div>

          </div>
  )
}

export default GalleryComp