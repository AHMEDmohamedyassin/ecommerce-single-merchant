import CardComp from 'components/dashboard/CardComp'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Setting_ListAction } from '../redux/action/SettingAction'
import StaticPagesNavComp from 'components/dashboard/StaticPagesNavComp'

const DashboardPage = () => {
  const state = useSelector(state => state.SettingReducer)
  const dispatch = useDispatch()

  const statistic_translation = {
    "visits_count" : {
      title : "عدد الزيارات" ,
      icon : "visibility" ,
    },
    "user_count" : {
      title : "عدد المستخدمين" ,
      icon : "person" ,
    },
    "reviews_count" : {
      title : "عدد المراجعات" ,
      icon : "rate_review" ,
    },
    "products_count" : {
      title : "عدد المنتجات" ,
      icon : "category" ,
    },
    "orders_count" : {
      title : "عدد الطلبات" ,
      icon : "shopping_cart" ,
    },
  }

  useEffect(() => {
    dispatch(Setting_ListAction(0))
  } , [])
  return (
    <div className='custom-dashcontainer'>
      {/* page title */}
      <p className='title'>لوحة التحكم</p>

      <div className='grid xl:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-10 mb-8'>

        {
          state.statistics?.map((e , index) => <CardComp key={index} value={e.value} title={statistic_translation[e.slug]?.title} icon={statistic_translation[e.slug]?.icon} />)
        }

      </div>

      <StaticPagesNavComp/>
    </div>
  )
}

export default DashboardPage