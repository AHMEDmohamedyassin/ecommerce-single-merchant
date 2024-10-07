import React from 'react'
import ButtonsComp from './ButtonsComp'
import { useDispatch, useSelector } from 'react-redux'
import {ProductImageURL} from "../../Fetch/Url"
import { Product_ColorSelectAction, Product_SizeSelectAction } from '../../redux/action/ProductAction'

const DetailsComp = () => {
  const state = useSelector(state => state.ProductReducer)
  const dispatch = useDispatch()


  // handle select color
  const handleSelectColor = (color) => {
    dispatch(Product_ColorSelectAction(color))
  }

  // handle size select 
  const handleSelectSize = (size) => {
    dispatch(Product_SizeSelectAction(size))
  }

  return (
          <div className='flex flex-col gap-6'>

            {/* title */}
            <h1 className='font-bold text-xl'>{state.title}</h1>
            
            {/* description */}
            <p className='text-xs text-gray-500'>{state.description}</p>
            
            {/* price */}
            <div className='flex items-center gap-4'>
              <h2 className='text-2xl font-extrabold text-secondarycolor'>{state.selected_product.price} جم</h2>
              {
                state.selected_product.old_price ? (
                  <div className='relative w-fit'>
                    <div className='absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 h-[2px] w-10 bg-gray-300 -rotate-45'></div>
                    <h2 className=' font-extrabold text-gray-300'>{state.selected_product.old_price} جم</h2>
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
              state.colors?.length ? (
                <div className='flex flex-col gap-2'>
                  <p className='text-xs font-bold'>لون : {state.selected_product?.color }</p>
                  <div className='flex flex-wrap gap-2'>
                    {
                      state.colors?.map((e, index) => (
                        <img 
                          onClick={() => handleSelectColor(e)} 
                          title={e} 
                          key={index} 
                          src={`${ProductImageURL}id=${state.id}&width=50&image=${state.product?.filter(ele => ele.color == e).find(e => e.image != null)?.image}`}  
                          className={`aspect-square w-10 custom-border rounded hover:cursor-pointer hover:border-secondarycolor ${e == state.selected_product?.color ? "border-secondarycolor" : ""} border-[1px]`} 
                          loading='lazy' 
                        />
                      ))
                    }
                  </div>
                </div>
              ) : null
            }

            {/* sizes */}
            <div className='flex flex-col gap-2'>
              <p className='text-xs font-bold'>مقاس : {state.selected_product?.size}</p>
              <div className='flex flex-wrap gap-2'>
                {
                  [...new Set(state.product.filter(e => e.color == state.selected_product?.color ).map(e => e.size))].map((e , index) => (
                    <p onClick={() => handleSelectSize(e) } key={index} className={`rounded-lg p-2 py-1 custom-border text-sm hover:text-white hover:bg-secondarycolor hover:cursor-pointer flex items-center justify-center ${state.selected_product?.size == e ? "text-white bg-secondarycolor" : "text-gray-500" }`}>{e}</p>
                  ))
                }
              </div>
            </div>

            {/* buttons section */}
            <ButtonsComp/>

          </div>
  )
}

export default DetailsComp