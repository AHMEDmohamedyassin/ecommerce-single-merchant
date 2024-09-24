import React, { useRef, useState } from 'react'

const ImageInputUploaderComp = ({name , setFile}) => {
    const [url , setUrl] = useState(null)
    const input_id = `image_hidden_input_${Math.random()}`

    const ClickInputHandle = () => {
        document.getElementById(input_id).click()
    }

    // showing image
    const handleShowingImage = (e) => {
        const file = e.target.files[0]
        const url = URL.createObjectURL(file)
        setUrl(url)
        if(setFile) setFile(file)
    }

    // remove Image
    const handleRemoveImage  = () => {
        setUrl(null)
        document.getElementById(input_id).value = null
    }
  return (
    <div className='relative w-full aspect-video custom-border rounded-lg shadow hover:shadow-lg'>
     <input id={input_id} name={name} onChange={handleShowingImage} className='hidden' type='file' accept='image/*'/>
        <button type='button' onClick={ClickInputHandle} className=' w-full h-full overflow-hidden'>
            {
                url ? 
                    <img className=' object-cover w-full' src={url}/> : 
                    <span className="material-symbols-outlined" style={{fontSize:100}}>add_photo_alternate</span>
            }
        </button>
        <span onClick={handleRemoveImage} className="material-symbols-outlined text-3xl absolute top-4 left-4 bg-mainbg hover:bg-gray-300 rounded-full w-10 aspect-square flex items-cetner justify-center hover:cursor-pointer">close</span>
    </div>
  )
}

export default ImageInputUploaderComp