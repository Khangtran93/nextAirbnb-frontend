import ContactButton from '@/app/components/form/ContactButton'
import CustomButton from '@/app/components/form/CustomButton'
import Properties from '@/app/components/properties/PropertyList'
import { getUserId } from '@/app/lib/action'
import apiService from '@/app/services/apiService'
import Image from 'next/image'
import React, { useEffect } from 'react'

const LandlordDetailPage = async ({params}: {params: {id: string}}) => {
  const landlord = await apiService.get(`/auth/${params.id}/`)
  const userId = await getUserId()
  console.log('landlord detail is', landlord.data.avatar)
  return (
  <main className='max-w-[1500px] mt-6 mx-auto px-6 pb-6'>
    <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
      <aside className='col-span-1'>
        <div className='flex flex-col items-center border-2 border-gray-200 rounded-xl shadow-xl py-6'>
          <Image src={landlord.data.avatar ? landlord.data.avatar : "/images/host_profile_mock.jpg" } alt="mock-profile" width={150} height={150} className='rounded-full mb-4'/>
          <h1 className='text-2xl mb-4'>{landlord.data.name}</h1>
            <ContactButton
              userId={userId}
              landlordId={params.id}
            /> 
        </div>
      </aside>
      <div className='col-span-1 md:col-span-3 border border-gray-200 px-4 py-4 rounded-xl shadow-xl'>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Properties
          host_id={landlord.data.id}
        />
      </div>
      </div>
    </div>
  
  </main>
  )
}

export default LandlordDetailPage
