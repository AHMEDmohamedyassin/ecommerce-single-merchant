import React from 'react'
import AddressesListComp from './user details components/AddressesListComp'
import TransactionsListComp from './user details components/TransactionsListComp'
import PaginationComp from './user details components/PaginationComp'
import CartListComp from './user details components/CartListComp'
import FavoritListComp from './user details components/FavoritListComp'
import BlocksListComp from './user details components/BlocksListComp'
import ContactsListComp from './user details components/ContactsListComp'
import ReviewsListComp from './user details components/ReviewsListComp'
import OrdersListComp from './user details components/OrdersListComp'
import CouponsListComp from './user details components/CouponsListComp'
import NavigationComp from './user details components/NavigationComp'

const UserDetailFormComp = () => {

  return (
    <div className='custom-dashcontainer'>
        <p className='title'>بيانات المستخدم</p>
        
        {/* navigation Component  */}
        <NavigationComp/>

        {/* components of each section */}
        <AddressesListComp/>
        <TransactionsListComp/>
        <CartListComp/>
        <FavoritListComp/>
        <BlocksListComp/>
        <ContactsListComp/>
        <ReviewsListComp/>
        <OrdersListComp/>
        <CouponsListComp/>

        {/* pagination */}
        <PaginationComp/>

    </div>
  )
}

export default UserDetailFormComp