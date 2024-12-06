import React, { useEffect, useState } from 'react'
import ButtonsComp from './ButtonsComp'
import { useDispatch, useSelector } from 'react-redux'
import {ProductImageURL} from "../../Fetch/Url"
import { Product_SizeSelectAction } from '../../redux/action/ProductAction'

const DetailsComp = () => {
  const state = useSelector(state => state.ProductReducer)
  const dispatch = useDispatch()


  // handle select product
  const handleSelectProduct = (prod) => {
    dispatch({type:"Product_Data" , data :{selected_product : prod} })
  }

  // handle size select 
  const handleSelectSize = (size) => {
    dispatch(Product_SizeSelectAction(size))
  }

  return (
        <>
          {
            state.id ? (

              <div className='flex flex-col gap-6'>

                {/* title */}
                <h1 className='font-bold text-xl'>{state.title}</h1>
                
                {/* description */}
                <p className='text-xs text-gray-500'>{state.description}</p>

                {/* reviews  */}
                {
                  state.reviews ? (
                    <div className='flex items-center gap-2'>
                      {/* stars  */}
                      <div className='flex items-center justify-start'>
                        {
                          Array(Math.floor(state.ratting ?? 0)).fill(0).map((star , index) => (
                            <span key={index} className="material-symbols-outlined fill text-yellow-500">star</span>
                          ))
                        }
                        {
                          state.ratting && state.ratting % Math.floor(state.ratting) ? (
                            <span class="material-symbols-outlined fill text-yellow-500">star_half</span>
                          ) : null
                        }
                        {
                          Array(state.ratting ? Math.floor(5 - state.ratting) : 5).fill(0).map((star , index) => (
                            <span key={index} className="material-symbols-outlined text-gray-500">star</span>
                          ))
                        }
                      </div>
                      
                      {/* reviews count  */}
                      <p className=''>{state.reviews}</p>
                    </div>
                  ) : null
                }




                {/* views  */}
                <div className='flex items-center gap-2'>
                  <div className='text-sm '>عدد المشاهدات : </div>
                  <div>{state.views ?? 1}</div>
                </div>
                
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
                  state.products.length ? (
                    <div className='flex flex-col gap-2'>
                      <p className='text-xs font-bold'>لون : {state.selected_product?.color }</p>
                      <div className='flex flex-wrap gap-2'>
                        {
                          state.products?.map((e, index) => (
                            <img 
                              onClick={() => handleSelectProduct(e)} 
                              title={e.color} 
                              key={index} 
                              src={`${ProductImageURL}id=${state.id}&width=50&image=${e.image}`}  
                              className={`aspect-square w-10 custom-border rounded hover:cursor-pointer hover:border-secondarycolor ${e.color == state.selected_product?.color ? "border-secondarycolor" : ""} border-[1px]`} 
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
                      state.selected_product?.sizes?.map((e , index) => (
                        <p onClick={() => handleSelectSize(e) } key={index} className={`rounded-lg p-2 py-1 custom-border text-sm hover:text-white hover:bg-secondarycolor hover:cursor-pointer flex items-center justify-center ${state.selected_product?.size == e ? "text-white bg-secondarycolor" : "text-gray-500" }`}>{e}</p>
                      ))
                    }
                  </div>
                </div>

                {/* buttons section */}
                <ButtonsComp/>

              </div>
            ) : null
          }
        </>
  )
}

export default DetailsComp