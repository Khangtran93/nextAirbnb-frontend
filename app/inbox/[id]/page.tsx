import ConversationDetail from '@/app/components/inbox/ConversationDetail'
import { getAccessToken, getUserId } from '@/app/lib/action'
import apiService from '@/app/services/apiService'
import React from 'react'

export type UserType = {
  id: string,
  name: string,
  email: string,
  avatar: string
}
export type MessageType = {
  id: string,
  name: string,
  body: string,
  conversationId: string,
  sent_to: UserType,
  created_by: UserType,
}
const ConversationPage = async ({params}: {params: {id: string}}) => {
  const userId = await getUserId()
  const accessToken = await getAccessToken()
  if (!userId) {
    return (
      <main className='max-w-[1500px] max-auto px-6 py-12'>
        <p>You need to be authenticated.</p>
      </main>
    )
  }
  const conversation = await apiService.authorizedGet(`/api/chat/${params.id}/`)
  console.log("conversation", conversation)
  const conversationData = conversation.data

  return (
    <main className='max-w-[1500px] mx-auto px-6 pb-6'>
      <ConversationDetail userId={userId} token={accessToken} conversation={conversationData}/>
    </main>
  )
}

export default ConversationPage
