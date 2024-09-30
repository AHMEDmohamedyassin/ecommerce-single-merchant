import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Block_DisableAction, Block_DisableUserBlocksAction } from '../../../redux/action/UserBlockAction'
import { formattingDateForUpdate } from 'validation/Validation'

const BlocksListComp = () => {
    const state = useSelector(state => state.UserReducer)
    const dispatch = useDispatch()

    // remove block
    const handleRemoveBlock = (id) => {
        dispatch(Block_DisableAction(id))
    }

    // remove all blocks
    const handleRemoveAllBlocks = () => {
        dispatch(Block_DisableUserBlocksAction(state.id))
    }
  return (
    <>
        {
            state.detail == 'block' ? (
            <>
                {
                    !state.block?.total ? <p className='text-sm text-center text-red-500'>لا يوجد عناوين للمستخدم</p> : (
                        
                        <div>
                            <button className='custom-button2' onClick={handleRemoveAllBlocks}>إزالة الكل</button>

                            <div className='custom-table'>
                                <div className='custom-tablerow bg-mainbg'>
                                    <p className='justify-center sticky right-0'>م</p>
                                    <p className='justify-center w-80'>سبب الحظر</p>
                                    <p className='justify-center w-40'>صلاحية الحظر</p>
                                    <p className='justify-center w-40'>تاريخ التعديل</p>
                                    <p className='justify-center w-40'>تاريخ الإنشاء</p>
                                    <p className='justify-center w-40'>إلغاء الحظر</p>
                                </div>
                                {
                                    state.block?.items.map((e , index) => (
                                        <div key={index} className='custom-tablerow'>
                                            <p className='justify-center bg-mainbg sticky right-0'>{e.id}</p>
                                            <p className='justify-center w-80'>{e.reason}</p>
                                            <p className='justify-center w-40'>{formattingDateForUpdate(e.expire_date)}</p>
                                            <p className='justify-center w-40'>{formattingDateForUpdate(e.updated_at)}</p>
                                            <p className='justify-center w-40'>{formattingDateForUpdate(e.created_at)}</p>
                                            <p className='justify-center w-40'>
                                                {
                                                    new Date(e.expire_date).getTime() > new Date().getTime() ? 
                                                    <span title='إلغاء ذلك الحظر' onClick={() => handleRemoveBlock(e.id)} className="material-symbols-outlined hover:text-green-500">do_not_disturb_off</span>
                                                    : "حظر غير فعال"
                                                }
                                            </p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        
                    )
                }
            </>
            ) : null
        }
    </>
  )
}

export default BlocksListComp