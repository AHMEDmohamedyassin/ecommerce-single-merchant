import { AnimatePresence , motion} from 'motion/react'
import React, { useState } from 'react'

const CollabsedDetailsComp = ({title , data}) => {
    const [details , setDetails] = useState(false)
  return (
          <div onClick={() => setDetails(!details)} className='custom-border border-[1px] hover:cursor-pointer'>
            <div className='flex justify-between items-center bg-gray-100'>
              <p className='py-2 px-4 text-sm font-semibold'>{title}</p>
              {
                details ? 
                    <span className="material-symbols-outlined bg-black text-white p-2 py-2">remove</span>
                :
                    <span className="material-symbols-outlined bg-black text-white p-2 py-2">add</span>
              }
            </div>
            
            <AnimatePresence>
                {
                    details ? (
                        <motion.div 
                          initial={{opacity:0}}
                          exit={{opacity:0}}
                          animate={{ opacity : '100%' }}
                          transition={{ duration: 0.2 , ease: "linear"}}
                          className='text-sm text-gray-500 text-justify p-4'
                        >{data ?? <p >لا توجد</p>}</motion.div>
                    ) : null
                }
            </AnimatePresence>
          </div>
  )
}

export default CollabsedDetailsComp