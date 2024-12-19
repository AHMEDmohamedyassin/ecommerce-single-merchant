import ImageWithLoaderComp from 'components/public/ImageWithLoaderComp'
import { ImageURL } from 'Fetch/Url'
import React from 'react'
import { Link } from 'react-router-dom'

const CategoryCardComp = ({data}) => {
  return (
    <Link to={`/search?categories=${data.id}`} className='flex flex-col gap-1 items-center lg:w-24 w-20'>
        <ImageWithLoaderComp imageClass={'aspect-square lg:w-20 w-16 rounded-full '} src={`${ImageURL}type=category&width=100&id=${data.id}`}/>
        <p className='w-full overflow-hidden line-clamp-1 text-center text-xs'>{data.title} </p>
    </Link>
  )
}

export default CategoryCardComp