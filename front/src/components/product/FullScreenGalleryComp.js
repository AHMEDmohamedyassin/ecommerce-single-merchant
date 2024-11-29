import { ImageURL, ProductImageURL } from 'Fetch/Url'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Product_ImageSelectAction } from '../../redux/action/ProductAction'
import LoadingComp from 'components/public/LoadingComp'
import ImageWithLoaderComp from 'components/public/ImageWithLoaderComp'

const FullScreenGalleryComp = () => {
    const state = useSelector(state => state.ProductReducer)
    const dispatch = useDispatch()

    // close full screen gallery
    const handleFullScreengallery = () => {
      dispatch({type :"Product_Data" , data : {full_screen_gallery : false}})
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
            state.full_screen_gallery ? (
                <div className='w-full h-[100vb] fixed top-0 left-0 bg-gray-800 z-50 p-10 flex flex-col select-none'>
                    {/* header of gallery  */}
                    <div>
                        <div onClick={handleFullScreengallery} className='w-10 aspect-square bg-gray-400 flex items-center justify-center rounded-full hover:text-red-500 hover:cursor-pointer'>
                            <span className="material-symbols-outlined text-4xl">close</span>
                        </div>
                    </div>

                    {/* main image with navigation  */}
                    <div className='relative w-full flex-1 flex justify-center items-center'>
                        {/* navigation arrows */}
                        <div className='absolute top-2/4 left-2 -translate-y-2/4 hover:cursor-pointer text-4xl bg-gray-400 border-[1px] border-white  flex items-center justify-center w-10 aspect-square rounded-full hover:text-white' onClick={() => handleImageSlide()}>
                            <span className="material-symbols-outlined translate-x-1">arrow_back_ios</span>
                        </div>
                        <div className='absolute top-2/4 right-2 -translate-y-2/4 hover:cursor-pointer text-4xl bg-gray-400 border-[1px] border-white  flex items-center justify-center w-10 aspect-square rounded-full hover:text-white' onClick={() => handleImageSlide(false)}>
                            <span className="material-symbols-outlined ">arrow_forward_ios</span>
                        </div>
                        
                        {/* big image */}
                        <ImageWithLoaderComp imageClass={'max-w-full max-h-full'} spinnerClass={'bg-white rounded-full shadow-xl shadow-black'} src={`${ProductImageURL}width=800&image=${state.selected_product?.image ?? (state.images.length ? state.images[0] : null) }&id=${state.id}`}/>
                    </div>

                    {/* thumbnail images  */}
                    <div id='scrollContainer' className='max-w-full flex items-center overflow-x-auto scrollbar-hidden lg:scrollbar-hidden'>
                    {
                        state.images?.map((e , index) => (
                        <img id={e}  key={index} onClick={() => handleImageSelect(e)} className={`border-gray-200 custom-border aspect-square max-lg:w-[10%] w-[5%] ${!state.selected_product?.image && !index || state.selected_product?.image == e ? "border-secondarycolor" : "opacity-60"} hover:opacity-100 hover:cursor-pointer`} loading='lazy' src={`${ProductImageURL}width=200&image=${e}&id=${state.id}`} />
                        ))
                    }
                    </div>
                </div>

            ) : null
        }
    </>
  )
}

export default FullScreenGalleryComp