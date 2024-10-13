import React from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom';

const PaginationComp = () => {
    const state = useSelector(state => state.ProductListReducer)
    const [searchParams, setSearchParams] = useSearchParams();

    const handlePaginate = (next = true) => {
        let page = searchParams.get('page')
        const newSearchParams = new URLSearchParams(searchParams);

        if(next)
            newSearchParams.set('page', (parseInt(page) || 1) + 1);
        else newSearchParams.set('page', (parseInt(page) || 1) - 1);

        setSearchParams(newSearchParams);
    }

  return (
    <>
        {
            state ? (
                <div className='flex items-center gap-4 justify-center mt-10'>
                    <button onClick={() => handlePaginate(false)} disabled={state.current < 2 ?? false} className='custom-button hover:bg-maincolor hover:text-white disabled:bg-gray-300 disabled:cursor-not-allowed'>السابق</button>
                    <div className='flex items-center font-bold'>
                        <span>{state?.current ?? ""}</span>
                        <span>/</span>
                        <span>{state.last}</span>
                    </div>
                    <button onClick={() => handlePaginate()} disabled={state.current >= state.last} className='custom-button hover:bg-maincolor hover:text-white disabled:bg-gray-300 disabled:cursor-not-allowed'>التالي</button>
                </div>
            ) : null
        }
    </>
  )
}

export default PaginationComp