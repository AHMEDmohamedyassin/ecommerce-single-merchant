import PriceSliderComp from "./PriceSliderComp"

const SideFilterMenuComp = () => {


  return (
    <div className='custom-dimming'>
        <div className='custom-side-menu right-0'>

            {/* header section */}
            <section className='bg-mainbg h-14 flex justify-between items-center px-4 shadow border-b-secondarycolor border-[1px]'>
                <span>التصفية</span>
                <span className="material-symbols-outlined">close</span>
            </section>

            {/* pricing section */}
            <section className='px-4'>
                <p className=''>السعر</p>

                <div>
                    <PriceSliderComp/>
                </div>


                <div className='flex  text-sm'>
                    <p className='text-gray-500'>السعر : </p>
                    <p className='font-bold'><input value={100} disabled className='bg-transparent w-8 text-center'/> جم - <input value={400} disabled className='bg-transparent w-8 text-center'/> جم</p>
                </div>

                <button className='py-1 px-2 custom-border rounded-full'>التصفية</button>
            </section>

        </div>
    </div>
  )
}

export default SideFilterMenuComp