import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { product_SubProductDeleteAction, product_SubProductUpdateAction } from '../../redux/action/ProductAction'
import { SubProductValidation } from 'validation/ProductValidation'

const ProductPieceUpdateComp = ({data}) => {
    const state = useSelector(state => state.ProductReducer)
    const dispatch = useDispatch()

    const {register , formState:{errors} , handleSubmit , reset} = useForm({mode:"onBlur" , resolver:zodResolver(SubProductValidation)})

    // delete the product
    const handleRemovePiece = () => {
        dispatch(product_SubProductDeleteAction(data.id))
    }

    // submitting the form
    const submitForm = form_data => {
        dispatch(product_SubProductUpdateAction({id:data.id , ...form_data}))
    }

    // reset the form
    const handleReset = () => {
        reset(data)
    }

    useEffect(() => {
        handleReset()
    } , [data])

  return (
    <form onSubmit={handleSubmit(submitForm)} className='p-4 grid lg:grid-cols-3 sm:grid-cols-2 items-start gap-2 custom-border rounded-xl shadow relative'>
        {/* piece title */}
        <div className=' mb-2 flex items-center gap-4 lg:col-span-3 sm:col-span-2'>
            <p className='text-sm text-gray-500'>قطعة </p>
            {
                state.product?.length > 1 ? <span onClick={handleRemovePiece} className="material-symbols-outlined hover:text-gray-500">cancel</span> : null 
            }
        </div>

        {/* piece inputs  */}
        <div className='custom-inputcontainer'>
            <label>لون القطعة</label>
            <input {...register(`color`)} />
            {errors.color && <p>{errors.color.message}</p>}
        </div>
        <div className='custom-inputcontainer'>
            <label>مقاس القطعة</label>
            <input {...register(`size`)}/>
            {errors.size && <p>{errors.size.message}</p>}
        </div>
        <div className='custom-inputcontainer'>
            <label>سعر القطعة</label>
            <input type='number' {...register(`price` , {valueAsNumber : true})} />
            {errors.price && <p>{errors.price.message}</p>}
        </div>
        <div className='custom-inputcontainer'>
            <label>سعر قبل الخصم</label>
            <input type='number' {...register(`old_price` , {valueAsNumber : true})}/>
            {errors.old_price && <p>{errors.old_price.message}</p>}
        </div>
        <div className='custom-inputcontainer'>
            <label>الكمية المتوفرة</label>
            <input type='number' {...register(`quantity` , {valueAsNumber : true})}/>
            {errors.quantity && <p>{errors.quantity.message}</p>}
        </div>

        {/* buttons  */}
        <div className='flex items-end justify-center gap-4 self-end'>
            <button type='submit' className='custom-button2'>تأكيد</button>
            <button onClick={handleReset} type='button' className='custom-button hover:bg-blue-500'>إعادة</button>
        </div>
    </form>
  )
}

export default ProductPieceUpdateComp