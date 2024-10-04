import { ProductImageURL } from 'Fetch/Url'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Product_ImageSelectAction } from '../../redux/action/ProductAction'

const GalleryComp = () => {
  const state = useSelector(state => state.ProductReducer)
  const dispatch = useDispatch()

  // selecting image
  const handleImageSelect = selected_image => {
    dispatch(Product_ImageSelectAction(selected_image))
  }
  
  const handleImageSlide = (next = true) => {
    let selected_image = state.selected_image 
    const images = state.images 
    const current_index = images.indexOf(selected_image)

    if(next)
      selected_image = images[current_index + 1 >= images.length ? 0 : current_index + 1]
    else 
      selected_image = images[!current_index ? images.length - 1 : current_index - 1]

    dispatch(Product_ImageSelectAction(selected_image))
  }
  
  return (
          <div>
            <div className='relative'>

              {/* the image */}
              <img className=' object-contain lg:h-[500px] h-[300px] w-full custom-border' src={`${ProductImageURL}width=400&image=${state.selected_image}&id=${state.id}`} loading='lazy' />

              {/* navigation arrows */}
              <span onClick={() => handleImageSlide()} class="material-symbols-outlined absolute top-2/4 left-2 -translate-y-2/4 hover:cursor-pointer text-2xl">arrow_back_ios</span>
              <span onClick={() => handleImageSlide(false)} class="material-symbols-outlined absolute top-2/4 right-2 -translate-y-2/4 hover:cursor-pointer text-2xl">arrow_forward_ios</span>

              {/* expanding button  */}
              <button className='absolute left-2 bottom-2 flex items-center gap-2 text-[10px] custom-button py-0 px-2 '>
                <span class="material-symbols-outlined rotate-45 text-xl">open_with</span>
                <span>اضغط للتكبير</span>
              </button>

            </div>

            <div id='scrollContainer' className='max-w-full flex items-center overflow-x-auto scrollbar-hidden lg:scrollbar-hidden'>
              {
                state.images?.map((e , index) => (
                  <img id={e} onClick={() => handleImageSelect(e)} key={index} className={`border-gray-200 custom-border aspect-square w-1/4 ${state.selected_image == e ? "border-secondarycolor" : "opacity-60"} hover:opacity-100 hover:cursor-pointer`} loading='lazy' src={`${ProductImageURL}width=200&image=${e}&id=${state.id}`} />
                ))
              }
            </div>

          </div>
  )
}

export default GalleryComp