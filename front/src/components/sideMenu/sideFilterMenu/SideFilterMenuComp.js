import { useRef, useState } from "react"
import "components/sideMenu/sideFilterMenu/sliderStyle.css"
import { useDispatch, useSelector } from "react-redux"

const SideFilterMenuComp = () => {
    const state = useSelector(state => state.ProductListReducer)
    const dispatch = useDispatch()
    const filterMenu = useRef(null)
    const [slider , setSlider] = useState({min : 0 , max : 0})

    // closing filter menu 
    const closeFilterMenu = (e = null) => {
        if(e && e.target != filterMenu.current)
            return 
        dispatch(({type:"ProductList_Data" , data : {filterMenu : false}}))
    }
  return (
    <>
        {
            state.filterMenu ? (
                <div ref={filterMenu} onClick={closeFilterMenu} className='max-h-full w-full h-full bg-white/50 fixed top-0 left-0 z-40'>
                    <div className='custom-side-menu custom-border shadow-2xl shadow-black/50 z-30'>

                        {/* header section */}
                        <section className='bg-mainbg h-14 flex justify-between items-center px-4 shadow border-b-secondarycolor border-[1px]'>
                            <span>التصفية</span>
                            <span onClick={() => closeFilterMenu()} className="material-symbols-outlined hover:cursor-pointer">close</span>
                        </section>

                        {/* pricing section */}
                        <section className='flex flex-col gap-4 px-4'>

                            {/* from price */}
                            <div>
                                <p className=''>من سعر</p>

                                <div className="flex items-center justify-between gap-4">
                                    <input className="slider w-full" onChange={(e) => setSlider({...slider , min : e.target.value})} type="range" defaultValue={100} min={50} max={2000} step={100}/>
                                    <p className="font-bold">{slider.min}</p>
                                </div>
                            </div>

                            {/* to price */}
                            <div>
                                <p className=''>إلي سعر</p>

                                <div className="flex items-center justify-between gap-4">
                                    <input className="slider w-full" onChange={(e) => setSlider({...slider , max : e.target.value})} type="range" defaultValue={100} min={50} max={2000} step={100}/>
                                    <p className="font-bold">{slider.max}</p>
                                </div>
                            </div>


                            <button className='py-1 px-2 custom-border rounded-full'>التصفية</button>
                        </section>

                    </div>
                </div>
            ) : null
        }
    </>
  )
}

export default SideFilterMenuComp