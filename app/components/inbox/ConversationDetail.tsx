'use client'
import React from 'react'
import CustomButton from '../form/CustomButton'
import { getUserId } from '@/app/lib/action'

type UserType = {
  id: string,
  name: string,
  email: string,
}
type Message = {
  body: string,
  sender: UserType,
  receiver: UserType
}
interface ConversationDetailProps {
  userId: string | null
  messages: Message[]
}
const ConversationDetail: React.FC<ConversationDetailProps> = ({messages, userId}) => {
  console.log("messages received: ", messages)
  return (
    <div className='h-[400px] flex flex-col space-y-4'>
      {messages.map((message: Message, index: number) => 
      (
        <React.Fragment key={index}>
         {message.sender.id === userId ? (
          <div className='w-[80%] rounded-xl bg-gray-200 px-6 py-4'>
          <p className='font-bold'>{message.sender.name}</p>
          <p>{message.body}</p>
        </div>) : (
         <div className='ml-[20%] textalign-right rounded-xl bg-blue-200 px-6 py-4 text-right'>
         <p className='font-bold'>{message.sender.name}</p>
         <p>{message.body}</p>
       </div>
         )}
         </React.Fragment>))}
  
     

      <div className='mt-4 p-4 border border-gray-300 rounded-xl flex space-x-4'>
        <input 
          type="text"
          placeholder='Type your message...'
          className='bg-gray-200 rounded-xl p-4 w-full'
        ></input>
        <CustomButton
          onClick={() => console.log("Clicked")}
          label="Send"
        />
      </div>
      </div>
  )
}

export default ConversationDetail
