import React from 'react'
import Conversation from '../components/inbox/Conversation'

const InboxPage = () => {
  return (
    <main className='max-w-[1500px] px-6 pb-6 mx-auto space-y-4'>
      <h1 className='text-2xl'>Inbox</h1>
      <div className='space-y-4'>
        <Conversation/>
        <Conversation/>
        <Conversation/>
      </div>
    </main>
  )
}

export default InboxPage
