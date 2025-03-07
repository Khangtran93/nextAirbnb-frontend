'use client'
import apiService from '@/app/services/apiService'
import React, { useState } from 'react'
import useLoginModal from '@/app/hooks/useLoginModal'
import { useRouter } from 'next/navigation'

interface FavoriteButtonProps {
  userId?: string | null,
  propertyId: string
  favorite: boolean,
}
const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  userId,
  propertyId,
  favorite,
}) => {
  const loginModal = useLoginModal()
  const [isFavorite, setIsFavorite] = useState(favorite)
  const router = useRouter()
  const toggleFavorite = async () => {
    if (userId) {
      const response = await apiService.authorizedPost(`/auth/user/favorite/${propertyId}/`, {})
      setIsFavorite(!isFavorite)
      router.refresh()
      console.log("response ", response)
    }
    else {
      loginModal.open()
    }
    
  }
  return (
    <div onClick={() => toggleFavorite()} className='cursor-pointer'>
       <span className='flex gap-2 items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" className="size-6" 
              stroke={isFavorite ? "none" : "currentColor" }
              fill={isFavorite ? "red" : "none"}
              >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
            Save
          </span>
    </div>
  )
}

export default FavoriteButton
