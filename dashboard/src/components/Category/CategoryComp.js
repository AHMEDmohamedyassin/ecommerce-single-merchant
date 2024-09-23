import { zodResolver } from '@hookform/resolvers/zod'
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Category_DeleteAction, Category_DeleteImageAction, Category_UpdateAction } from '../../redux/action/CategoryAction'
import { CategoryCreateValidation } from 'validation/CategoryValidation'
import { ImageURL } from 'Fetch/Url'

const CategoryComp = ({data}) => {
    const image_input = useRef(null)
    const [file , setFile] = useState(null)
    const [uploadedImageURL , setUploadedImageURL] = useState(null)
    const dispatch = useDispatch()

    // default values of inputs
    const defaultValues = {
        title : data.title ?? data.slug , 
        description : data.description ?? null
    }

    // hook form
    const {
        register , 
        handleSubmit , 
        formState:{errors},
        reset 
    } = useForm({
        mode:"onBlur" , 
        resolver:zodResolver(CategoryCreateValidation),
        defaultValues
    })

    // updating category
    const SubmitForm = (form_data) => {
        dispatch(Category_UpdateAction({...form_data , id : data.id} , file))
    }

    // delete category
    const handleDelete = () => {
        dispatch(Category_DeleteAction(data.id))
    }

    // image input change value event
    const handleImageInputChange = e => {
        let file = e.target.files.length ? e.target.files[0] : null 

        // creating url to review selected image before upload
        let url = URL.createObjectURL(file)
        setUploadedImageURL(url)

        setFile(file)
    }

    // delete category image
    const handleImageDelete = () => {
        dispatch(Category_DeleteImageAction(data.id))
    } 

    // reset handle
    const ResetHandle = () => {
        reset(defaultValues)
        setFile(null)
        setUploadedImageURL(null)
    }

  return (
    <>
        <form onSubmit={handleSubmit(SubmitForm)} className='sm:w-40 w-32 custom-border rounded-lg flex flex-col items-center gap-y-2 p-2'>
            {/* image of the category or the review image */}
            <div className='relative'>
                <span onClick={handleImageDelete} className="material-symbols-outlined text-3xl absolute top-2/4 -translate-y-2/4 -right-8 hover:cursor-pointer hover:text-red-500">backspace</span>
                <img onClick={() => image_input.current.click()} src={uploadedImageURL ?? `${ImageURL}?type=category&width=100&id=${data.id}`} loading='lazy' className='object-cover aspect-square sm:w-20 w-full rounded-full hover:cursor-pointer custom-border shadow' />
            </div>
            
            {/* category title and description */}
            <input {...register('title')} className='w-full overflow-hidden text-center' />
            <input {...register('description')} className='text-gray-500 text-center' />
            
            {/* buttons */}
            <div className='flex gap-4'>
                <span onClick={ResetHandle} className="material-symbols-outlined text-3xl hover:cursor-pointer hover:text-green-500">replay</span>
                <span onClick={handleDelete} className="material-symbols-outlined text-3xl hover:cursor-pointer hover:text-red-500">delete</span>
                <button>
                    <span className="material-symbols-outlined text-3xl hover:cursor-pointer hover:text-blue-500">save</span>
                </button>
            </div>
        </form>
        <input className='hidden' onChange={handleImageInputChange} ref={image_input} type='file' accept='image/*'/>
    </>
  )
}

export default CategoryComp