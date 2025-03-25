'use client'
import React, { useLayoutEffect } from 'react'
import CustomButton from '../form/CustomButton'
import { getUserId } from '@/app/lib/action'
import { UserType } from '@/app/inbox/[id]/page'
import useWebSocket, {ReadyState} from 'react-use-websocket'
import { useEffect, useRef, useState } from 'react'
import { loadGetInitialProps } from 'next/dist/shared/lib/utils'

type Message = {
  id: string,
  body: string,
  sender: UserType,
  receiver?: UserType,
  conversationId: string
}

type ConversationType = {
  id: string,
  users: UserType[],
  messages: Message[]
}

interface ConversationDetailProps {
  userId: string | null,
  token: string | null,
  conversation: ConversationType
}
const ConversationDetail: React.FC<ConversationDetailProps> = ({
  conversation,
  userId,
  token,

}) => {
  const myUser = conversation.users.find((user) => user.id === userId)
  const otherUser = conversation.users.find((user) => user.id !== userId)
  const messageDiv = useRef(null)
  const [newMessage, setNewMessage] = useState<string>("")
  const [realTimeMessage, setRealTimeMessage] = useState<Message[]>(conversation.messages)
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(`ws://localhost:8000/ws/${conversation.id}/?token=${token}`, {
    share: false,
    shouldReconnect: () => true
  })
  const sendMessage = async () => {
     const messageData = {
      event: "chat_message",
      data: {
        body: newMessage,
        sender: myUser,
        receiver: otherUser,
        conversation_id: conversation.id
      }
    }

    sendJsonMessage(messageData)
  }

  const handleKeyDown = (e:any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  const ScrollToBottom = (behavior: string) => {
    console.log("behavior:", behavior)
    messageDiv.current?.scroll({ 
      top: messageDiv.current?.scrollHeight, 
      behavior: behavior });
  }

  useEffect(() => {
    ScrollToBottom('auto');
  }, [realTimeMessage]);

  useEffect(() => {
    ScrollToBottom('smooth')
  },[])

  useEffect(() => {
    if (lastJsonMessage && typeof  lastJsonMessage == 'object' && 'name' in lastJsonMessage && 'body' in lastJsonMessage) {
      const message: Message = {
        id: "",
        body: lastJsonMessage.body as string,
        sender: lastJsonMessage.sender_id === myUser?.id ? myUser as UserType : otherUser as UserType,
        conversationId: conversation.id as string,
      }

      setRealTimeMessage((realTimeMessage) => [...realTimeMessage, message])
      setNewMessage('')
    }
  },[lastJsonMessage])

  return (
    <div 
    className='max-h-[600px] rounded-xl flex flex-col space-y-4 border-2 border-gray-100 mb-20 '>  
      <div className='py-4 text-center bg-gray-200 rounded-xl font-bold sticky top-0 w-full rounded-b-none'>
        {otherUser?.name}
      </div>
      <div ref={messageDiv} 
          className="overflow-y-scroll scrollbar scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 mb-0 px-4"
        >
        {realTimeMessage.map((message: Message, index: number) => 
        (
          <div key={index}>
          {message.sender.id === myUser?.id ? (
            <div className='w-[60%] ml-auto rounded-xl my-2 bg-blue-200 px-6 py-4 max-w-max'>
              <p className='font-bold'>{myUser.name}</p>
              <p>{message.body}</p>
            </div>) : (
            <div className='w-[60%] text-left mr-auto my-2 rounded-xl bg-gray-200 px-6 py-4 max-w-max'>
              <p className='font-bold'>{otherUser?.name}</p>
              <p>{message.body}</p>
            </div>
          )}
          </div>))}
      </div>
      <div className='mt-4 p-4 border border-gray-300 rounded-xl flex space-x-4 bg-white sticky bottom-0'>
        <input 
          type="text"
          value={newMessage}
          placeholder='Type your message...'
          className='bg-gray-200 rounded-xl p-4 w-full'
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        ></input>
        <CustomButton
          onClick={sendMessage}
          label="Send"
        />
      </div>
    </div>
  )
}

export default ConversationDetail
