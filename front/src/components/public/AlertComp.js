import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const AlertComp = () => {
    const state = useSelector(state => state.AlertReducer)
    const dispatch = useDispatch()

    const rejectHandle = () => {
        state.reject()
        dispatch({type:"Alert_Reset"})
    }

    const actionHandle = (fn) => {
        fn();
        dispatch({type:"Alert_Reset"})
    }

  return (
    <>
        {
            state.msg ? (
                <div className='dimmingBg'>
                    <section>
                        <h1 className='lg:font-bold'>{state.msg}</h1>
                        <div className='w-full flex max-lg:justify-between justify-around gap-4'>
                            {
                                state.buttons.map((e , index) => (
                                    <button key={index} onClick={() => actionHandle(e.fn)} className='max-lg:py-1 thebutton'>{e.msg}</button>
                                ))
                            }
                            {
                                state.reject_msg ? 
                                    <button onClick={rejectHandle} className='max-lg:py-1 thebutton'>{state.reject_msg}</button>
                                :null
                            }
                        </div>
                    </section>
                </div>
            ) : null
        }
    </>
  )
}

export default AlertComp