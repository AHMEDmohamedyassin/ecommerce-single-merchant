import ImageWithLoaderComp from 'components/public/ImageWithLoaderComp'
import { ProductImageURL } from 'Fetch/Url'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const CardComp = ({data}) => {
    const [selectedProduct  ,setSelectedProduct] = useState(null)
    const [products , setProducts] = useState([])

    // selecting color
    const handleSelectProduct = e => {
        setSelectedProduct(e)
    }

    // initiate product card
    useEffect(() => {

        // setting products data
        if(data.product?.length){
            setProducts(e => {
                let products = data.product?.reduce((acc , curr) => {
    
                    // check if color is repeated 
                    if(acc?.find(e => e.color == curr.color))
                        acc = acc.map(e => e.color == curr.color ? {...e , sizes : [...e.sizes , curr.size] , image : !e.image ? curr.image : null } : e)
                    else acc = [...acc , {...curr , sizes : [curr.size] }]
    
                    return acc
                } , [])
    
                // setting initial product
                let initial_product = products?.find(e => e.image != null)
                setSelectedProduct(initial_product ?? ( products[0] ?? {} ))
    
                return products
            })
        } 
        
    } , [data])
  return (
    <div className='relative bg-secondarybg rounded shadow overflow-hidden flex flex-col'>
        
        {/* discount and empty  */}
        <div className='absolute top-2 w-full flex'>
            {
                selectedProduct && selectedProduct.price && selectedProduct.old_price && selectedProduct.price < selectedProduct.old_price ? 
                    <div className='bg-yellow-500 shadow px-1 text-sm absolute right-4 font-bold'>% {(100 - (selectedProduct.price / selectedProduct.old_price) * 100).toFixed(1)}-</div> : null
            }
            {
                selectedProduct && selectedProduct.quantity < 1 ? 
                <div className='text-sm bg-red-500 shadow px-2 absolute left-4 text-white'>نفذ</div> : null
            }
        </div>

        {/* main image */}
        <Link to={`/product/${data.id}/${data.slug}`} className='h-40'>
            {
                selectedProduct?.image ? 
                    <ImageWithLoaderComp parentClass={'w-full h-full'} src={`${ProductImageURL}id=${data.id}&width=200&image=${selectedProduct?.image}`} imageClass={'custom-img-cover'}/>
                    : 
                    <ImageWithLoaderComp parentClass={'w-full h-full'} src={`${ProductImageURL}id=${data.id}&width=200`} imageClass={'custom-img-cover'}/>
            }
        </Link>

        {/* details and available images */}
        <section className='p-4 flex flex-col gap-2 justify-start flex-1'>

            <div className=' flex-1 flex flex-col gap-1'>
                <div className='flex items-center gap-2'>
                    <p className=' text-nowrap'>{selectedProduct?.color} - </p>
                    <p className='line-clamp-1 text-sm'>{selectedProduct?.sizes?.join(' , ')}</p>
                </div>
                <Link to={`/product/${data.id}`} className='line-clamp-2 text-sm font-semibold'>{data.title}</Link>
            </div>

            {/* price and old price data  */}
            <div className='flex gap-4 items-center flex-wrap'>
                <div className='text-maincolor lg:text-lg font-bold'>{selectedProduct?.price} جم</div>
                {
                    selectedProduct?.old_price ? (
                      <div className='relative w-fit'>
                        <div className='absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 h-[2px] lg:w-10 w-5 bg-gray-300 -rotate-45'></div>
                        <h2 className=' font-extrabold text-gray-300 max-lg:text-sm'>{selectedProduct.old_price} جم</h2>
                      </div>
                    ) : null
                }
            </div>

            {/* available images */}
            <div className='flex items-center gap-3 mt-1'>
                {
                    products?.map((e , index) => (
                        <img 
                            key={index}
                            className={`${e.id == selectedProduct?.id ? "border-secondarycolor" : ""} rounded-full custom-border shadow-sm aspect-square lg:w-8 w-6 hover:cursor-pointer`} 
                            loading='lazy' 
                            onClick={() => handleSelectProduct(e)}
                            title={e.color}
                            src={`${ProductImageURL}id=${data.id}&width=200&image=${e.image}`}
                        />
                    ))
                }
            </div>

        </section>

    </div>
  )
}

export default CardComp