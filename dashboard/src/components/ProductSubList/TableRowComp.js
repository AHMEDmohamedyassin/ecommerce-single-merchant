import { ImageURL } from 'Fetch/Url'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { formattingDateForUpdate } from 'validation/Validation'
import { ProductSubList_DeleteAction } from '../../redux/action/ProductSubListAction'

const TableRowComp = ({data}) => {
    const dispatch = useDispatch()
    const [showEdit , setShowEdit] = useState(false)
    
    const handleDelete = () => {
        dispatch(ProductSubList_DeleteAction(data.id))
    }

  return (
            <tr className='custom-tablerow border-gray-500 border-t-2 '>
              
              {/* product id  */}
              <p onMouseEnter={() => setShowEdit(true)} onMouseLeave={() => setShowEdit(false)} className='w-10 z-10 sticky right-0 justify-center bg-mainbg'>
                {
                  showEdit ? 
                  <Link to={`/product/update/${data.collection?.id ?? "/"}`}><span className="material-symbols-outlined cursor-pointer text-blue-500 text-3xl">edit</span></Link>
                    :
                  <span>{data.id}</span>
                }
              </p>

              {/* image  */}
              <p className='w-32 relative h-12 overflow-hidden'>
                    <img className='w-full h-full object-cover absolute inset-center' src={data.image ? `${ImageURL}?type=product&width=200&image=${data.image}&id=${data.collection.id}` : `${ImageURL}?type=product&width=200&order=0&id=${data.collection.id}`} loading='lazy' />
              </p>

              <p className={`w-80`}>{data['collection'] ? data['collection']['title'] : ''}</p>
              <p className={`w-80`}>{data['collection'] ? data['collection']['description'] : ''}</p>
              
              
              <p className={`w-32 justify-center text-center ${data['quantity'] < 3 ? "text-red-500" : ""} font-bold`}>{data['quantity'] > 0 ? data['quantity'] : 'لا توجد قطع'}</p>
              <p className={`w-20 justify-center`}>{data['paid_quantity']}</p>
              <p className={`w-32 justify-center`}>{data['size']}</p>
              <p className={`w-32 justify-center`}>{data['color']}</p>
              <p className={`w-20 justify-center`}>{data['price']}</p>
              <p className={`w-20 justify-center`}>{data['old_price']}</p>

              <p className={`w-20 justify-center`}>{data['collection'] ? data['collection']["ratting"] : ""}</p>
              <p className={`w-20 justify-center`}>{data['collection'] ? data['collection']["views"] : ""}</p>
              <p className={`w-20 justify-center`}>{data['collection'] ? data['collection']["reviews"] : ""}</p>

              <p className={`w-40 justify-center`}>{data['collection'] ? formattingDateForUpdate(data['collection']["publish_date"]) : ""}</p>
              <p className={`w-40 justify-center`}>{formattingDateForUpdate(data["updated_at"])}</p>
              <p className={`w-40 justify-center`}>{formattingDateForUpdate(data["created_at"])}</p>
              <p className={`w-10 justify-center`} title={`حذف المنتج ${data['title']}`} ><span onClick={handleDelete} className="material-symbols-outlined hover:text-red-500 hover:cursor-pointer">delete</span></p>
            </tr>
  )
}

export default TableRowComp