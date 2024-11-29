import { ImageURL } from 'Fetch/Url'
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { product_SubProductImageAppendAction } from '../../redux/action/ProductAction'
import ImageWithLoaderComp from 'components/public/ImageWithLoaderComp'

const ProductPieceAppendImage = () => {
    const state = useSelector(state => state.ProductReducer)
    const dispatch = useDispatch()
    const theFrom = useRef(null)

    // closing the form
    const closeForm = (e = null) => {
        if(e && e.target == theFrom.current)
            dispatch({type : "Product_Data" , data : {update_image_id : null}})
    } 


    // appending image 
    const handleAppendImage = (image) => {
        dispatch(product_SubProductImageAppendAction(image))
    }

  return (
    <>
        {
            state.update_image_id ? (
                <div ref={theFrom} onClick={closeForm} className='fixed top-0 left-0 w-full h-full bg-white/50 flex items-center justify-center z-40 py-20'>
                    <div className='p-6 flex flex-col gap-6 items-center bg-secondarybg shadow-xl rounded-lg lg:w-2/4 mx-6 max-h-full overflow-auto'>
                        <p className='text-sm font-bold text-gray-500'>اختر صورة للمنتج</p>
                        {
                            state.product.find(e => e.id == state.update_image_id)?.image ? (
                                <div className='custom-border border-x-0 border-t-0 pb-6 w-full'>
                                    <ImageWithLoaderComp src={`${ImageURL}?image=${state.product.find(e => e.id == state.update_image_id)?.image}&id=${state.id}&type=product&width=200`} imageClass={'aspect-square h-32 shadow custom-border mx-auto'}/>
                                </div>
                            ) : null
                        }
                
                        <div className='flex flex-wrap justify-between gap-4'>
                            {
                                state.images?.map((e , index) => (
                                    <div key={index} onClick={() => handleAppendImage(e)}>
                                        <ImageWithLoaderComp src={`${ImageURL}?id=${state.id}&image=${e}&width=200&type=product`} imageClass={'aspect-square h-32 shadow custom-border opacity-80 hover:opacity-100 hover:cursor-pointer'}/>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            ) : null
        }
    </>
  )
}

export default ProductPieceAppendImage