import React from 'react'

const CardComp = () => {
  return (
    <div className='bg-secondarybg rounded shadow'>

        {/* main image */}
        <section>
            <img className='custom-img-cover' loading='lazy' src='https://cdn.shopify.com/s/files/1/0760/7992/3480/files/183607.jpg?v=1709993246&width=400' />
        </section>

        {/* details and available images */}
        <section className='p-4'>

            {/* pricing and details */}
            <div className='flex gap-y-4 flex-col'>
                <div>
                    <p className='text-xs text-gray mb-1'>دايس</p>
                    <p className='line-clamp-2 text-sm font-semibold'>فانلة كم ليكرا رجالي استرتش DM182A/W14 - دايس فانلة كم ليكرا رجالي استرتش DM182A/W14 - دايس</p>
                </div>
                <div className='text-maincolor text-lg font-bold'>135 جم</div>
            </div>

            {/* available images */}
            <div className='flex items-center gap-3 mt-1'>
                <img className='rounded-full custom-border shadow-sm aspect-square lg:w-8 sm:w-6 w-4 hover:cursor-pointer' loading='lazy' src='https://cdn.shopify.com/s/files/1/0760/7992/3480/files/183607.jpg?v=1709993246&width=50'/>
                <img className='rounded-full custom-border shadow-sm aspect-square lg:w-8 sm:w-6 w-4 hover:cursor-pointer' loading='lazy' src='https://cdn.shopify.com/s/files/1/0760/7992/3480/files/74599.jpg?v=1717108142&width=50'/>
                <img className='rounded-full custom-border shadow-sm aspect-square lg:w-8 sm:w-6 w-4 hover:cursor-pointer' loading='lazy' src='https://cdn.shopify.com/s/files/1/0760/7992/3480/files/6221198244234.jpg?v=1720946714&width=50'/>
                <img className='rounded-full custom-border shadow-sm aspect-square lg:w-8 sm:w-6 w-4 hover:cursor-pointer' loading='lazy' src='https://cdn.shopify.com/s/files/1/0760/7992/3480/files/6221198251140.jpg?v=1709212900&width=50'/>
                <img className='rounded-full custom-border shadow-sm aspect-square lg:w-8 sm:w-6 w-4 hover:cursor-pointer' loading='lazy' src='https://cdn.shopify.com/s/files/1/0760/7992/3480/files/6221198244234.jpg?v=1720946714&width=50'/>
            </div>

        </section>

    </div>
  )
}

export default CardComp