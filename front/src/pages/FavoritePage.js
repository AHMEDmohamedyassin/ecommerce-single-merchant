import CardComp from 'components/search/CardComp'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Favorite_ListAction } from '../redux/action/FavoriteAction'

const FavoritePage = () => {
    const state = useSelector(state => state.FavoriteReducer)
    const auth = useSelector(state => state.AuthReducer)
    const dispatch = useDispatch()

    const handlePaginate = () => {
        dispatch(Favorite_ListAction(state.current + 1))
    }

    useEffect(() => {
        dispatch(Favorite_ListAction())
    } , [auth])
  return (
    <>
        {/* gird of products */}
        <section className='custom-products-grid'>
        {
            state.items.map((e , index) => (
            <CardComp key={e.id} data={e}/>
            ))
        }
        </section>

        {/* empty page message  */}
        <p style={{display : state.total ? "none" : "block"}} className='text-center pt-10 text-gray-500'>
            لا يوجد منتجات في المفضلة 
        </p>

        {/* pagination  */}
        <div className='w-full flex justify-center mt-20'>
            <button disabled={!state.hasMore} onClick={handlePaginate} className='custom-button2 hover:bg-maincolor disabled:bg-gray-500 disabled:cursor-not-allowed'>المزيد</button>
        </div>
    </>

  )
}

export default FavoritePage