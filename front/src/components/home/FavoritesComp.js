import CardComp from 'components/search/CardComp'
import React from 'react'
import { useSelector } from 'react-redux'

const FavoritesComp = ({store , title}) => {
    const state = useSelector(state => state[store])
  return (
    <>
        {
            state?.items?.length ? (
                <div className='custom-container mt-12'>
                    <div className='text-gray-500 font-bold text-sm mb-4'>{title} : </div>

                    <section className='custom-products-grid'>
                    {
                        state.items?.map((e , index) => (
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

export default FavoritesComp