import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { CreateProductValidation } from '../../validation/ProductValidation'
import { Category_ListAction } from '../../redux/action/CategoryAction'
import ImagesComp from 'components/product/ImagesComp'
import { Product_CreateAction } from '../../redux/action/ProductAction'
import { useNavigate } from 'react-router-dom'
import { Setting_Msg } from '../../redux/action/SettingAction'
import ProductPiecesComp from 'components/product/ProductPiecesComp'
import MainFromInputsComp from 'components/product/MainFromInputsComp'

const CreatePage = () => {
    const [selectedCategory , setSelectedCategory] = useState([])
    const [reactSelectCategoryValues , setReactSelectCategoryValues] = useState([])    // this for operation of input itself
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
                
                {/* main form inputs  */}
                <MainFromInputsComp register={register} errors={errors} setSelectedCategory={setSelectedCategory} reactSelectCategoryValues={reactSelectCategoryValues}  setReactSelectCategoryValues={setReactSelectCategoryValues}/>

                {/* product pieces  */}
                <ProductPiecesComp errors={errors} register={register} reset={reset}/>

            </form>

            {/* images the product */}
            <ImagesComp/>

            {/* submitting the main form */}
            <button onClick={handleSubmit(submitForm)} className='custom-button2 w-fit self-center mt-4'>تأكيد البيانات</button>
        </div>
    </div>
  )
}

export default CreatePage