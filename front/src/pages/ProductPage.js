import ButtonsComp from 'components/product/ButtonsComp'
import CollabsedDetailsComp from 'components/product/CollabsedDetailsComp'
import DetailsComp from 'components/product/DetailsComp'
import GalleryComp from 'components/product/GalleryComp'
import PathComp from 'components/product/PathComp'
import CardComp from 'components/search/CardComp'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Product_ReadAction } from '../redux/action/ProductAction'
import { Favorite_CheckAction } from '../redux/action/FavoriteAction'
import { ProductList_Categories } from '../redux/action/ProductListAction'

const ProductPage = () => {
  const state = useSelector(state => state.ProductReducer) 
  const static_store = useSelector(state => state.StaticReducer)
  const auth = useSelector(state => state.AuthReducer) 
  const products = useSelector(state => state.ProductListReducer)
  const dispatch = useDispatch()
  const params = useParams()

  useEffect(() => {
    dispatch(Product_ReadAction(params.id))
    window.scrollTo({top:0 , behavior : "smooth"})
  } , [params.id])
  
  useEffect(() => {
    dispatch(Favorite_CheckAction(params.id))
  } , [auth])

  useEffect(() => {
    if(!products.items.length && state.id == params.id)
      dispatch(ProductList_Categories( state.category.map(e => e.id) ))
  } , [state])
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
          <CollabsedDetailsComp title={'وصف المنتج'} data={state.json?.description} />

          {/* showing the global return policy of store if the return policy of the product not assigned */}
          {
            static_store.policy?.return_policy ? 
              <CollabsedDetailsComp title={'سياسة الاسترجاع'} data={state.json?.restore ?? static_store.policy.return_policy} />
            : null
          }
          
          {
            static_store.policy?.shipping_policy? (
              <CollabsedDetailsComp title={'سياسة الشحن'} data={static_store.policy.shipping_policy} />
            ) : null
          }
        </section>


        {/* related products */}
        <section>
          <p className='text-xl text-center font-bold mt-12 mb-6'>منتجات ذات صلة</p>
          <div className='custom-products-grid'>
            {
              products.items.map((e , index) => (
                <CardComp key={e.id} data={e}/>
              ))
            }
          </div>
        </section>
    </div>
  )
}

export default ProductPage