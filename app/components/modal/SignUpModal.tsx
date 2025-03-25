'use client'
import useSignUpModal from "@/app/hooks/useSignupModal"
import Modal from "./Modal"
import CustomButton from "../form/CustomButton"
import { useRouter } from "next/navigation"
import { useState, ChangeEvent } from "react"
import apiService from "@/app/services/apiService"
import { handleLogin } from "@/app/lib/action"
import Image from "next/image"

const SignUpModal = () => {
  const signupModal = useSignUpModal()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [email, setEmail] = useState<string>("")
  const [name, setName] = useState<string>("")
  // const [lastName, setLastName] = useState<string>("")
  const [avatar, setAvatar] = useState<File | null>(null)
  const [password1, setPassword1] = useState<string>("")
  const [password2, setPassword2] = useState<string>("")
  const [errors, setErrors] = useState<string[]>([])

  const submitSignup = async () => {
    const data = new FormData()
    data.append('email', email)
    data.append('password1', password1)
    data.append('password2', password2)
    data.append('name', name)
    if (avatar) {
      data.append('avatar', avatar)
    }

    const response = await apiService.post('/auth/register/', data, true)
    console.log("response ", response)
    if (response.access) {
      handleLogin(response.user.pk, response.access, response.refresh)
      signupModal.close()
      router.push('/')
    }else {
      //retrieve all the values of the returned object and add them to the tempErrors variable
      const tempErrors: string[] = Object.values(response).map((error: any) => {
        return error
      })
      setErrors(tempErrors)
    }
  }
  
   const uploadImage = (event: ChangeEvent<HTMLInputElement>) => {
     if (event.target.files && event.target.files[0]) {
       const avatar = event.target.files[0];
       setAvatar(avatar);
     }

   }
  const incrementStep = () => {
    setCurrentStep(currentStep + 1);
  }
  const decrementStep = () => {
    setCurrentStep(currentStep - 1);
  }
  const content = (
    <>
    <h2 className="mb-6 text-xl">Sign up with Enbnb</h2>
    {currentStep == 1 ? (
         <div 
         className="space-y-4">
           <input onChange={(e) => setEmail(e.target.value)} required placeholder="Enter your email address" type="email" className="w-full h-54 border border-gray-300 rounded-xl p-2"/>
           <input onChange={(e) => setPassword1(e.target.value)} required placeholder="Enter your password" type="password" className="w-full h-54 border border-gray-300 rounded-xl p-2"/>
           <input onChange={(e) => setPassword2(e.target.value)} required placeholder="Confirm your password" type="password" className="w-full h-54 border border-gray-300 rounded-xl p-2"/>
           {errors.map((error, index) => (
             <div key={index} className="p-5 bg-enbnb text-white rounded-xl opacity-80">
               Error: {error}
             </div>
           ))}
           <CustomButton
           label="Next"
           onClick={incrementStep}
            />
         </div>
         ) : (
          
         <form 

         className="space-y-4">
           <input onChange={(e) => setName(e.target.value)} placeholder="First Name" type="text" name="firstname" className="w-full h-54 border border-gray-300 rounded-xl p-2"/>
           {/* <input onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" type="text" name="lastname" className="w-full h-54 border border-gray-300 rounded-xl p-2"/> */}
           <input
            type="file"
            name="myfile"
            onChange={uploadImage}
            className='flex mb-4'
            />
            {avatar !== null &&  (
                  <div className='w-[120px] h-auto relative'>
                    <div className='w-auto h-[120px] relative'>
                      <Image
                        fill
                        alt='uploaded-image' 
                        src={URL.createObjectURL(avatar)}
                        className='object-cover w-full h-[120px] rounded-full'/>
                    </div>
                    <div className='text-center break-words'>
                      {avatar?.name}
                    </div>
                  </div>
                )}
           {errors.map((error, index) => (
             <div key={index} className="p-5 bg-enbnb text-white rounded-xl opacity-80">
               Error: {error}
             </div>
           ))}
           <CustomButton
           label="Previous"
           className='w-full bg-enbnb-black hover:bg-gray-600'
           onClick={decrementStep}
            />

          <CustomButton
           label="Sign up"
           onClick={submitSignup}
            />
         </form>

         )
    }
      
   
    </>
   
  )
  return (
    <Modal
      label="Sign Up"
      content={content}
      isOpen={signupModal.isOpen}
      close={signupModal.close}
    />
  )
}

export default SignUpModal
