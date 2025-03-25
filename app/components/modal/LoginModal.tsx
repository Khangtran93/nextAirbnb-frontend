'use client'
import CustomButton from "../form/CustomButton"
import Modal from "./Modal"
import useLoginModal from "@/app/hooks/useLoginModal"
import { handleLogin } from "@/app/lib/action"
import { useRouter } from "next/navigation"
import { useState } from "react"
import apiService from "@/app/services/apiService"
import { useAuthStore } from "@/app/state/store"

const LoginModal = () => {
  const loginModal = useLoginModal()
  const router = useRouter()
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [errors, setErrors] = useState<string[]>([])

  const submitLogin = async () => {

  const data = {
    email: email,
    password: password
  }
    const response = await apiService.post('/auth/login/', data)
    if (response && response.access) {
      handleLogin(response.user.pk, response.access, response.refresh)
      useAuthStore.getState().setUserId(response.user.pk)
      loginModal.close()
      router.refresh()
      // router.push('/')
    }
    else {
      setErrors(response.non_field_errors)
    }
  }


  const content = (
    <>
      <h2 className="mb-6 text-xl">Welcome to Enbnb</h2>
      <form action={submitLogin} className="space-y-4">
        <input onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" type="email" className="w-full h-54 border border-gray-300 rounded-xl p-2"/>
        <input onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" type="password" className="w-full h-54 border border-gray-300 rounded-xl p-2"/>
        {errors && errors.map((error, index) => (
          <div key={index} className="p-5 bg-enbnb text-white rounded-xl opacity-80">
            {error}
          </div>
        ))}
        <CustomButton
        label="Log in"
        onClick={submitLogin}
         />
      </form>
    </>
  )
  return (
    <Modal
      label="Log In"
      content={content}
      isOpen={loginModal.isOpen}
      close={loginModal.close}
    />
  )
}

export default LoginModal
