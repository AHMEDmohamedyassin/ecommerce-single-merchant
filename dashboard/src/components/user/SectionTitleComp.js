import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const SectionTitleComp = ({title , section}) => {
    const state = useSelector(state => state.UserReducer)
    const dispatch = useDispatch()

    const handleShow = () => {
        dispatch({
            type : "User_Data" ,
            data : {
                section : state.section == section ? null : section
            }
        })
    }

  return (
        <div className='flex justify-between items-start'>
            <p className='title'>{title}</p>
            {
                state.section == section ? 
                <span onClick={handleShow} className="material-symbols-outlined text-4xl">stat_1</span>
                :
                <span onClick={handleShow} className="material-symbols-outlined text-4xl">stat_minus_1</span>
            }
        </div>
  )
}

export default SectionTitleComp