import React, { useState } from 'react'
import { formattingDateForUpdate } from '../../validation/ProductValidation'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ProductList_DeleteAction } from '../../redux/action/ProductListAction'
import { ImageURL } from 'Fetch/Url'

const TableRowComp = ({ data}) => {
  const dispatch = useDispatch()
  const [showEdit , setShowEdit] = useState(false)
  
  
  const handleDelete = () => {
    dispatch(ProductList_DeleteAction(data.id))
  }

  return (
            <tr className='custom-tablerow'>
              <p onMouseEnter={() => setShowEdit(true)} onMouseLeave={() => setShowEdit(false)} className='w-10 sticky right-0 justify-center bg-mainbg'>
                {
                  showEdit ? 
                  <Link to={`/product/update/${data.id}`}><span className="material-symbols-outlined cursor-pointer text-blue-500 text-3xl">edit</span></Link>
                    :
                  <span>{data.id}</span>
                }
              </p>
              <p className='w-32 relative h-12 overflow-hidden'><img className='w-full h-full object-cover absolute inset-center' src={`${ImageURL}?type=product&width=200&order=0&id=${data.id}`} loading='lazy' /></p>

              <p className={`w-80`}>{data["title"]}</p>
              <p className={`w-80`}>{data["description"]}</p>
              <p className={`w-20`}>{data["price"]}</p>
              <p className={`w-20`}>{data["old_price"]}</p>
              <p className={`w-20`}>{data["quantity"]}</p>
              <p className={`w-20`}>{data["ratting"]}</p>
              <p className={`w-20`}>{data["views"]}</p>
              <p className={`w-20`}>{data["reviews"]}</p>
              <p className={`w-20`}>{data["paid_quantity"]}</p>
              <p className={`w-40 justify-center`}>{formattingDateForUpdate(data["publish_date"])}</p>
              <p className={`w-40 justify-center`}>{formattingDateForUpdate(data["updated_at"])}</p>
              <p className={`w-40 justify-center`}>{formattingDateForUpdate(data["created_at"])}</p>
              <p className={`w-10 justify-center`}><span onClick={handleDelete} className="material-symbols-outlined hover:text-red-500 hover:cursor-pointer">delete</span></p>
            </tr>
  )
}
export default TableRowComp