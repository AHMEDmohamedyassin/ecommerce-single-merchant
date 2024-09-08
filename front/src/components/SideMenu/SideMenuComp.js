import React from 'react'
import ListComp from 'components/SideMenu/ListComp'
import PrefInfoComp from './PrefInfoComp'

const SideMenuComp = () => {
  return (
    <div className='custom-dimming'>
        <div className='custom-side-menu right-0'>

            {/* sections choose */}
            {/* <div className='h-14 flex shadow text-sm'>
                <div className='bg-[#e3e3e3] border-b-[1px] border-secondarycolor w-2/4 h-full flex items-center justify-center'>القائمة</div>
                <div className='bg-[#f3f3f3] border-b-[1px] border-[#f3f3f3] w-2/4 h-full flex items-center justify-center'>التصنيفات</div>
            </div> */}

            {/* header section */}
            <section className='bg-mainbg h-14 flex justify-between items-center px-4 shadow border-b-secondarycolor border-[1px]'>
                <span>القائمة</span>
                <span className="material-symbols-outlined">close</span>
            </section>

            {/* container for : lists , links , pref informations */}
            <div className='flex-1 overflow-y-auto'>
                <ListComp/>
                <ListComp/>
                <ListComp/>


                {/* links */}
                <div className='ms-4 text-sm flex items-center gap-2 border-b-[1px] border-gray-200 py-3'>
                    <span className="material-symbols-outlined">search</span>
                    <span>بحث</span>
                </div>

                <div className='ms-4 text-sm flex items-center gap-2 border-b-[1px] border-gray-200 py-3'>
                    <span className="material-symbols-outlined">person</span>
                    <span>دخول / تسجيل</span>
                </div>


                {/* pref informations */}
                <PrefInfoComp/>

            </div>


        </div>
    </div>
  )
}

export default SideMenuComp