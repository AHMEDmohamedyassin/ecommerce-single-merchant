import { ProductImageURL } from 'Fetch/Url'
import React, { useEffect, useState } from 'react'

const CardComp = ({data}) => {
    console.log(data)
    const [selectedImage , setSelectedImage] = useState(null )
    const [selected_color , setSelected_color] = useState(null )
    const [colors , setColors] = useState([])
    const [selectedProduct  ,setSelectedProduct] = useState(null)

    // selecting color
    const handleSelectImage = color => {
        setSelectedProduct(data.product.find(e => e.color == color))
    }

    // initiate product card
    useEffect(() => {
        // getting colors in array
        setColors(e => {
            return [...new Set((data.product.filter(e => e.color != null && e.image != null) || [])?.map(e => e.color))]
        })

        // select image
        setSelectedImage(e => {
            let product = data.product.find(e => e.image != null && e.color != null)
            
            if(!product) return e
            
            setSelected_color(product.color)
            return product.image
        })

        // selecte product
        setSelectedProduct(e => {
            return data.product.find(e => e.image != null && e.color != null)
        })
    } , [])
  return (
    <div className='relative bg-secondarybg rounded shadow overflow-hidden flex flex-col'>
        
        {/* discount and empty  */}
        <div className='absolute top-2 w-full flex'>
            {
                selectedProduct && selectedProduct.price && selectedProduct.old_price ? 
                    <div className='bg-yellow-500 shadow px-1 text-sm absolute right-4 font-bold'>-{((selectedProduct.price / selectedProduct.old_price) * 100).toFixed(1)} %</div> : null
            }
            {
                selectedProduct && selectedProduct.quantity < 1 ? 
                <div className='text-sm bg-red-500 shadow px-2 absolute left-4 text-white'>نفذ</div> : null
            }
        </div>

        {/* main image */}
        <section className='h-40'>
            {
                selectedProduct?.image ? 
                    <img className='custom-img-cover' loading='lazy' src={`${ProductImageURL}id=${data.id}&width=200&image=${selectedProduct?.image}`} />
                    : 
                    <img className='custom-img-cover' loading='lazy' src={`${ProductImageURL}id=${data.id}&width=200`} />
            }
        </section>

        {/* details and available images */}
        <section className='p-4 flex flex-col gap-2 justify-start flex-1'>

            <div className=' flex-1'>
                <p className='line-clamp-2 text-sm font-semibold'>{data.title}</p>
            </div>

            {/* price and old price data  */}
            <div className='flex gap-4 items-center'>
                <div className='text-maincolor text-lg font-bold'>{selectedProduct?.price} جم</div>
                {
                    selectedProduct?.old_price ? (
                      <div className='relative w-fit'>
                        <div className='absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 h-[2px] w-10 bg-gray-300 -rotate-45'></div>
                        <h2 className=' font-extrabold text-gray-300'>{selectedProduct.old_price} جم</h2>
                      </div>
                    ) : null
                }
            </div>

            {/* available images */}
            <div className='flex items-center gap-3 mt-1'>
                {
                    colors?.map((e , index) => (
                        <img 
                            key={index}
                            className={`${e == selectedProduct.color ? "border-secondarycolor" : ""} rounded-full custom-border shadow-sm aspect-square lg:w-8 sm:w-6 w-4 hover:cursor-pointer`} 
                            loading='lazy' 
                            onClick={() => handleSelectImage(e)}
                            src={
                                data.product.find(ele => ele.color == e)?.image ? 
                                    `${ProductImageURL}id=${data.id}&width=50&image=${data.product.find(ele => ele.color == e)?.image}` : 
                                    `${ProductImageURL}id=${data.id}&width=50`
                            }
                        />
                    ))
                }
            </div>

        </section>

    </div>
  )
}

export default CardComp