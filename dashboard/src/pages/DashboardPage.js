import CardComp from 'components/dashboard/CardComp'
import React from 'react'

const DashboardPage = () => {
  return (
    <div className='custom-dashcontainer'>
      {/* page title */}
      <p className='title'>لوحة التحكم</p>

      <div className='grid xl:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-10 mb-8'>

        <CardComp/>
        <CardComp/>
        <CardComp/>
        <CardComp/>
        <CardComp/>

      </div>
    </div>
  )
}

export default DashboardPage