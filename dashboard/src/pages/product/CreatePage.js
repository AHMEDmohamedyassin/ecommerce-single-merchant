import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import ReactInputMask from 'react-input-mask'
import { useDispatch, useSelector } from 'react-redux'
import { CreateProductValidation } from '../../validation/ProductValidation'
import ArrayInputComp from 'components/product/ArrayInputComp'
import Select from 'react-select'
import { selectStyle } from '../../config'
import { Category_ListAction } from '../../redux/action/CategoryAction'
import ImagesComp from 'components/product/ImagesComp'

const CreatePage = () => {
    const [selectedCategory , setSelectedCategory] = useState([])
    const categories = useSelector(state => state.CategoryReducer)
    const dispatch = useDispatch()

    const {register , handleSubmit , reset , formState:{errors}} = useForm({mode:"onBlur" })

    // submitting form 
    const submitForm = (data) => {
        console.log({...data , categories : selectedCategory})
    }

    // fetching categories 
    useEffect(() => {
        dispatch(Category_ListAction())
    } , [])
  return (
    <div className='custom-dashcontainer'>
        <p className='title'>إنشاء منتج</p>

        <form onSubmit={handleSubmit(submitForm)} className='flex flex-col gap-4'>
            
            <div className='custom-inputcontainer'>
                <label>عنوان المنتج</label>
                <input {...register("title")} />
                {errors.title && <p>{errors.title.message}</p>}
            </div>
            
            <div className='custom-inputcontainer'>
                <label>وصف المنتج</label>
                <input {...register("description")} />
                {errors.description && <p>{errors.description.message}</p>}
            </div>
            
            <div className='custom-inputcontainer'>
                <label>كود المنتج</label>
                <input {...register("serial")} />
                {errors.serial && <p>{errors.serial.message}</p>}
            </div>
            
            <div className='custom-inputcontainer'>
                <label>السعر</label>
                <input {...register("price")} />
                {errors.price && <p>{errors.price.message}</p>}
            </div>
            
            <div className='custom-inputcontainer'>
                <label>السعر قبل الخصم</label>
                <input {...register("old_price")} />
                {errors.old_price && <p>{errors.old_price.message}</p>}
            </div>
            
            <div className='custom-inputcontainer'>
                <label>الكمية</label>
                <input {...register("quantity")} />
                {errors.quantity && <p>{errors.quantity.message}</p>}
            </div>
            
            <div className='custom-inputcontainer'>
                <label>تاريخ النشر</label>
                <ReactInputMask {...register("title")} mask={'99 / 99 / 9999'} />
                {errors.publish_date && <p>{errors.publish_date.message}</p>}
            </div>
            
            <div className='custom-inputcontainer'>
                <label>الأقسام</label>
                <Select
                  closeMenuOnSelect={true}
                  isMulti
                  styles={selectStyle}
                  placeholder={'اختر الأقسام الخاصة بالمنتج'}
                  options={categories.categories.map(e => ({value : e.id , label : e.title}) )}
                  onChange={(e) => setSelectedCategory(e.map(ele => ele.value))}
                />
                {errors.publish_date && <p>{errors.publish_date.message}</p>}
            </div>


            {/* json file data */}
            
            {/* sizes array input */}
            <ArrayInputComp register={register} reset={reset} errors={errors} name={"size"} title={"المقاسات"}/>
            
            {/* colors array input */}
            <ArrayInputComp register={register} reset={reset} errors={errors} name={"colors"} title={"الألوان"}/>


            <div className='custom-inputcontainer'>
                <label>وصف مفصل عن المنتج</label>
                <textarea {...register("json.description")} rows={4}> </textarea>
                {errors.json?.description && <p>{errors.json.description.message}</p>}
            </div>

            <div className='custom-inputcontainer'>
                <label>سياسة التبديل و الإرجاء</label>
                <textarea {...register("json.restore")} rows={4}> </textarea>
                {errors.json?.restore && <p>{errors.json.restore.message}</p>}
            </div>



            {/* images the product */}
            <ImagesComp/>


            <button className='custom-button2'>تأكيد</button>
        </form>
    </div>
  )
}

export default CreatePage