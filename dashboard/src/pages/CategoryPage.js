import TopCategoryComp from 'components/Category/TopCategoryComp'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Category_ListAction, TopCategory_ListAction } from '../redux/action/CategoryAction'
import CategoryCreateComp from 'components/Category/CategoryCreateComp'
import TopCategoryCreateComp from 'components/Category/TopCategoryCreateComp'
import CategoryComp from 'components/Category/CategoryComp'

const CategoryPage = () => {
  const state = useSelector(state => state.CategoryReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(Category_ListAction())
    dispatch(TopCategory_ListAction())
  } , [])
  return (
    <>
      {/* category and top categories forms  */}
      <div className='custom-dashcontainer'>
          <p className='title'>الأقسام</p>

          <div className='w-full flex items-start max-lg:flex-col'>

            {/* form for creating category */}
            <CategoryCreateComp/>

            {/* form for creating top cateogry */}
            <TopCategoryCreateComp/>

          </div>
      </div>

      {/* mapping top categories and there related categories  */}
      <div className='custom-dashcontainer'>
          <p className='title'>مجموعات الأقسام</p>
          {
            state.top_categories?.map((e , index) => (
              <TopCategoryComp key={index} data={e} />
            ))
          }

          {
            !state.top_categories.length ? <p className='text-red-500 text-center'>لا يوجد أقسام</p> :null
          }
      </div>

      {/* Listing all categories to delete and update it */}
      <div className='custom-dashcontainer'>
          <p className='title'> جميع الأقسام</p>
          <div className='grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4'>
            {
              state.categories.map((e , index) => (
                <CategoryComp key={e.id} data={e} />
              ))
            }
          </div>
      </div>
    </>
  )
}

export default CategoryPage