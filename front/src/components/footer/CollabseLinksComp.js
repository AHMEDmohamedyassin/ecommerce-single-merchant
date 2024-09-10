import { Link } from 'react-router-dom'

const CollabseLinksComp = ({data}) => {
  return (
          <div data-animation="collabsecontainer" className=' hover:cursor-pointer'>
            <div className='flex justify-between items-center bg-gray-800'>
              <p className='py-2 px-4 text-sm font-semibold'>{data.title}</p>
              <span data-animation="collabseicon" className="hidden material-symbols-outlined  text-white p-2 py-2">remove</span>
              <span data-animation="collabseicon" className="material-symbols-outlined  text-white p-2 py-2">add</span>
            </div>
            <ul data-animation="collabsedata" style={{display:"none"}} className='text-xs text-white p-4 flex flex-col gap-4'>
              {
                data.links && data.links.length ? data.links.map((e , index) => (
                  <Link key={index} to={e.url}>{e.title}</Link>
                )) : null
              }
            </ul>
          </div>
  )
}


export default CollabseLinksComp