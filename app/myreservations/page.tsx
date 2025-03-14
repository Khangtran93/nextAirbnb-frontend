import Image from 'next/image'
import React from 'react'
import { getUserId } from '../lib/action'
import apiService from '../services/apiService'
import { formatDate, numberOfDays } from '../util/util'
import CustomButton from '../components/form/CustomButton'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const ReservationPage = async () => {
  const reservation = await apiService.authorizedGet('/api/properties/reservations/')
  const reservationData = reservation.data

  // console.log("reservation data img ",)
  return (
    <main className='max-w-[1500px] mx-auto px-6 pb-6'>
      <div className='my-6'>
        <h1 className='text-2xl'>My Reservations</h1>
      </div>
      <div className='space-y-4'>
        { reservationData ? 
        (reservationData.map((reservation: any, index: any) => (
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4 border border-gray-300 shadow-md p-6 rounded-xl' key={index}>
          <div className='col-span-1'>
            <div className='relative overflow-hidden aspect-square rounded-xl'>
              <Image 
                src={`${process.env.NEXT_PUBLIC_API_HOST}${reservation.property.images[0].image}`}
                alt="listing-img"
                layout="fill"
                className='hover:scale-110 object-cover h-full w-full transition'
              />
            </div>
          
          </div>
          <div className='col-span-1 md:col-span-3 md:px-6 space-y-2'>
            <h2 className='text-xl mb-4'>{reservation.property.title}</h2>
            <p><strong>Check in date:</strong> {formatDate(reservation.start_date)}</p>
            <p><strong>Check out date:</strong> {formatDate(reservation.end_date)}</p>
            <p><strong>Number of days: </strong> {numberOfDays(reservation.start_date, reservation.end_date)}</p>
            <p><strong>Total: </strong> ${reservation.total}</p>
            <Link href={`/properties/${reservation.property.id}`}>
              <div className='cursor-pointer text-white bg-enbnb hover:bg-enbnb-dark mt-4 p-4 rounded-lg inline-block'>Go To Property</div>
            </Link>
          </div>
        </div>
        ))

        ) : (
          <p>No reservations found.</p>
        )
}
      </div>

    </main>
  )
}

export default ReservationPage
