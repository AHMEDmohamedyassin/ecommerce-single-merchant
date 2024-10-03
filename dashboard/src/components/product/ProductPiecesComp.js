import React, { useEffect, useState } from 'react'

const ProductPiecesComp = ({register , errors , reset , initialCount}) => {
    const [values , setValues] = useState({})

    // adding piece form
    const handleAddPiece = (index = null) => {
        setValues(values => {
            const new_values = {...values , [index ?? Math.random()] : {
                price: 0 ,
                old_price : 0,
                quantity : 1
            }}

            // remove the object from react form hook products.object 
            reset(values => ({...values , products : Object.values(new_values) }))

            return new_values
        })
    }

    // removing piece form
    const handleRemovePiece = (index) => {
        let new_values = values
        delete new_values[index]

        // remove the object from the values
        setValues(new_values)

        // remove the object from react form hook products.object 
        reset(values => ({...values , products : Object.values(new_values) }))
    }

    useEffect(() => {
        Array(initialCount ?? 1).fill(0).map((e , index) => {
            handleAddPiece(index + 1)
        })
    } , [initialCount])

    useEffect(() => reset(old_values => ({...old_values , products : Object.values(values) })) , [values])
  return (
    <div className='flex flex-col gap-4'>
        {/* all pieces title */}
        <p className=' text-gray-500'>إضافة قطع {Object.keys(values).length} </p>
        {
            Object.keys(values).map((e , index) => (
                <div key={e} className='p-4 grid lg:grid-cols-3 sm:grid-cols-2 items-start gap-2 custom-border rounded-xl shadow relative'>
                    {/* piece title */}
                    <div className=' mb-2 flex items-center gap-4 lg:col-span-3 sm:col-span-2'>
                        <p className='text-sm text-gray-500'>قطعة رقم {index + 1}</p>
                        {
                            Object.keys(values).length > 1 ? <span onClick={() => handleRemovePiece(e)} className="material-symbols-outlined hover:text-gray-500">cancel</span> : null
                        }
                    </div>

                    {/* piece inputs  */}
                    <div className='custom-inputcontainer sm:col-span-2'>
                        <label>لون القطعة</label>
                        <input {...register(`products.${index}.color`)} onChange={ele => setValues(values => ( {...values , [e] : {...values[e] , "color" : ele.target.value}} ) )} />
                        {errors.products?.[index]?.color && <p>{errors.products?.[index]?.color.message}</p>}
                    </div>
                    <div className='custom-inputcontainer'>
                        <label>مقاس القطعة</label>
                        <input {...register(`products.${index}.size`)} onChange={ele => setValues(values => ( {...values , [e] : {...values[e] , "size" : ele.target.value}} ) )}/>
                        {errors.products?.[index]?.size && <p>{errors.products?.[index]?.size.message}</p>}
                    </div>
                    <div className='custom-inputcontainer'>
                        <label>سعر القطعة</label>
                        <input type='number' {...register(`products.${index}.price` , { valueAsNumber: true })} onChange={ele => setValues(values => ( {...values , [e] : {...values[e] , "price" : ele.target.value}} ) )}/>
                        {errors.products?.[index]?.price && <p>{errors.products?.[index]?.price.message}</p>}
                    </div>
                    <div className='custom-inputcontainer'>
                        <label>سعر قبل الخصم</label>
                        <input type='number' {...register(`products.${index}.old_price` , { valueAsNumber: true })} onChange={ele => setValues(values => ( {...values , [e] : {...values[e] , "old_price" : ele.target.value}} ) )}/>
                        {errors.products?.[index]?.old_price && <p>{errors.products?.[index]?.old_price.message}</p>}
                    </div>
                    <div className='custom-inputcontainer'>
                        <label>الكمية المتوفرة</label>
                        <input type='number' {...register(`products.${index}.quantity` , { valueAsNumber: true })} onChange={ele => setValues(values => ( {...values , [e] : {...values[e] , "quantity" : ele.target.value}} ) )}/>
                        {errors.products?.[index]?.quantity && <p>{errors.products?.[index]?.quantity.message}</p>}
                    </div>

                    {/* adding piece button  */}
                    {
                        index == Object.keys(values).length - 1 ? <span onClick={() => handleAddPiece()} className="material-symbols-outlined absolute top-full left-0 -rotate-90 text-4xl hover:text-gray-500">loupe</span> : null
                    }
                </div>
            ))
        }
    </div>
  )
}

export default ProductPiecesComp