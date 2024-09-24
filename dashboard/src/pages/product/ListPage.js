import SearchComp from 'components/productlist/SearchComp'
import TableRowComp from 'components/productlist/TableRowComp'
import React from 'react'

const ListPage = () => {
  return (
    <div className='custom-dashcontainer'>
      <p className='title'>المنتجات</p>

      {/* search container */}
      <SearchComp/>

      {/* table */}
        <div className='custom-table'>
            <div className='custom-tablerow custom-tablehead'>
              <p className='w-10 sticky right-0' title='م'>م</p>
              <p className='w-32' title='صورة'>صورة</p>
              <p className='w-40' title='العنوان'>العنوان</p>
              <p className='w-80' title='الوصف'>الوصف</p>
              <p className='w-20' title='السعر'>السعر</p>
              <p className='w-20' title='السعر قبل الخصم'>السعر قبل الخصم</p>
              <p className='w-20' title='المبيعات'>المبيعات</p>
              <p className='w-20' title='المشاهدات'>المشاهدات</p>
              <p className='w-40' title='العنوان'>العنوان</p>
              <p className='w-80' title='الوصف'>الوصف</p>
              <p className='w-20' title='السعر'>السعر</p>
              <p className='w-20' title='السعر قبل الخصم'>السعر قبل الخصم</p>
              <p className='w-20' title='المبيعات'>المبيعات</p>
              <p className='w-20' title='المشاهدات'>المشاهدات</p>
            </div>

            <TableRowComp id={1} img={'/facebook.png'} data={[{w:40 , data :'قميص رجالي قميص رجالي'} , {w:80 , data:'قميص رجالي قميص رجالي قميص رجالي قميص رجالي قميص رجالي قميص رجالي'} , {w:20 , data:'100 جم'} ,{w:20 , data:'100 جم'} , {w:20 , data:111} ,{w:20 , data:2323}  , {w:40 , data :'قميص رجالي قميص رجالي'} , {w:80 , data:'قميص رجالي قميص رجالي قميص رجالي قميص رجالي قميص رجالي قميص رجالي'} , {w:20 , data:'100 جم'} ,{w:20 , data:'100 جم'} , {w:20 , data:111} ,{w:20 , data:2323} ]} />
            
        </div>


        {/* pagination */}
        <div className='flex items-center gap-4 mx-auto w-fit'>
          <button className='custom-button'>التالي</button>
          <div className='flex items-center gap-2'>
            <p>2</p>
            <p>/</p>
            <p>3</p>
          </div>
          <button className='custom-button'>السابق</button>
        </div>

    </div>
  )
}

export default ListPage