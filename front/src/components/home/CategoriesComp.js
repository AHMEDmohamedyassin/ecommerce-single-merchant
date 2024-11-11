import React from 'react'
import { useSelector } from 'react-redux'
import CategoryCardComp from './CategoryCardComp'

const CategoriesComp = () => {
    const state = useSelector(state => state.CategoryReducer)

  return (
    <div className='custom-container flex flex-wrap gap-x-10 gap-y-4'>
        {
            state.top_categories?.map((e , index) => {
                if(e.categories.length) return  (
                    <div key={index} className='flex flex-col gap-3'>
                        <div className='text-sm font-bold text-gray-500'>{e.title == 'other' ? 'أقسام أخري' : e.title} : </div>
                        <div className='flex items-center gap-4 flex-wrap'>
                            {
                                e.categories?.map((ele , i) => (
                                    <CategoryCardComp key={i} data={ele}/>
                                ))
                            }
                        </div>
                    </div>
                ) 
                return null
            })
        }
    </div>
  )
}

export default CategoriesComp