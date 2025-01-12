'use client'
import React from 'react'
import CustomButton from '../form/CustomButton'

const ConversationDetail = () => {
  return (
    <div className='h-[400px] flex flex-col space-y-4'>
      <div className='w-[80%] rounded-xl bg-gray-200 px-6 py-4'>
        <p className='font-bold'>Sender</p>
        <p>Hello receiver </p>
      </div>

      <div className='ml-[20%] textalign-right rounded-xl bg-blue-200 px-6 py-4 text-right'>
        <p className='font-bold'>Receiver</p>
        <p>Hello sender </p>
      </div>

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
