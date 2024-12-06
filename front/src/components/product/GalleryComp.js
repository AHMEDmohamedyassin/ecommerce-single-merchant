import { ProductImageURL } from 'Fetch/Url'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Product_ImageSelectAction } from '../../redux/action/ProductAction'
import ImageWithLoaderComp from 'components/public/ImageWithLoaderComp'

const GalleryComp = () => {
  const state = useSelector(state => state.ProductReducer)
  const dispatch = useDispatch()

  // open full screen gallery
  const handleFullScreengallery = () => {
    dispatch({type :"Product_Data" , data : {full_screen_gallery : true}})
  }

  // selecting image
  const handleImageSelect = selected_image => {
    dispatch(Product_ImageSelectAction(selected_image))
  }
  
  // sliding image
  const handleImageSlide = (next = true) => {
    // check if product have no images
    if(!state.images?.length) return 

    let selected_image = state.selected_product?.image ??  state.images[0] 
    const images = state.images 
    const current_index = images.indexOf(selected_image) 

    if(next)
      selected_image = images[current_index + 1 >= images.length ? 0 : current_index + 1]
    else 
      selected_image = images[!current_index ? images.length - 1 : current_index - 1]

    dispatch(Product_ImageSelectAction(selected_image))
  }
  
  return (
        <>
          {
            state.id ? (
              <div>
                <div className='relative'>

                  {/* the image */}
                  <ImageWithLoaderComp src={`${ProductImageURL}width=400&image=${state.selected_product?.image ?? (state.images.length ? state.images[0] : null) }&id=${state.id}`} imageClass={' object-contain lg:h-[500px] h-[300px] w-full custom-border'}/>

                  {/* navigation arrows */}
                  {/* <span onClick={() => handleImageSlide()} className="material-symbols-outlined absolute top-2/4 left-2 -translate-y-2/4 hover:cursor-pointer text-2xl">arrow_back_ios</span> */}
                  <div className='z-20 absolute top-2/4 left-2 -translate-y-2/4 hover:cursor-pointer lg:text-4xl text-2xl bg-gray-400 border-[1px] hover:border-white  flex items-center justify-center lg:w-10 w-8 aspect-square rounded-full hover:text-white' onClick={() => handleImageSlide()}>
                      <span className="material-symbols-outlined translate-x-1">arrow_back_ios</span>
                  </div>
                  <div className='z-20 absolute top-2/4 right-2 -translate-y-2/4 hover:cursor-pointer lg:text-4xl text-2xl bg-gray-400 border-[1px] hover:border-white  flex items-center justify-center lg:w-10 w-8 aspect-square rounded-full hover:text-white' onClick={() => handleImageSlide(false)}>
                      <span className="material-symbols-outlined ">arrow_forward_ios</span>
                  </div>
                  
                  {/* expanding button  */}
                  <button onClick={handleFullScreengallery} className='bg-secondarybg absolute left-2 bottom-2 flex items-center gap-2 text-[10px] custom-button py-0 px-2 '>
                    <span className="material-symbols-outlined rotate-45 text-xl">open_with</span>
                    <span>اضغط للتكبير</span>
                  </button>

                </div>

                <div id='scrollContainer' className='max-w-full flex items-center overflow-x-auto scrollbar-hidden lg:scrollbar-hidden'>
                  {
                    state.images?.map((e , index) => (
                      <img id={e} onClick={() => handleImageSelect(e)} key={index} className={`border-gray-200 custom-border aspect-square w-1/4 ${!state.selected_product?.image && !index || state.selected_product?.image == e ? "border-secondarycolor" : "opacity-60"} hover:opacity-100 hover:cursor-pointer`} loading='lazy' src={`${ProductImageURL}width=200&image=${e}&id=${state.id}`} />
                    ))
                  }
                </div>

              </div>
            ) : null
          }
        </>
  )
}

export default GalleryComp