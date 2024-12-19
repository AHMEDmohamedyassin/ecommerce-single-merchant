import ImageWithLoaderComp from 'components/public/ImageWithLoaderComp'
import { ImageURL, ProductImageURL } from 'Fetch/Url'
import React, { useCallback, useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useSwipeable } from 'react-swipeable'

const SliderComp = () => {
    const state = useSelector(state => state.HomeReducer)
    const [ids , setIds] = useState([])
    const [selected_collection , setSelected_collection] = useState({})

    // next image 
    const handleNext = () => {
        if(!selected_collection.id && !state.latest?.length && !ids.length) return 

        const order = ids.indexOf(selected_collection.id)

        if(order >= ids.length - 1 )
            return setSelected_collection(state.latest[0])
        setSelected_collection(state.latest[order + 1])
    }

    // previous image 
    const handlePrev = () => {
        if(!selected_collection.id && !state.latest?.length && !ids.length) return 

        const order = ids.indexOf(selected_collection.id)

        if(order <= 0)
            return setSelected_collection(state.latest[ids.length - 1])
        setSelected_collection(state.latest[order - 1])
    }

    // touch sliding 
    const handlers = useSwipeable({
        onSwipedLeft: () => handleNext(),
        onSwipedRight: () => handlePrev(),
    });
    

    useEffect(() => {
        
        setIds(state.latest?.map(e => e.id))

        setSelected_collection(e => {
            return state.latest.length? state.latest[0] : {}
        })
    } , [state.latest])
  return (
    <div {...handlers} className='custom-container select-none'>

            <div className='mb-10 overflow-hidden h-80 rounded-xl shadow-xl px-0 relative'>
                {/* buttons  */}
                {
                    !isMobile ? (
                        <>
                            <div onClick={handleNext} className='z-10 absolute top-2/4 left-2 -translate-y-2/4 hover:cursor-pointer lg:text-4xl text-2xl bg-maincolor border-[1px] hover:border-white  flex items-center justify-center lg:w-10 w-8 aspect-square rounded-full hover:text-white'>
                                <span className="material-symbols-outlined translate-x-1">arrow_back_ios</span>
                            </div>
                            <div onClick={handlePrev} className='z-10 absolute top-2/4 right-2 -translate-y-2/4 hover:cursor-pointer lg:text-4xl text-2xl bg-maincolor border-[1px] hover:border-white  flex items-center justify-center lg:w-10 w-8 aspect-square rounded-full hover:text-white'>
                                <span className="material-symbols-outlined ">arrow_forward_ios</span>
                            </div>
                        </>
                    ) : null
                }

                {
                    selected_collection ? (
                        <ImageWithLoaderComp parentClass={`w-full h-full absolute top-0 left-0`} imageClass={`object-cover object-center w-full h-full`} src={`${ProductImageURL}id=${selected_collection?.id}&width=800`} />
                    ) : null
                }

                <div className='absolute top-0 left-0 w-full h-full z-5 flex flex-col justify-center px-16 gap-6'>
                    <p className='text-maincolor lg:text-3xl sm:text-2xl text-xl font-extrabold sm:w-2/4 xl:w-1/4 line-clamp-2'>{selected_collection.title}</p>
                    <p className='text-3xl font-extrabold text-maincolor'>{(selected_collection?.product?.map(e => e.price) || [])?.sort()[0]} جم</p>
                    <Link to={`/product/${selected_collection.id}/${decodeURIComponent(selected_collection.slug)}`} className='custom-button w-fit bg-maincolor text-white font-bold'>تسوق الان</Link>
                </div>


                {/* circles  */}
                <div className='absolute bottom-2 left-2/4 -translate-x-2/4 flex gap-2'>
                    {
                        state.latest?.length && Object.keys(selected_collection).length ? 
                            state.latest.map(e => (
                                <p onClick={() => setSelected_collection(e)} key={e.id} className={`w-3 aspect-square rounded-full ${e.id == selected_collection.id ? "bg-maincolor" : "bg-maincolor/50"} hover:cursor-pointer`}></p>
                            )) 
                        : null
                    }
                </div>
            </div>
    </div>
  )
}

export default SliderComp