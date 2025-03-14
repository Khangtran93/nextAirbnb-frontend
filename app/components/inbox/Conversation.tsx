import Link from 'next/link'
import React from 'react'
import CustomButton from '../form/CustomButton'

type UserType = {
  id: string,
  name: string,
  email: string,
}
interface ConversationProps {
  id: string
  receivers: UserType[],
}
const Conversation: React.FC<ConversationProps> = ({id, receivers}) => {
  return (
    <div className='p-6 border border-gray-300 rounded-xl space-y-2 cursor-pointer'>
        <h2 className='text-xl'>
          {receivers?.map((receiver, index) => (
            <span key={index}>
              {receiver.name}{index !== receivers.length - 1 ? ', ' : ''}
            </span>
          ) )}
        </h2>
      <Link href={`/inbox/${id}`}>
        <p className='text-enbnb hover:text-enbnb-dark'>Go to conversation</p>
      </Link>
    </div>
  )
}

export default Conversation
