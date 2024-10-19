import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Setting_SideMenuAction } from '../../../redux/action/SettingAction'

const ListComp = ({data}) => {
  const dispatch = useDispatch() 
  const [showLinks , setShowLinks] = useState(false)

  // closing cart menu
  const handleCloseMenu = () => {
      dispatch(Setting_SideMenuAction(false))
  }
  return (
    <>
      {
        data.links?.length ? (

          <div className='ps-4 text-sm hover:cursor-pointer select-none'>
              <div onClick={() => setShowLinks(!showLinks)} className='flex justify-between items-center border-b-[1px] border-gray-200 py-1'>
                  <p className='text-sm'>{data.title}</p>
                  <div className='flex items-center px-4 gap-4'>
                      <div className='h-10 w-[1px] bg-gray-200'></div>
                      {
                        showLinks ? 
                        <span className="material-symbols-outlined">remove</span> 
                        :<span className="material-symbols-outlined">add</span>
                      }
                  </div>
              </div>

              {/* internal lists */}
              {
                showLinks ? (
                  <ul data-animation="collabsedata" className='flex flex-col ps-4 text-gray-500'>
                      {
                        data.links && data.links.length ? data.links.map((e , index) => (
                          <li key={index} onClick={handleCloseMenu} className='py-3 border-b-[1px] border-gray-200'>
                            <Link to={e.url}>{e.title}</Link>
                          </li>
                        )) : null
                      }
                  </ul>
                ) : null
              }
          </div>
        ) : null
      }
    </>
  )
}

export default ListComp