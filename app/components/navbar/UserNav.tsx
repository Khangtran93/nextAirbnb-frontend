'use client'
import {useState} from 'react'
import MenuLink from './MenuLink'
import useLoginModal from '@/app/hooks/useLoginModal'
import useSignUpModal from '@/app/hooks/useSignupModal'
import LogoutButton from '../LogoutButton'
import AddPropertyButton from './AddPropertyButton'
import useAddPropertyModal from '@/app/hooks/useAddPropertyModal'
import { useRouter } from 'next/navigation'

interface userNavProps {
  userId?: string | null
}

const UserNav: React.FC<userNavProps> = ({userId}) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const loginModal = useLoginModal()
  const signupModal = useSignUpModal()

  return (
    <div className='flex items-center space-x-2'>
      <AddPropertyButton userId={userId}/>

      {/* language */}
      <div className='hover:bg-gray-200 p-2 rounded-full'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', height: '16px', width: '16px', fill: 'currentcolor'}}>
        <path d="M8 .25a7.77 7.77 0 0 1 7.75 7.78 7.75 7.75 0 0 1-7.52 7.72h-.25A7.75 7.75 0 0 1 .25 8.24v-.25A7.75 7.75 0 0 1 8 .25zm1.95 8.5h-3.9c.15 2.9 1.17 5.34 1.88 5.5H8c.68 0 1.72-2.37 1.93-5.23zm4.26 0h-2.76c-.09 1.96-.53 3.78-1.18 5.08A6.26 6.26 0 0 0 14.17 9zm-9.67 0H1.8a6.26 6.26 0 0 0 3.94 5.08 12.59 12.59 0 0 1-1.16-4.7l-.03-.38zm1.2-6.58-.12.05a6.26 6.26 0 0 0-3.83 5.03h2.75c.09-1.83.48-3.54 1.06-4.81zm2.25-.42c-.7 0-1.78 2.51-1.94 5.5h3.9c-.15-2.9-1.18-5.34-1.89-5.5h-.07zm2.28.43.03.05a12.95 12.95 0 0 1 1.15 5.02h2.75a6.28 6.28 0 0 0-3.93-5.07z"></path>
        </svg>
      </div>

      {/* user nav */}
      <div className='p-2 relative cursor-pointer border-2 hover:shadow-lg rounded-full space-x-2 items-center'>
        <button onClick={() => setIsOpen(!isOpen)} className='flex items-center px-2 space-x-2'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>

          <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
        </button>
        {isOpen && (
          <div className='absolute w-[220px] mt-4 right-0 bg-white border rounded-lg py-4 shadow-lg'>
            <div className='border-b-2 pb-4 space-y-4'>
              {userId ? 
              <>
                 <MenuLink
                  label='Profile'
                  onClick={() => router.push(`/landlords/${userId}`)}
                />

                <MenuLink 
                label='My Properties'
                onClick={() => {
                  setIsOpen(!isOpen)
                  router.push('/myproperties/')}
                }
                />

                <MenuLink 
                label='My Reservations'
                onClick={() => {
                  setIsOpen(!isOpen)
                  router.push('/myreservations/')}
                }
                
                />

                <LogoutButton navOpen={isOpen} setNavOpen={setIsOpen}/> 
              </>

: 
              (<>
                <MenuLink
                  label='Sign up'
                  onClick={() => {
                  signupModal.open()
                  setIsOpen(false)
              }}
              />
              <MenuLink
                  label='Log in'
                  onClick={() => {
                  console.log("opening modal")
                  loginModal.open()
                  setIsOpen(false)
              }}
              />
              </>)}
          
           
            </div>
            
            <div className='space-y-4 pt-4'>
              <MenuLink
              label='Gift cards'
              onClick={() => console.log("Gift cards")}
              />
               <MenuLink
              label='Enbnb your home'
              onClick={() => console.log("Enbnb your home")}
              />
               <MenuLink
              label='Help centre'
              onClick={() => console.log("Help centre")}
              />
            </div>

          </div>
        )
        }
      </div>
    </div>
  )
}

export default UserNav
