import React from 'react'

const TableRowComp = ({id , img , data}) => {
  return (
            <tr className='custom-tablerow'>
              <p className='w-10 sticky right-0'>{id}</p>
              <p className='w-32 py-1'><img className='w-full h-full object-contain' src={img} loading='lazy' /></p>
              {
                data && data.length ? data.map((e , index) => (
                    <p className={`w-${e.w}`} key={index}>{e.data}</p>
                )) : null
              }
            </tr>
  )
}

export default TableRowComp