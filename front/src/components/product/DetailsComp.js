import React from 'react'
import ButtonsComp from './ButtonsComp'
import { useDispatch, useSelector } from 'react-redux'
import {ProductImageURL} from "../../Fetch/Url"

const DetailsComp = () => {
  const state = useSelector(state => state.ProductReducer)
  const dispatch = useDispatch()

  // handle selecting sizes , images
  const handleSelect = (data) => {
    dispatch({type:"Product_Data" , data })
  }

  const handleSelectImageSize = e => {
    const image = Object.keys(state.json?.images).find(ele => state.json.images[ele] == e)
    // selecting color
    handleSelect({selected_color:e})
    // selecting image if exists
    if(image != undefined)
      handleSelect({selected_image : image})
  }

  return (
          <div className='flex flex-col gap-6'>

            {/* title */}
            <h1 className='font-bold text-xl'>{state.title}</h1>
            
            {/* description */}
            <p className='text-xs text-gray-500'>{state.description}</p>
            
            {/* price */}
            <div className='flex items-center gap-4'>
              <h2 className='text-2xl font-extrabold text-secondarycolor'>{state.price} جم</h2>
              {
                state.old_price ? (
                  <div className='relative w-fit'>
                    <div className='absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 h-[2px] w-10 bg-gray-300 -rotate-45'></div>
                    <h2 className=' font-extrabold text-gray-300'>{state.old_price} جم</h2>
                  </div>
                ) : null
              }
            </div>

            {/* brand */}
            {
              state?.json?.brand? (
                <p className='flex items-center gap-2 text-xs '>
                  <span className='text-gray-500'>العلامة التجارية : </span>
                  <span>{state?.json?.brand}</span>
                </p>
              ) : null
            }

            {/* colors */}
            {
              state.json?.colors?.length ? (
                <div className='flex flex-col gap-2'>
                  <p className='text-xs font-bold'>لون : {state.selected_color ?? state.json.colors[0] }</p>
                  <div className='flex flex-wrap gap-2'>
                    {
                      state.json?.colors?.map((e, index) => (
                        <img onClick={() => handleSelectImageSize(e)} key={index} src={`${ProductImageURL}id=${state.id}&width=50&image=${Object.keys(state.json?.images).find(ele => state.json.images[ele] == e) }`}  className={`aspect-square w-10 custom-border rounded hover:cursor-pointer hover:border-secondarycolor ${state.selected_color == e ? "border-secondarycolor" : ""} border-[1px]`} loading='lazy' />
                      ))
                    }
                  </div>
                </div>
              ) : null
            }

            {/* sizes */}
            {
              state.json?.size?.length ? (
                <div className='flex flex-col gap-2'>
                  <p className='text-xs font-bold'>مقاس : {state.selected_size ?? state.json.size[0] }</p>
                  <div className='flex flex-wrap gap-2'>
                    {
                      state.json.size.map((e , index) => (
                        <p onClick={() => handleSelect({selected_size : e})} key={index} className={`aspect-square p-1 rounded-full custom-border text-sm hover:text-white hover:bg-secondarycolor  ${state.selected_size == e ? "text-white bg-secondarycolor" : "text-gray-500" } hover:cursor-pointer`}>{e}</p>
                      ))
                    }
                  </div>
                </div>
              ) : null
            }

            {/* buttons section */}
            <ButtonsComp/>

          </div>
  )
}

export default DetailsComp