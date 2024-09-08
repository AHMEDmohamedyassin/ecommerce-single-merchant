import React from 'react'

const PrefInfoComp = () => {
  return (
    <div className='ms-4 py-6 text-sm flex flex-col gap-2 border-b-[1px] border-gray-200 overflow-hidden'>
        <p className=''>تحتاج مساعدة ؟ </p>
        <div className='flex gap-2 text-gray-500'>
            <p>اتصل بنا </p>
            <a className='hover:text-secondarycolor' href='tel:01066404523'>01066404523</a>
        </div>
        <div className='flex gap-2 text-gray-500 overflow-hidden'>
            <p className=' whitespace-nowrap'>ارسل لنا ايميل </p>
            <a className='hover:text-secondarycolor custom-text-truncate' href='mailto:ahmedmohamed982025@outlook.com'>ahmedmohamed982025@outlook.com</a>
        </div>
    </div>
  )
}

export default PrefInfoComp