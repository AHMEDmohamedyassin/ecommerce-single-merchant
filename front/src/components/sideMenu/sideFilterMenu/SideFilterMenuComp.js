import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useSearchParams } from "react-router-dom"

const SideFilterMenuComp = () => {
    const state = useSelector(state => state.ProductListReducer)
    const categroies = useSelector(state => state.CategoryReducer)
    const dispatch = useDispatch()
    const filterMenu = useRef(null)
    const [searchParams , setSearchParams] = useSearchParams()
    const [selectedCategories , setSelectedCategories] = useState([])

    // closing filter menu 
    const closeFilterMenu = (e = null) => {
        if(e && e.target != filterMenu.current)
            return 
        dispatch(({type:"ProductList_Data" , data : {filterMenu : false}}))
    }

    // submitting form
    const handleSubmit = e => {
        e.preventDefault()

        const form = new FormData(e.target)

        const newSearchParams = new URLSearchParams(searchParams);
        
        newSearchParams.delete('categories');

        form.getAll('categories').map(e => {
            newSearchParams.append('categories', e)
        })

        setSearchParams(newSearchParams);
    }

    useEffect(() => {
        setSelectedCategories(searchParams.getAll('categories'))
        closeFilterMenu()
    } , [searchParams])
  return (
    <>
        {
            state.filterMenu ? (
                <div ref={filterMenu} onClick={closeFilterMenu} className='max-h-full w-full h-full bg-white/50 fixed top-0 left-0 z-40'>
                    <form onSubmit={handleSubmit} className='custom-side-menu custom-border shadow-2xl shadow-black/50 z-30 flex flex-col'>

                        {/* header section */}
                        <section className='bg-mainbg h-14 flex justify-between items-center px-4 shadow border-b-secondarycolor border-[1px]'>
                            <span>التصفية</span>
                            <span onClick={() => closeFilterMenu()} className="material-symbols-outlined hover:cursor-pointer">close</span>
                        </section>

                        {/* categories  */}
                        <div className="flex-1 h-full overflow-y-auto">
                            {
                                categroies.top_categories?.map((e , index) => (
                                    <>
                                        {
                                            e.categories?.length ? (
                                                <div key={index}>
                                                    <p className="text-gray-500 custom-border border-x-0 px-2 py-1">{e.title}</p>
                                                    {
                                                        e.categories?.map((ele , index) => (
                                                            <div key={index} className="flex items-center px-4 gap-4 custom-border border-x-0 py-2">
                                                                <input name="categories" value={ele.id} type="checkbox" defaultChecked={selectedCategories.includes(String(ele.id))} className="cursor-pointer aspect-square w-5"/>
                                                                <p>{ele.title}</p>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            ) : null
                                        }
                                    </>
                                ))
                            }
                        </div>


                        {/* submit button  */}
                        <div style={{boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)'}} className=' px-4 py-6 flex gap-4'>
                            <button className="custom-button2 w-full">تأكيد</button>
                            <Link to={'/search'} className="custom-button2 w-full">إعادة</Link>
                        </div>
                    </form>
                </div>
            ) : null
        }
    </>
  )
}

export default SideFilterMenuComp