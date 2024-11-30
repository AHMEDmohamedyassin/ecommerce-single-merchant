import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Setting_SideMenuAction } from '../../redux/action/SettingAction'

const CategoriesRibbonComp = () => {
    const categories = useSelector(state => state.CategoryReducer)
    const dispatch = useDispatch()
    const [topCat , setTopCat] = useState(0)

    const openSideMenu = () => {
        dispatch(Setting_SideMenuAction())
    }
  return (
        <section onMouseLeave={() => setTopCat(0)} className='max-lg:hidden bg-secondarybg relative'>
          <div className=' custom-container flex items-center gap-x-4 py-2'>
            {/* side menu icon */}
            <div className='flex items-center -my-1'>
              <span onClick={openSideMenu} className="material-symbols-outlined sm:text-3xl text-2xl hover:cursor-pointer">segment</span>
            </div>

            {
              categories?.top_categories?.map((e , index) => (
                <div className={e.categories.length ? 'hidden' : ''} key={index}>
                  {
                    e.categories?.length ? (

                      <div onMouseEnter={() => setTopCat(e.title)} className='flex items-center gap-2'>
                        {/* top category title  */}
                        <div className={`hover:cursor-pointer ${e.title == topCat ? "text-maincolor" : ""}`}>{e.title != "other" ? e.title : "أقسام أخري"}</div>
                        
                        {/* categories  */}
                        {
                          topCat == e.title ? (
                              <div className='absolute top-full bg-secondarybg custom-border w-2/4 border-t-0 z-20 flex flex-wrap gap-4 p-4'>
                                  {
                                  e.categories?.map((ele , index) => (
                                      <Link to={`/search?categories=${ele.id}`} key={index} className='hover:text-maincolor'>{ele.title}</Link>
                                  ))
                                  }
                              </div>
                          ) : null
                        }

                        {/* separator  */}
                        {
                          index < categories.top_categories.length - 1 ? 
                            <div className='w-[1px] h-[10px] bg-maincolor'></div>
                          : null
                        }
                      </div>
                    ) : null
                  }
                </div>
              ))
            }
          </div>
        </section>
  )
}

export default CategoriesRibbonComp