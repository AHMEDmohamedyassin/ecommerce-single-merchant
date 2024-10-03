import ImageInputUploaderComp from 'components/public/ImageInputUploaderComp'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Product_ImagesUploadAction } from '../../redux/action/ProductAction'

const ImagesComp = ({watch}) => {
    const state = useSelector(state => state.ProductReducer)
    const dispatch = useDispatch()
    const submit_button = useRef(null)
    const [imageCount , setImageCount] = useState(1)
    const [colors , setColors] = useState([])
 
    // submit form of images
    const submitHandle = (e) => {
        e.preventDefault()
        dispatch(Product_ImagesUploadAction(e))
    }

    // controls images count
    const controlImagesCount = (add = true) => {
        setImageCount(e => add ? e + 1 : e - 1)
    }    

    // watch changes in colors field to add it or remove from the select input options
    const watchColors = watch('products')
    useEffect(() => {
        setColors([...new Set(watchColors?.map(e => e.color))] ?? [])
    } , [watchColors])

    // submitting the form on the product data uploaded
    useEffect(() => {
        if(state.status == 'sc' || state.status == 'su')
            submit_button.current.click()
    } , [state.status])
  return (
    <div>
        <p className='text-gray-500 text-sm mb-2'>اضف صور للمنتج</p>
        <form onSubmit={submitHandle} className='grid xl:grid-cols-6 lg:grid-cols-4 sm:grid-cols-2 gap-4'>
            {
                Array(imageCount).fill(0).map((e , index) => (
                    <div key={index} className='relative'>

                        {/* image input with review and selection of colors */}
                        <div className='w-full flex flex-col items-center gap-2'>
                            <ImageInputUploaderComp name={`image_${index}`}/>
                            <select name={`color_${index}`} className='custom-border w-full text-sm'>
                                {
                                    colors?.map((e , index) => (
                                        <option key={index}>{e}</option>
                                    ))
                                }
                            </select>
                        </div>

                        {/* adding and removing image buttons  */}
                        {
                            imageCount <= index + 1 ? (
                                <div className='flex flex-col absolute top-2/4 -left-6 -translate-y-2/4'>
                                    {
                                        imageCount > 1 ? <span onClick={() => controlImagesCount(false)} className="material-symbols-outlined text-2xl hover:cursor-pointer hover:text-gray-500">cancel</span> : null
                                    }
                                    <span onClick={controlImagesCount} className="material-symbols-outlined text-2xl hover:cursor-pointer hover:text-gray-500 -rotate-90">loupe</span>
                                </div>
                            ) : null
                        }
                    </div>
                ))
            }
            <button ref={submit_button} className='hidden'></button>
        </form>
    </div>
  )
}

export default ImagesComp