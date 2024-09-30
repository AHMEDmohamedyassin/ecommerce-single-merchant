import React from 'react'

const CardComp = ({title , value , icon}) => {
  const colors = ['bg-green-500' , 'bg-blue-500' , 'bg-purple-500' , 'bg-gray-500' , 'bg-red-500' , 'bg-maincolor']
  return (
        <div className={`relative ${colors[Math.floor(Math.random() * 5) + 1]} rounded-xl text-white flex flex-col items-center justify-center gap-4 p-10`}>
          <p>{title}</p>
          <span className="material-symbols-outlined text-[150px] text-white/10 absolute top-2/4 left-0 -translate-y-2/4">{icon}</span>
          <p className='text-4xl font-bold'>{value}</p>
        </div>
  )
}

export default CardComp