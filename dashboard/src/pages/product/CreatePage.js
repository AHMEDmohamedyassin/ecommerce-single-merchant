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
import { Product_CreateAction } from '../../redux/action/ProductAction'
import { useNavigate } from 'react-router-dom'
import { Setting_Msg } from '../../redux/action/SettingAction'
import ProductPiecesComp from 'components/product/ProductPiecesComp'

const CreatePage = () => {
    const [selectedCategory , setSelectedCategory] = useState([])
    const categories = useSelector(state => state.CategoryReducer)
    const state = useSelector(state => state.ProductReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {
        register , 
        handleSubmit , 
        reset , 
        formState:{errors} , 
        watch
    } = useForm({
        mode:"onBlur" , 
        resolver:zodResolver(CreateProductValidation),
        defaultValues:{
            products : [
                {
                    price: 0 ,
                    old_price : 0,
                    quantity : 1
                }
            ]
        }
    })

    // submitting form 
    const submitForm = (form_data) => {
        const data = {...form_data , categories : selectedCategory}
        dispatch(Product_CreateAction(data))
    }

    // fetching categories for showing it in multi-select input
    useEffect(() => {
        dispatch(Category_ListAction())
    } , [])

    // navigate to products page after creating the product
    useEffect(() => {
        if(state.status == 'sui'){
            dispatch({type : "Product_Reset"})
            Setting_Msg(18000)   // تم إنشاء المنتج بنجاح
            navigate('/products')
        }
    } , [state.status])
  return (
    <div className='custom-dashcontainer'>
        <p className='title'>إنشاء منتج</p>

        <div className='flex flex-col gap-4'>
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
                    <label>تاريخ النشر</label>
                    <ReactInputMask 
                        style={{direction:'ltr'}} 
                        {...register("publish_date")}
                        placeholder="DD-MM-YYYY HH:mm" mask={'99-99-9999 99:99'}
                    />
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
                </div>

                {/* json file data */}

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

                {/* product pieces  */}
                <ProductPiecesComp errors={errors} register={register} reset={reset}/>

            </form>

            {/* images the product */}
            <ImagesComp watch={watch}/>

            {/* submitting the main form */}
            <button onClick={handleSubmit(submitForm)} className='custom-button2 w-fit self-center mt-4'>تأكيد البيانات</button>
        </div>
    </div>
  )
}

export default CreatePage