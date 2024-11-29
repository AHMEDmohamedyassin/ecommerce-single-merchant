import React, { useEffect, useState } from 'react'
import { LargeSpinnerComp } from './SpinnerComp'

const ImageWithLoaderComp = ({parentClass , imageClass , src , spinnerClass}) => {
    const [hideLoader , setHideLoader] = useState(false)
    useEffect(() => setHideLoader(false) , [src])
  return (
    <div className={`relative ${parentClass?? ""}`}>
        {
            !hideLoader ? (
                <div className={`absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 flex items-center justify-center flex-col ${spinnerClass??""}`}>
                    <LargeSpinnerComp/>
                </div>
            ) : null
        }
        <img onLoad={() => setHideLoader(true)} className={imageClass} src={src} loading='lazy'/>
    </div>
  )
}

export default ImageWithLoaderComp