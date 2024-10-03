import { selectStyle } from 'config'
import React from 'react'
import ReactInputMask from 'react-input-mask'
import { useSelector } from 'react-redux'
import Select from 'react-select'

const MainFromInputsComp = ({register , errors , setSelectedCategory , reactSelectCategoryValues , setReactSelectCategoryValues}) => {
    const categories = useSelector(state => state.CategoryReducer)

  return (
    <>
        <div className='custom-inputcontainer'>
            <label>عنوان المنتج</label>
            <input {...register("title")} />
            {errors.title && <p>{errors.title.message}</p>}
        </div>
        
        <div className='custom-inputcontainer'>
            <label>وصف المنتج</label>
            <input {...register("description")} />
            {errors.description && <p>{errors.description.message}</p>}
        </div>
        
        <div className='custom-inputcontainer'>
            <label>كود المنتج</label>
            <input {...register("serial")} />
            {errors.serial && <p>{errors.serial.message}</p>}
        </div>
        
        <div className='custom-inputcontainer'>
            <label>تاريخ النشر</label>
            <ReactInputMask 
                style={{direction:'ltr'}} 
                {...register("publish_date")}
                placeholder="DD-MM-YYYY HH:mm" mask={'99-99-9999 99:99'}
            />
            {errors.publish_date && <p>{errors.publish_date.message}</p>}
        </div>
        
        <div className='custom-inputcontainer'>
            <label>الأقسام</label>
            <Select
            closeMenuOnSelect={true}
            isMulti
            styles={selectStyle}
            placeholder={'اختر الأقسام الخاصة بالمنتج'}
            options={categories.categories.map(e => ({value : e.id , label : e.title}) )}
            onChange={(e) => {
                setSelectedCategory(e.map(ele => ele.value))
                setReactSelectCategoryValues(e)
            }}
            value={reactSelectCategoryValues}
            />
        </div>

        {/* json file data */}
        <div className='custom-inputcontainer'>
            <label>وصف مفصل عن المنتج</label>
            <textarea {...register("json.description")} rows={4}> </textarea>
            {errors.json?.description && <p>{errors.json.description.message}</p>}
        </div>
        <div className='custom-inputcontainer'>
            <label>سياسة التبديل و الإرجاء</label>
            <textarea {...register("json.restore")} rows={4}> </textarea>
            {errors.json?.restore && <p>{errors.json.restore.message}</p>}
        </div>
    </>
  )
}

export default MainFromInputsComp