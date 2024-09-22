import DetailsComp from 'components/account/DetailsComp'
import UpdatePasswordComp from 'components/account/UpdatePasswordComp'
import NavigationComp from 'components/account/NavigationComp'
import React from 'react'
import { Link } from 'react-router-dom'

const AccountPage = () => {
  return (
    <div className='custom-accountcontainer'>

        {/* list */}
        <NavigationComp/>


        {/* content */}
        <section className='flex flex-col gap-4 lg:col-span-3'>

            {/* greeting */}
            <div className='flex gap-2 items-center'>
                <p className='text-xs text-gray-500'>أهلا بك</p>
                <p>أحمد محمد</p>
            </div>

            {/* Account Details  */}
            <DetailsComp/>

            {/* update password */}
            <UpdatePasswordComp/>

        </section>
        
    </div>
  )
}

export default AccountPage