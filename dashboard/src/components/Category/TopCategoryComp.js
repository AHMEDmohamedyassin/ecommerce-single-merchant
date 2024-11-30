import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { CategoryUpdateValidation } from '../../validation/CategoryValidation';
import { TopCategory_AppendAction, TopCategory_DeleteAction } from '../../redux/action/CategoryAction';

const TopCategoryComp = ({data}) => {
    const state = useSelector(state => state.CategoryReducer)
    const dispatch = useDispatch()
    const [showCategories , setShowCategories] = useState(false)

    // form hook
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode : "onBlur" ,
        resolver: zodResolver(CategoryUpdateValidation)
    });

    // update top categories handeling
    const handleTopCategoryUpdate = (form_data) => {
        dispatch(TopCategory_AppendAction({...form_data , title : data.title}))
    }

    // delete role
    const deleteHandle = () => {
        dispatch(TopCategory_DeleteAction(data.title))
    }

  return (
        <form onSubmit={handleSubmit(handleTopCategoryUpdate)}  className='flex flex-col custom-border border-x-0 '>
            {/* category title*/}
            <div type='button' className='flex justify-between items-center gap-4 py-4'>
                {/* category title */}
                <button type='button' className='w-full font-semibold bg-transparent text-start' onClick={() => setShowCategories(!showCategories)}>{data?.title?.length && data.title != "other" ? data?.title : data.title == "other" ? "أقسام ليست ضمن مجموعة" : data?.slug }</button>

                {/* button to show permissions of role */}
                <span onClick={() => setShowCategories(!showCategories)}  style={{rotate:showCategories?"180deg" : "0deg"}} className="material-symbols-outlined hover:cursor-pointer">keyboard_arrow_down</span>
            </div>

            {/* categories list */}
            {
                showCategories ? (
                    <div className='flex flex-wrap gap-8 p-4'>
                        <div className='w-full grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-2 '>
                            {/* mapping the categories and creating check box which is checked by default if the top category contains category */}
                            {
                                state?.categories?.map((e , index) => 
                                    <div key={index} className='flex items-center gap-2'>
                                        {
                                            data.title != "other" ? (
                                                <input {...register('ids')} value={e.id} type='checkbox' defaultChecked={data.categories.find(ele => ele.id == e.id) ?? false} />
                                            ) : null
                                        }
                                        <p>{e.title?.length? e.title : e.slug}</p>
                                    </div>
                                )
                            }
                        </div>

                        {/* delete and update button of role */}
                        {
                            data.title != "other" ? (
                                <div className='flex justify-between items-center flex-wrap gap-x-4 gap-y-2'>
                                    <button type='submit' className='custom-button2'>تأكيد</button>
                                    <button onClick={deleteHandle} type='button' className='custom-button2 '>حذف مجموعة الأقسام</button>
                                </div>
                            ) : null
                        }
                    </div>
                ) : null
            }
        </form>
  )
}

export default TopCategoryComp