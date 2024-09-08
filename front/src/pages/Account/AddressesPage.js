import LocationComp from 'components/account/LocationComp'
import LocationFormComp from 'components/account/LocationFormComp'
import NavigationComp from 'components/account/NavigationComp'
import React from 'react'

const AddressesPage = () => {
  return (
    <div className='custom-accountcontainer'>

        {/* list */}
        <NavigationComp/>


        {/* content */}
        <section className='flex flex-col gap-4 lg:col-span-3'>

            <button className='custom-button bg-black hover:bg-black/70 text-white w-fit mx-auto'>أضف عنوانا جديدا</button>

            {/* create location from */}
            {/* <LocationFormComp/> */}

            {/* recorded locations  */}
            <div className='flex flex-col gap-8 px-4 mt-10'>
                <LocationComp/>
                <LocationComp/>
                <LocationComp/>
                <LocationComp/>
                <LocationComp/>
            </div>
        
        </section>
        
    </div>
  )
}

export default AddressesPage