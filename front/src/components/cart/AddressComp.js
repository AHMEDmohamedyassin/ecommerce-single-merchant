import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Address_CreateAction, Address_ListAction } from '../../redux/action/AddressAction'
import LocationFormComp from 'components/account/LocationFormComp'

const AddressComp = () => {
    const address = useSelector(state => state.AddressReducer)
    const dispatch = useDispatch()
    const [selection , setSelection] = useState(null)
    const default_address = address.items?.length ?  address.items.find(e => e.default == 1)?.id ?? address.items[0]?.id : null

    // cancel create address 
    const cancelCreate = () => {
        setSelection(default_address)
    }

    // creating new address
    const CreateAddress = (data) => {
      dispatch(Address_CreateAction(data))
      cancelCreate()
    }


    // fetching addresses if not fetched before
    useEffect(() => {
        if(!address.items?.length)
            dispatch(Address_ListAction())
    } , [])

    // close adding location form after submitting new form
    useEffect(() => {
        cancelCreate()
    } , [address.items])

    useEffect(() => {
        if(selection != "new")
            dispatch({type :"Order_Data" , data : {shipping_address_id : parseInt(selection)}})
        else
            dispatch({type :"Order_Data" , data : {shipping_address_id : default_address}})

            console.log('selection ' , selection)
    } , [selection])
  return ( 
    <div>
        <div className='custom-inputcontainer'>
            <label>اختر العنوان</label>
            <select value={selection} onChange={e => setSelection(e.target.value)} className='border-gray-200 border-[1px] text-sm p-1 px-2 shadow'>
                {
                    address.items.map((e) => (
                        <option className='text-sm' key={e.id} value={e.id}>{e.address}</option>
                    ))
                }
                <option  className='text-sm text-maincolor' value={'new'}>اضف عنوانا اخر</option>
            </select>
        </div>

        {
            selection == 'new' || !address.items?.length ? <LocationFormComp cancelButton={cancelCreate} fromData={CreateAddress}/> : null
        }
    </div>
  )
}

export default AddressComp