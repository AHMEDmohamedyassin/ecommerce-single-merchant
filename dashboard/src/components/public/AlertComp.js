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
                <div className='fixed top-0 left-0 w-full h-full bg-white/50 z-30 flex items-center justify-center'>
                    <section className='w-2/4 custom-border rounded-xl p-4 bg-mainbg flex flex-col gap-4'>
                        <h1 className='text-sm text-justify text-wrap break-words'>{state.msg}</h1>
                        <div className='w-full flex max-lg:justify-between justify-around gap-4'>
                            {
                                state.buttons.length ? state.buttons.map((e , index) => (
                                    <button key={index} onClick={() => actionHandle(e.fn)} className='custom-button bg-white hover:bg-black'>{e.msg}</button>
                                )) : null
                            }
                            {
                                state.reject_msg ? 
                                    <button onClick={rejectHandle} className='custom-button bg-white hover:bg-red-500'>{state.reject_msg}</button>
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