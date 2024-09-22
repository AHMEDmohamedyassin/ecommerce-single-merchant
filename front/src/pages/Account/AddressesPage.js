import LocationComp from 'components/account/LocationComp'
import LocationFormComp from 'components/account/LocationFormComp'
import NavigationComp from 'components/account/NavigationComp'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Address_CreateAction, Address_ListAction } from '../../redux/action/AddressAction'

const AddressesPage = () => {
  const state = useSelector(state => state.AddressReducer)
  const dispatch = useDispatch()
  const [showForm , setShowForm] = useState(false)

  // creating new address
  const CreateAddress = (data) => {
    console.log(data)
    dispatch(Address_CreateAction(data))
  }

  // listing addresses
  useEffect(() => {
    dispatch(Address_ListAction())
  } , [])

  // closing adding address from after adding a new  address
  useEffect(() => {
    setShowForm(false)
  } , [state.items])
  return (
    <div className='custom-accountcontainer'>

        {/* list */}
        <NavigationComp/>


        {/* content */}
        <section className='flex flex-col gap-4 lg:col-span-3'>

            {
              !showForm ?  <button onClick={() => setShowForm(!showForm)} className='custom-button bg-black hover:bg-black/70 text-white w-fit mx-auto'>أضف عنوانا جديدا</button> : null
            }

            {/* create location from */}
            {
              showForm ?  <LocationFormComp cancelButton={() => setShowForm(!showForm)} fromData={CreateAddress} /> : null
            }

            {/* recorded locations  */}
            <div className='flex flex-col gap-8 px-4 mt-10'>
              {
                state.items?.map((e , index) => 
                  <LocationComp key={index} data={e} />
                )
              }
              {
                !state.items.length ? <p className=' text-center text-red-500'>لا يوجد عناوين قم بإضافة عنوان </p> : null 
              }
            </div>
        
        </section>
        
    </div>
  )
}

export default AddressesPage