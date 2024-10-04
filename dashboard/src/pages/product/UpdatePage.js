import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import ReactInputMask from 'react-input-mask'
import { useDispatch, useSelector } from 'react-redux'
import { SubProductValidation, UpdateProductValidation } from '../../validation/ProductValidation'
import { formattingDateForUpdate, ValidateInputChanges } from '../../validation/Validation'
import ArrayInputComp from 'components/product/ArrayInputComp'
import Select from 'react-select'
import { selectStyle } from '../../config'
import { Category_ListAction } from '../../redux/action/CategoryAction'
import ImagesComp from 'components/product/ImagesComp'
import { product_DeleteAction, Product_ReadAction, product_UpdateAction } from '../../redux/action/ProductAction'
import { useNavigate, useParams } from 'react-router-dom'
import ProductExistsImages from 'components/product/ProductExistsImages'
import { Setting_Confirm, Setting_Msg } from '../../redux/action/SettingAction'
import ProductDetailsComp from 'components/product/ProductDetailsComp'
import ProductPiecesComp from 'components/product/ProductPiecesComp'
import ProductPieceUpdateComp from 'components/product/ProductPieceUpdateComp'
import { z } from 'zod'
import MainFromInputsComp from 'components/product/MainFromInputsComp'

const UpdatePage = () => {
    const [selectedCategory , setSelectedCategory] = useState([]) // this for submitting form
    const [reactSelectCategoryValues , setReactSelectCategoryValues] = useState([])    // this for operation of input itself
    const [colors , setColors] = useState([])
    const state = useSelector(state => state.ProductReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const [rerender_key , setRerender_key] = useState(1)
    const [subProduct , setSubProduct] = useState({})

    // main form 
    const {
        register , 
        handleSubmit , 
        reset , 
        formState:{errors} , 
        watch
    } = useForm({
        mode:"onBlur" , 
        resolver:zodResolver(UpdateProductValidation),
        defaultValues : {}
    })

    // new sub products form
    const subProductForm = useForm({
        mode:"onBlur" , 
        resolver:zodResolver(z.object({products : z.array(SubProductValidation)})),
        defaultValues : {}
    })

    // watch changes in colors field in subProductFrom to add it or remove from the select input options
    const watchColors = subProductForm.watch('products')
    useEffect(() => {
        setColors(e => ([ ...new Set([...(state.product || []).map(ele => ele.color) , ...(watchColors || [])?.map(e => e.color)]) ]) )
    } , [watchColors])


    // submitting form 
    const submitForm = async () => {
        let data = ValidateInputChanges(watch , state)      // the changed data in main from
        let is_valid = await subProductForm.trigger()
        let submit_data = {...data , categories : selectedCategory}

        // checking if the additional sub products is valid or not to be added to submitted form_data
        if(subProduct?.length > 1 && !is_valid)
            return console.log('test');
        if(subProduct.length < 2 && !is_valid && !Setting_Confirm(3000))
            return 
        if(is_valid)
            submit_data = {...submit_data , products : subProduct}


        dispatch(product_UpdateAction(submit_data))
    }

    // resetting form with default values
    const resetForm = () => {
        reset({...state , publish_date:  formattingDateForUpdate(state.publish_date) })
        setReactSelectCategoryValues(state?.category?.map(e => ({value : e.id , label : e.title})))
        setSelectedCategory(state?.category?.map(e => e.id))
        setColors(e => ([...new Set([...e , ...(state.product || []).map(ele => ele.color)])]))
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

        // check if data is fetched before
        if(!watch('title'))
            resetForm()
    } , [state.status])
  return (
    <div className='custom-dashcontainer'>
        <p className='title'>تعديل منتج</p>

        {
            state.status == 'n' && !state.id ? <p className='w-full text-center text-red-500 text-sm'>المنتج غير موجود</p> : (
                <>
                {/* product statistics details  */}
                <ProductDetailsComp/>
                
                <div className='flex flex-col gap-4'>
                    <form onSubmit={handleSubmit(submitForm)} className='flex flex-col gap-4'>
                        
                        {/* main form inputs  */}
                        <MainFromInputsComp register={register} errors={errors} setSelectedCategory={setSelectedCategory} reactSelectCategoryValues={reactSelectCategoryValues}  setReactSelectCategoryValues={setReactSelectCategoryValues}/>

                    </form>

                    {/* existing product pieces update and review and delete  */}
                    <p className='text-gray-500'>القطع المضافة مسبقا #{state.product?.length ?? 0}</p>
                    {
                        state.product?.map((e , index) => (
                            <ProductPieceUpdateComp key={index} data={e} />
                        ))
                    }

                    {/* adding new product pieces  */}
                    <ProductPiecesComp errors={subProductForm.formState.errors} register={subProductForm.register} reset={subProductForm.reset} setData={setSubProduct}/>


                    {/* reviewing the exists images of prodcut */}
                    <ProductExistsImages/>

                    {/* images the product */}
                    <ImagesComp colors={colors}/>


                    {/* buttons  */}
                    <div className='flex items-center justify-center gap-4'>
                        {/* submitting the main form */}
                        <button onClick={handleSubmit(submitForm)} className='custom-button2 w-fit'>تأكيد البيانات</button>
                        
                        {/* reset button */}
                        <button onClick={resetForm} className='custom-button hover:bg-blue-500'>إعادة</button>
                        
                        {/* delete button */}
                        <button onClick={deleteProduct} className='custom-button hover:bg-red-500'>حذف</button>
                    </div>

                </div>
                </>
            )
        }
    </div>
  )
}

export default UpdatePage