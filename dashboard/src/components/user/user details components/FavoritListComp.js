import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { formattingDateForUpdate } from 'validation/Validation'

const FavoritListComp = () => {
    const state = useSelector(state => state.UserReducer)
    const [edit , setEdit] = useState(null)

  return (
    <>
        {
            state.detail == 'favorite' ? (
            <>
                {
                    !state.favorite?.total ? <p className='text-sm text-center text-red-500'>لا يوجد عناوين للمستخدم</p> : (
                        <div className='custom-table'>
                            <div className='custom-tablerow'>
                                <p className='justify-center '>م</p>
                                <p className='justify-center w-40'>الكود</p>
                                <p className='justify-center w-80'>العنوان</p>
                                <p className='justify-center w-40'>تاريخ التعديل</p>
                                <p className='justify-center w-40'>تاريخ الإنشاء</p>
                            </div>
                            {
                                state.favorite?.items.map((e , index) => (
                                    <div key={index} className='custom-tablerow'>
                                        <p className='justify-center w-10' onMouseEnter={() => setEdit(e.id)} onMouseLeave={() => setEdit(null)}>
                                            {
                                                edit == e.id ? (
                                                    <Link to={`/product/update/${e.id}`}><span className="material-symbols-outlined text-blue-500 text-3xl">edit</span></Link>
                                                ) : e.id
                                            }
                                        </p>
                                        <p className='justify-center w-40'>{e.serial}</p>
                                        <p className='justify-center w-80'>{e.title}</p>
                                        <p className='justify-center w-40'>{formattingDateForUpdate(e.updated_at)}</p>
                                        <p className='justify-center w-40'>{formattingDateForUpdate(e.created_at)}</p>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </>
            ) : null
        }
    </>
  )
}

export default FavoritListComp