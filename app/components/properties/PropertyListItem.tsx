import { PropertyType } from '@/app/type/type'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

interface PropertyProps {
  property: PropertyType
}

const PropertyListItem : React.FC<PropertyProps> = (
  { property }
) => {
  const router = useRouter()
  useEffect(() => {
    console.log("url", property.images[0].image)
  }, [property])
  return (
    <div className='cursor-pointer' onClick={() => router.push(`/properties/${property.id}`)}>
      <div className=' relative overflow-hidden aspect-square rounded-xl'>
        <Image 
          fill 
          src={`${process.env.NEXT_PUBLIC_API_HOST}${property.images[0]?.image}`}
          alt="property-image"
          // sizes="(max-width:768px) 768px, (max-width:1200px) 768px"
          className='hover:scale-110 transition object-cover'
          // unoptimized
        />
      </div>
      <div className='mt-2'>
        <p className='text-lg font-semibold'>{property.title}</p>
      </div>

      <div className='mt-2'>
        <p>${property.price_per_night}</p>
      </div>

    </div>
  )
}

export default PropertyListItem
