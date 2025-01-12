import React from 'react'

const SearchFilter = () => {
  return (
    <div className='h-[64px] flex flex-row justify-between items-center rounded-full border-2 shadow-lg'>
        <div className='flex flex-row items-center justify-between'>
          <div className='hidden md:flex cursor-pointer w-[250px] h-[64px] px-4 lg:px-8 flex flex-col justify-center hover:bg-gray-200 rounded-full'>
            <p className='text-xs font-semibold'>Where</p>
            <p className='text-sm'>Search destinations</p>
          </div>

          <div className='hidden md:flex cursor-pointer h-[64px] px-4 lg:px-8 flex flex-col justify-center hover:bg-gray-200 rounded-full'>
            <p className='text-xs font-semibold'>Check in</p>
            <p className='text-sm'>Add dates</p>
          </div>

          <div className='hidden md:flex cursor-pointer h-[64px] px-4 lg:px-8 flex flex-col justify-center hover:bg-gray-200 rounded-full'>
            <p className='text-xs font-semibold'>Check out</p>
            <p className='text-sm'>Add dates</p>
          </div>

          <div className='flex flex-row  h-[64px] hover:bg-gray-200 rounded-full'>
            <div className='hidden md:flex cursor-pointer px-4 lg:px-8 flex flex-col justify-center hover:bg-gray-200 rounded-full'>
              <p className='text-xs font-semibold'>Who</p>
              <p className='text-sm'>Add guests</p>
            </div>

            <div className='p-2'>
              <div className='cursor-pointer p-4 bg-enbnb rounded-full hover:bg-enbnb-dark transition'>
                <svg  viewBox="0 0 32 32" 
                  style={{display: 'block', fill: 'none', height: '16px' ,width: '16px', stroke: 'currentColor', strokeWidth: 4, overflow: 'visible', color: 'white'}} 
                  aria-hidden="true" role="presentation" focusable="false">
                  <path fill="none" d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"></path>
                </svg>
              </div> 
            </div>
          </div>
        </div>

     
    </div>
  )
}

export default SearchFilter
