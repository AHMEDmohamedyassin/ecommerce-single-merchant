import ImageInputUploaderComp from 'components/public/ImageInputUploaderComp'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Static_LogoAction } from '../../redux/action/StaticAction'
import { ImageURL } from 'Fetch/Url'

const IdentityPage = () => {
    const dispatch = useDispatch()

    // submitting form
    const handleLogoSubmit = e => {
        e.preventDefault()
        dispatch(Static_LogoAction(e))
    }
  return (
    <div className='custom-dashcontainer'>
        <p className='title'>هوية المتجر</p>
        

        {/* logo  */}
        <form onSubmit={handleLogoSubmit} className='flex flex-col gap-4'>
            {/* old and new image  */}
            <div className='flex  gap-4 flex-wrap justify-center'>
                {/* old logo  */}
                <img className='w-full max-w-96 custom-border shadow' src={`${ImageURL}?type=setting&width=800`} loading='lazy'/>

                <div className='w-full max-w-96 '>
                    <ImageInputUploaderComp name={'image'}/>
                </div>

            </div>

            <button className='custom-button w-fit'>تغيير الشعار</button>
        </form>

    </div>
  )
}

export default IdentityPage