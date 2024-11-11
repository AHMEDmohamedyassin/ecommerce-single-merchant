import CardComp from 'components/search/CardComp'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Home_OrderAction } from '../../redux/action/HomeAction'

const ProductsQueryComp = ({list , title}) => {
    const state = useSelector(state => state.HomeReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(Home_OrderAction(list))
    } , [])
  return (
    <>
        {
            state[list]?.length ? (
                <div className='custom-container mt-12'>
                    <div className='text-gray-500 font-bold text-sm mb-4'>{title} : </div>

                    <section className='custom-products-grid'>
                    {
                        state[list].map((e , index) => (
                        <CardComp key={e.id} data={e}/>
                        ))
                    }
                    </section>
                </div>
            ) : null
        }
    </>
  )
}

export default ProductsQueryComp