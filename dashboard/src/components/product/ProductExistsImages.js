import { ImageURL } from 'Fetch/Url'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Product_DeleteImageAction } from '../../redux/action/ProductAction'
import ImageWithLoaderComp from 'components/public/ImageWithLoaderComp'

const ProductExistsImages = () => {
    const state = useSelector(state => state.ProductReducer)
    const dispatch = useDispatch()
    const [showDelete , setShowDelete] = useState(false)

    const DeleteImage = (img) => {
        dispatch(Product_DeleteImageAction(img))
    }

  return (
    <div>
        <p className='text-sm text-gray-500 mb-2'>الصور المحملة مسبقا</p>
        <div className='grid xl:grid-cols-6 lg:grid-cols-4 sm:grid-cols-2 gap-4'>

            {
                // state?.json?.images? Object.keys(state?.json?.images).map((e , index) => (
                state?.images? state.images.map((e , index) => (
                    <div key={index} onMouseEnter={() => setShowDelete(e)} onMouseLeave={() => setShowDelete(false)} className='w-full aspect-square custom-border shadow rounded-lg relative overflow-hidden'>
                        <ImageWithLoaderComp parentClass={'w-full h-full flex items-center justify-center'} src={`${ImageURL}?width=400&type=product&image=${e}&id=${state.id}`}/>
                        <span onClick={() => DeleteImage(e)} style={{display:showDelete == e ? "block" :"none"}} className="material-symbols-outlined absolute top-2/4 left-2/4 text-6xl -translate-x-2/4 -translate-y-2/4 hover:cursor-pointer hover:text-red-500 bg-mainbg rounded-xl shadow">delete</span>
                    </div>
                )) : null
            }

        </div>
    </div>
  )
}

export default ProductExistsImages