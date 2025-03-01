import Properties from '@/app/components/properties/PropertyList'
import { getUserId } from '@/app/lib/action'
import React from 'react'

const MyProperty = async () => {
  const userId = await getUserId()
  return (
    <main className='max-w-[1500px] mx-auto px-6 pb-6'>
      <h1 className='text-2xl my-6'>My Properties</h1>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-6">
        <Properties
          host_id={userId}
        />
      </div>
    </main>
  )
}

export default MyProperty
