import React from 'react'
import Conversation from '../components/inbox/Conversation'
import apiService from '../services/apiService'

const InboxPage = async () => {
  const conversation = await apiService.authorizedGet('/api/chat/')
  const conversationData = conversation.data
  console.log("conversationData: ", conversationData)
  return (
    <main className='max-w-[1500px] px-6 pb-6 mx-auto space-y-4'>
      <h1 className='text-2xl'>Inbox</h1>
      <div className='space-y-4'>
        {conversationData.length > 0 ? conversationData.map((conversation:any, index:any) => (
          <Conversation key={index} id={conversation.id} receivers={conversation.receivers}/>
        )) : (
          <p>No conversations found.</p>
        )}
        
      </div>
    </main>
  )
}

export default InboxPage
