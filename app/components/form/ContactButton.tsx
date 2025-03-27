'use client'
import useLoginModal from '@/app/hooks/useLoginModal'
import apiService from '@/app/services/apiService'
import { useRouter } from 'next/navigation'
import React from 'react'


interface ContactButtonProps {
  userId: string | null,
  landlordId: string
}
const ContactButton: React.FC<ContactButtonProps> = ({userId, landlordId}) => {
  const loginModal = useLoginModal()
  const router = useRouter()
  const startConversation = async () => {
    if (userId) {
      const conversation = await apiService.authorizedGet(`/api/chat/start/${landlordId}`)
      console.log("=====conversation===== ", conversation)
      const conversationId = conversation.id
      console.log("======conversationId", conversationId)
      if (conversationId) {
        router.push((`/inbox/${conversationId}/`))
      }
    }
    else {
      loginModal.open()
    }
  }

  return (
    <>
    { (userId && userId !== landlordId) &&( 
      <div 
      onClick={startConversation}
      className='py-4 px-6 bg-enbnb hover:bg-enbnb-dark text-white rounded-xl transition cursor-pointer'>
          Contact
      </div>)}
    </>
  )
}

export default ContactButton
