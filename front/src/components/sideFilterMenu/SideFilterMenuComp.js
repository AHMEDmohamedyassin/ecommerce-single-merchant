import { useState } from "react"
import "components/sideFilterMenu/sliderStyle.css"

const SideFilterMenuComp = () => {

    const [slider , setSlider] = useState({min : 0 , max : 0})

  return (
    <div className='custom-dimming'>
        <div className='custom-side-menu right-0'>

            {/* header section */}
            <section className='bg-mainbg h-14 flex justify-between items-center px-4 shadow border-b-secondarycolor border-[1px]'>
                <span>التصفية</span>
                <span className="material-symbols-outlined">close</span>
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
  )
}

export default SideFilterMenuComp