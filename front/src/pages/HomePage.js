import CategoriesComp from 'components/home/CategoriesComp'
import ProductsQueryComp from 'components/home/ProductsQueryComp'
import FavoritesComp from 'components/home/FavoritesComp'
import React from 'react'

const HomePage = () => {
  return (
    <div className=''>
      <CategoriesComp/>

      <FavoritesComp store={"FavoriteReducer"} title={'منتجاتك المفضلة'} />

      <ProductsQueryComp list={'latest'} title={'أحدث المنتجات'}/>
      <ProductsQueryComp list={'review'} title={'الأعلي تقييما'}/>
      <ProductsQueryComp list={'price'} title={'الأقل سعرا'}/>
      <ProductsQueryComp list={'views'} title={'الأكثر مشاهدة'}/>
    </div>
  )
}

export default HomePage