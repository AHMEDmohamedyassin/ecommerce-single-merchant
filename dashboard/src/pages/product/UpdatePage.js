import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import ReactInputMask from 'react-input-mask'
import { useDispatch, useSelector } from 'react-redux'
import { CreateProductValidation, formattingDateForUpdate } from '../../validation/ProductValidation'
import ArrayInputComp from 'components/product/ArrayInputComp'
import Select from 'react-select'
import { selectStyle } from '../../config'
import { Category_ListAction } from '../../redux/action/CategoryAction'
import ImagesComp from 'components/product/ImagesComp'
import { product_DeleteAction, Product_ReadAction, product_UpdateAction } from '../../redux/action/ProductAction'
import { useNavigate, useParams } from 'react-router-dom'
import ProductExistsImages from 'components/product/ProductExistsImages'
import { Setting_Msg } from '../../redux/action/SettingAction'

const UpdatePage = () => {
    const [selectedCategory , setSelectedCategory] = useState([]) // this for submitting form
    const [reactSelectCategoryValues , setReactSelectCategoryValues] = useState([])    // this for operation of input itself
    const categories = useSelector(state => state.CategoryReducer)
    const state = useSelector(state => state.ProductReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const [rerender_key , setRerender_key] = useState(1)

    // handle change of cateogry selection
    const handleCategoryChange = (e) => {
        setReactSelectCategoryValues(e)
        setSelectedCategory(e.map(ele => ele.value))
    }

    const {
        register , 
        handleSubmit , 
        reset , 
        formState:{errors} , 
        watch
    } = useForm({
        mode:"onBlur" , 
        resolver:zodResolver(CreateProductValidation),
        defaultValues : {price: 0 ,old_price : 0,quantity : 0}
    })


    // submitting form 
    const submitForm = (form_data) => {
        const data = {...form_data , categories : selectedCategory}
        dispatch(product_UpdateAction(data))
    }

    // resetting form with default values
    const resetForm = () => {
        reset({...state , publish_date:  formattingDateForUpdate(state.publish_date) })
        setReactSelectCategoryValues(state?.category?.map(e => ({value : e.id , label : e.title})))
        setSelectedCategory(state?.category?.map(e => e.id))
        setRerender_key(e => e + 1)
    }

    // delete product
    const deleteProduct = () => {
        dispatch(product_DeleteAction())
    }

    // fetching categories for showing it in multi-select input
    // getting product data
    useEffect(() => {
        dispatch(Category_ListAction())
        dispatch(Product_ReadAction(params.id))
    } , [])

    // navigate to products page after creating the product and uploading image
    useEffect(() => {
        if(state.status == 'sui' || state.status == 'sd'){
            dispatch({type : "Product_Reset"})
            
            if(state.status == 'sui')
                Setting_Msg(21000)   // تم تعديل المنتج بنجاح
            
            navigate('/products')
        }

        resetForm()
    } , [state.status])
  return (
    <div className='custom-dashcontainer'>
        <p className='title'>تعديل منتج</p>

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
                    <label>السعر</label>
                    <input {...register("price", { valueAsNumber: true })} />
                    {errors.price && <p>{errors.price.message}</p>}
                </div>
                
                <div className='custom-inputcontainer'>
                    <label>السعر قبل الخصم</label>
                    <input {...register("old_price", { valueAsNumber: true })} />
                    {errors.old_price && <p>{errors.old_price.message}</p>}
                </div>
                
                <div className='custom-inputcontainer'>
                    <label>الكمية</label>
                    <input {...register("quantity", { valueAsNumber: true }

                    )} />
                    {errors.quantity && <p>{errors.quantity.message}</p>}
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
                    onChange={handleCategoryChange}
                    value={reactSelectCategoryValues}
                    />
                </div>


                {/* json file data */}
                
                {/* sizes array input */}
                <ArrayInputComp key={`size_${rerender_key}`} register={register} reset={reset} errors={errors} name={"size"} title={"المقاسات"} initialLength={state?.json?.size?.length ?? 1}/>
                
                {/* colors array input */}
                <ArrayInputComp key={`colors_${rerender_key}`} register={register} reset={reset} errors={errors} name={"colors"} title={"الألوان"} initialLength={state?.json?.colors?.length ?? 1}/>


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

            </form>

            {/* reviewing the exists images of prodcut */}
            <ProductExistsImages/>

            {/* images the product */}
            <ImagesComp watch={watch}/>

            <div className='flex items-center justify-center gap-4'>
                {/* submitting the main form */}
                <button onClick={handleSubmit(submitForm)} className='custom-button2 w-fit'>تأكيد البيانات</button>
                
                {/* reset button */}
                <button onClick={resetForm} className='custom-button hover:bg-blue-500'>إعادة</button>
                
                {/* delete button */}
                <button onClick={deleteProduct} className='custom-button hover:bg-red-500'>حذف</button>
            </div>
        </div>
    </div>
  )
}

export default UpdatePage