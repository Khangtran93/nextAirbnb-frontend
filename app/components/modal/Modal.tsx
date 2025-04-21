'use client'
import {useCallback, useEffect, useState} from 'react'

interface ModalProps {
  label: string,
  content: React.ReactElement,
  close: () => void,
  isOpen: boolean
}

const Modal: React.FC<ModalProps> = ({label, content, isOpen, close}) => {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    setShowModal(isOpen)
  }, [isOpen])

  const handleClose = useCallback(() => {
    setShowModal(false)

    setTimeout(() => {
      close();
    }, 300)
  },[close]) 
  return (
    <>
      {showModal && 
      <div className='flex items-center justify-center inset-0 fixed z-50 bg-black/60 border border-blue-200'>
        <div className="relative w-[90%] md:w-[80%] lg:w-[700px] my-6 h-auto text-center">
          <div className={`translate duration-600 h-full`}>
            <div className="w-full h-auto rounded-xl flex flex-col bg-white">
              <header className="flex items-center justify-center p-6 relative border-b rounded-xl ">
                <div onClick={() => handleClose()} className="p-3 absolute left-3 hover:bg-gray-200 rounded-full">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </div>
                <h2 className="text-xl">{label}</h2>
              </header>

              <section className="p-6">
                  {content}
              </section>
            </div>
          </div>
        </div>
      </div>}
    </>
  )
}

export default Modal
