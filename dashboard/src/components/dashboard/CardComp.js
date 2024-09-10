import React from 'react'

const CardComp = () => {
  return (
        <div className='relative bg-green-500 rounded-xl text-white flex flex-col items-center justify-center gap-4 p-10'>
          <p>عدد العملاء</p>
          <span className="material-symbols-outlined text-[150px] text-white/10 absolute top-2/4 left-0 -translate-y-2/4">person</span>
          <p className='text-4xl font-bold'>20</p>
        </div>
  )
}

export default CardComp