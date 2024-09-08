import ButtonsComp from 'components/product/ButtonsComp'
import CollabsedDetailsComp from 'components/product/CollabsedDetailsComp'
import DetailsComp from 'components/product/DetailsComp'
import GalleryComp from 'components/product/GalleryComp'
import PathComp from 'components/product/PathComp'
import CardComp from 'components/search/CardComp'
import React from 'react'
import { Link } from 'react-router-dom'

const ProductPage = () => {
  return (
    <div className='custom-container'>
        
        {/* product path */}
        <PathComp/>

        {/* product details and images  */}
        <section className='custom-productsection grid md:grid-cols-2 gap-10'>

          {/* product images section */}
          <GalleryComp/>

          {/* product details section */}
          <DetailsComp/>

        </section>

        {/* additonal details */}
        <section className='custom-productsection flex flex-col gap-4'>

          <CollabsedDetailsComp/>
          <CollabsedDetailsComp/>
          <CollabsedDetailsComp/>
          <CollabsedDetailsComp/>
          <CollabsedDetailsComp/>

        </section>


        {/* related products */}
        <section>
          <p className='text-xl text-center font-bold mt-12 mb-6'>منتجات ذات صلة</p>
          <div className='custom-products-grid'>
            <CardComp/>
            <CardComp/>
            <CardComp/>
            <CardComp/>
            <CardComp/>
            <CardComp/>
            <CardComp/>
            <CardComp/>
            <CardComp/>
          </div>
        </section>
    </div>
  )
}

export default ProductPage