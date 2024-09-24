import ImageInputUploaderComp from 'components/public/ImageInputUploaderComp'
import React, { useState } from 'react'

const ImagesComp = () => {
    const [imageCount , setImageCount] = useState(2)
  return (
    <div className='grid grid-cols-4'>
        {
            Array(imageCount).fill(0).map((e , index) => (
                <form className='flex flex-col items-center'>
                    <ImageInputUploaderComp/>
                    <select>
                        <option>color 1</option>
                        <option>color 2</option>
                        <option>color 3</option>
                    </select>
                </form>
            ))
        }
    </div>
  )
}

export default ImagesComp