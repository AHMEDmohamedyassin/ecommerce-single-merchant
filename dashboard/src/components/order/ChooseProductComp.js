import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Order_ProductSelectAction } from '../../redux/action/OrderAction'


const ChooseProductComp = () => {
    const state = useSelector(state => state.OrderReducer)
    const dispatch = useDispatch()

    const handleSelect = (e) => {
        dispatch(Order_ProductSelectAction(e.target.value))
    }
  return (
    <>
        {
            Object.keys(state.collection).length ? (
                <div className='fixed top-0 left-0 w-full h-full bg-mainbg/50 flex items-center justify-center z-20'>
                    <div className='lg:w-2/4 bg-mainbg rounded-lg custom-border shadow flex flex-col gap-4 p-4'>
                        <p className='text-sm'>{state.collection?.title} </p>
                        <p className='text-sm text-gray-500'>{state.collection?.description} </p>

                        <select onChange={handleSelect} className='custom-border'>
                            <option>اختر القطعة المناسبة</option>
                            {
                                state.collection?.product?.map((e , index) => (
                                    <option key={index} value={e.id} className='flex items-center gap-6'>{`${e.color} -  ${e.size} - [  القطع متاحة : ${e.quantity} ]`}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>    
            ) : null
        }
    </>
  )
}

export default ChooseProductComp