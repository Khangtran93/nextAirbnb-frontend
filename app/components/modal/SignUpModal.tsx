'use client'
import useSignUpModal from "@/app/hooks/useSignupModal"
import Modal from "./Modal"
import CustomButton from "../form/CustomButton"
import { useRouter } from "next/navigation"
import { useState } from "react"
import apiService from "@/app/services/apiService"
import { handleLogin } from "@/app/lib/action"

const SignUpModal = () => {
  const signupModal = useSignUpModal()
  const router = useRouter()
  const [email, setEmail] = useState<string>("")
  const [password1, setPassword1] = useState<string>("")
  const [password2, setPassword2] = useState<string>("")
  const [errors, setErrors] = useState<string[]>([])

  const submitSignup = async () => {
    const data = {
      email: email,
      password1: password1,
      password2: password2,
    }

    const response = await apiService.post('/auth/register/', data)
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
  const content = (
    <>
      <h2 className="mb-6 text-xl">Sign up with Enbnb</h2>
      <form 
      action={submitSignup}
      className="space-y-4">
        <input onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" type="email" className="w-full h-54 border border-gray-300 rounded-xl p-2"/>
        <input onChange={(e) => setPassword1(e.target.value)} placeholder="Enter your password" type="password" className="w-full h-54 border border-gray-300 rounded-xl p-2"/>
        <input onChange={(e) => setPassword2(e.target.value)} placeholder="Confirm your password" type="password" className="w-full h-54 border border-gray-300 rounded-xl p-2"/>
        {errors.map((error, index) => (
          <div key={index} className="p-5 bg-enbnb text-white rounded-xl opacity-80">
            Error: {error}
          </div>
        ))}
        <CustomButton
        label="Sign up"
        onClick={submitSignup}
         />
      </form>
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
