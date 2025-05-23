import { AnimatePresence , motion} from 'motion/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const CollabseLinksComp = ({data}) => {
  const [details , setDetails] = useState(false)
  return (
          <div onClick={() => setDetails(!details)} className=' hover:cursor-pointer'>
            <div className='flex justify-between items-center bg-gray-800'>
              <p className='py-2 px-4 text-sm font-semibold'>{data.title}</p>
              {
                details ? 
                <span className="material-symbols-outlined  text-white p-2 py-2">remove</span>
                :
                <span className="material-symbols-outlined  text-white p-2 py-2">add</span>
              }
            </div>

            <AnimatePresence>
              {
                details ? (
                  <motion.ul 
                    initial={{opacity:0}}
                    exit={{opacity:0}}
                    animate={{ opacity : '100%' }}
                    transition={{ duration: 0.2 , ease: "linear"}}
                    className='text-xs text-white p-4 flex flex-col gap-4'
                  >
                    {
                      data.links && data.links.length ? data.links.map((e , index) => (
                        <Link key={index} to={e.url}>{e.title}</Link>
                      )) : null
                    }
                  </motion.ul>
                ) : null
              }
            </AnimatePresence>
          </div>
  )
}


export default CollabseLinksComp