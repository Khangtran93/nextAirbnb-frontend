import Image from 'next/image'
import React from 'react'

const ReservationPage = () => {
  return (
    <main className='max-w-[1500px] mx-auto px-6 pb-6'>
      <div className='my-6'>
        <h1 className='text-2xl'>My Reservation</h1>
      </div>
      <div className='space-y-4'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 border border-gray-300 shadow-md p-6 rounded-xl'>
          <div className='col-span-1'>
            <div className='relative overflow-hidden aspect-square rounded-xl'>
              <Image 
                src="/images/listing_img_mock.webp"
                alt="listing-img"
                layout="fill"
                className='hover:scale-110 object-cover h-full w-full transition'
              />
            </div>
          
          </div>
          <div className='col-span-1 md:col-span-3 md:px-6 space-y-2'>
            <h2 className='text-xl mb-4'> Property Name</h2>
            <p><strong>Check in date:</strong> 15/05/2024</p>
            <p><strong>Check out date:</strong> 17/05/2024</p>
            <p><strong>Number of days: </strong> 2</p>
            <p><strong>Total: </strong> $200</p>
            <div className='cursor-pointer text-white bg-enbnb hover:bg-enbnb-dark mt-4 p-4 rounded-lg inline-block'>Go To Property</div>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 border border-gray-300 shadow-md p-6 rounded-xl'>
          <div className='col-span-1'>
            <div className='relative overflow-hidden aspect-square rounded-xl'>
              <Image 
                src="/images/listing_img_mock.webp"
                alt="listing-img"
                layout="fill"
                className='hover:scale-110 object-cover h-full w-full transition'
              />
            </div>
          
          </div>
          <div className='col-span-1 md:col-span-3 md:px-6 space-y-2'>
            <h2 className='text-xl mb-4'> Property Name</h2>
            <p><strong>Check in date:</strong> 15/05/2024</p>
            <p><strong>Check out date:</strong> 17/05/2024</p>
            <p><strong>Number of days: </strong> 2</p>
            <p><strong>Total: </strong> $200</p>
            <div className='cursor-pointer text-white bg-enbnb hover:bg-enbnb-dark mt-4 p-4 rounded-lg inline-block'>Go To Property</div>
          </div>
        </div>
      </div>

    </main>
  )
}

export default ReservationPage
