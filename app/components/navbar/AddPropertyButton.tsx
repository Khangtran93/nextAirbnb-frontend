'use client'
import useAddPropertyModal from '@/app/hooks/useAddPropertyModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import React from 'react'

interface AddPropertyButtonProps {
  userId: string | null
}
const AddPropertyButton:React.FC<AddPropertyButtonProps> = ({userId}) => {
  const addPropertyModal = useAddPropertyModal()
  const loginModal = useLoginModal()

  const handleClick = () => {
    if (userId != null) {
      addPropertyModal.open()
    }
    else {
      loginModal.open()
    }
    
  }
  return (
    <div className='font-semibold text-sm cursor-pointer hover:bg-gray-200 p-2 rounded-full' onClick={handleClick}
 >
        Host your home
    </div>
  )
}

export default AddPropertyButton
