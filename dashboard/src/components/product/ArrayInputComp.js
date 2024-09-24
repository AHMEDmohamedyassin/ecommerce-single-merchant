import React, { useState } from 'react'

const ArrayInputComp = ({register , reset , errors , name , title}) => {
    const [inputCount , setInputCount] = useState(3)

    const controlSizesInputs = (adding = true) => {
        setInputCount(e => adding ? e + 1 : e - 1)
        reset(values => ({...values , json : {...values.json , [name] : []}}))
    }

  return (
        <div className=''>
            <p className='text-gray-500 text-sm mb-2'>{title}</p>
            <div className='grid xl:grid-cols-9 lg:grid-cols-6 sm:grid-cols-3 grid-cols-2 gap-2'>
                {
                    Array(inputCount).fill(0).map((e , index) => (
                        <div className='flex items-end gap-2'>
                            <div key={index} className='custom-inputcontainer'>
                                <label>{`${title} - ${index + 1}`}</label>
                                <input {...register(`json.${name}.${index}`)} />
                                {errors.json?.[name] && <p>{errors.json[name].message}</p>}
                            </div>
                            {
                                inputCount <= index + 1 ? (
                                    <div className='flex flex-col'>
                                        {
                                            inputCount > 1 ? <span onClick={() => controlSizesInputs(false)} className="material-symbols-outlined text-2xl hover:cursor-pointer hover:text-gray-500">cancel</span> : null
                                        }
                                        <span onClick={controlSizesInputs} className="material-symbols-outlined text-2xl hover:cursor-pointer hover:text-gray-500 -rotate-90">loupe</span>
                                    </div>
                                ) : null
                            }
                        </div>
                    ))
                }
            </div>
        </div>
  )
}

export default ArrayInputComp