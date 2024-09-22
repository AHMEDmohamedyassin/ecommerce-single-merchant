import React, { useEffect, useState } from 'react'
import LocationFormComp from './LocationFormComp'
import { useDispatch, useSelector } from 'react-redux'
import { Address_DeleteAction, Address_ReadAction, Address_UpdateAction } from '../../redux/action/AddressAction'

const LocationComp = ({data}) => {
  const state = useSelector(state => state.AddressReducer)
  const dispatch = useDispatch()
  const [showForm , setShowForm] = useState(false)
  
  // showing Form and address details
  const ShowEditFrom = () => {
    setShowForm(!showForm)

    if(!showForm)
        dispatch(Address_ReadAction(data.id))
  }

  // editing address
  const handleEdit = (form_data) => {
    form_data["id"] = data.id
    console.log(form_data)
    dispatch(Address_UpdateAction(form_data))
  }

  // delete address 
  const handleDelete = () => {
    dispatch(Address_DeleteAction(data.id))
  }

  return (
    <div className=''>
        <p>{data?.address}</p>
        
        {/* buttons */}
        <div className='flex gap-6 mt-2'>

            {/* button opens edit from  */}
            <button disabled={showForm && state.status == 'lr'} onClick={ShowEditFrom} type='button' className='text-xs w-20 h-10 custom-border bg-black text-white hover:bg-black/70 disabled:bg-black/70'>{
              showForm && state.status == 'lr' ? "جاري التحميل" : "تعديل"
            }</button>

            {/* button delete address */}
            <button disabled={state.status == 'ld'} onClick={handleDelete} className='text-xs w-20 h-10 custom-border hover:border-black hover:border-[1px]'>{
              state.status == `ld${data.id}` ? "جاري التحميل" : "حذف"
            }</button>
        </div>

        {/* the update from */}
        {
          showForm && state.status != 'lr' && data.id == state.address?.id ? 
            <LocationFormComp 
              title={`تعديل العنوان ( ${data?.address?.slice(0 , 20) ?? ""} )`} 
              cancelButton={() => setShowForm(false)}
              defaultValues={state.address}
              fromData={handleEdit}
            /> : null
        }
    </div>
  )
}

export default LocationComp