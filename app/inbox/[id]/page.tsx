import ConversationDetail from '@/app/components/inbox/ConversationDetail'
import { getUserId } from '@/app/lib/action'
import apiService from '@/app/services/apiService'
import React from 'react'

const ConversationPage = async ({params}: {params: {id: string}}) => {
  const userId = await getUserId()
  const messages = await apiService.authorizedGet(`/api/chat/${params.id}/`)
  const messagesData = messages.message
  console.log("===messages====",messagesData)
  return (
    <main className='max-w-[1500px] mx-auto px-6 pb-6'>
      <ConversationDetail userId={userId} messages={messagesData}/>
    </main>
  )
}

export default ConversationPage
