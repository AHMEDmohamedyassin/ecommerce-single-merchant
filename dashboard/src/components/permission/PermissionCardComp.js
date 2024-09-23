import React, { useRef } from 'react'

const PermissionCardComp = ({checked , data , register}) => {
    return (
        <div className='flex items-center gap-2'>
            <input {...register("permission_id")} value={data.id} checked={checked}  type='checkbox' />
            <button>{data.title?.length ? data.title : data.slug}</button>
        </div>
    )
}

export default PermissionCardComp