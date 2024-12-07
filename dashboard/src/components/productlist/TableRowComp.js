import React, { useState } from 'react'
import { formattingDateForUpdate } from '../../validation/Validation'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ProductList_DeleteAction, ProductList_DeleteSubProductAction } from '../../redux/action/ProductListAction'
import { ImageURL } from 'Fetch/Url'

const TableRowComp = ({ data}) => {
  const dispatch = useDispatch()
  const [showEdit , setShowEdit] = useState(false)
  const [showPieces , setShowPieces] = useState(false)
  
  // delete products collection
  const handleDelete = () => {
    dispatch(ProductList_DeleteAction(data.id))
  }


  // delete sub product
  const handleDeleteSubProduct = id => {
    dispatch(ProductList_DeleteSubProductAction(data.id , id))
  }

  return (
          <div className=''>
            <tr className='custom-tablerow border-gray-500 border-t-2 '>
              
              {/* product id  */}
              <p onMouseEnter={() => setShowEdit(true)} onMouseLeave={() => setShowEdit(false)} className='w-10 sticky right-0 justify-center bg-mainbg'>
                {
                  showEdit ? 
                  <Link to={`/product/update/${data.id}`}><span className="material-symbols-outlined cursor-pointer text-blue-500 text-3xl">edit</span></Link>
                    :
                  <span>{data.id}</span>
                }
              </p>

              {/* image  */}
              <p onClick={() => setShowPieces(!showPieces)} className='w-32 relative h-12 overflow-hidden hover:cursor-pointer'><img className='w-full h-full object-cover absolute inset-center' src={`${ImageURL}?type=product&width=200&order=0&id=${data.id}`} loading='lazy' /></p>

              <p className={`w-80`}>{data["title"]}</p>
              <p className={`w-80`}>{data["description"]}</p>
              <p className={`w-20 justify-center`}>{(data.product || []).map(e => e.quantity)?.reduce((pre , cur) => pre+cur , 0)}</p>
              <p className={`w-20 justify-center`}>{data["ratting"]}</p>
              <p className={`w-20 justify-center`}>{data["views"]}</p>
              <p className={`w-20 justify-center`}>{data["reviews"]}</p>
              <p className={`w-40 justify-center`}>{formattingDateForUpdate(data["publish_date"])}</p>
              <p className={`w-40 justify-center`}>{formattingDateForUpdate(data["updated_at"])}</p>
              <p className={`w-40 justify-center`}>{formattingDateForUpdate(data["created_at"])}</p>
              <p className={`w-10 justify-center`} title={`حذف المنتج ${data['title']}`} ><span onClick={handleDelete} className="material-symbols-outlined hover:text-red-500 hover:cursor-pointer">delete</span></p>
            </tr>
            
            {
              showPieces && data.product?.map((e , index) => (
                <tr key={index} className='custom-tablerow'>
                  <p className='w-40'>قطعة رقم : {index + 1}</p>
                  <p className={`w-40`}>اللون : {e.color}</p>
                  <p className={`w-40`}>المقاس : {e.size}</p>
                  <p className={`w-40`}>السعر : {e.price}</p>
                  <p className={`w-40`}>السعر قبل الخصم : {e.old_price}</p>
                  <p className={`w-40`}>الكمية : {e.quantity}</p>
                  <p className={`w-40`}>المبيعات : {e.paid_quantity}</p>
                  <p className={`w-10 justify-center`} title={`حذف القطعة ${data['title']}`} ><span onClick={() => handleDeleteSubProduct(e.id)} className="material-symbols-outlined hover:text-red-500 hover:cursor-pointer">delete</span></p>
                </tr>
              ))
            }
          </div>
  )
}
export default TableRowComp