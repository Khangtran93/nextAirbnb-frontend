'use client'
import { useRouter } from "next/navigation"
import { resetAuthCookies } from '../lib/action'
import MenuLink from "./navbar/MenuLink"
import { useAuthStore } from "../state/store"

interface LogoutProp {
  navOpen: boolean
  setNavOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const LogoutButton: React.FC<LogoutProp> = ({navOpen, setNavOpen}) => {
  const router = useRouter()

  const submitLogout = () => {
    resetAuthCookies()
    useAuthStore.getState().setUserId('')
    setNavOpen(!navOpen)
    router.push('/')
  }
  return (
    <MenuLink
      label="Log out"
      onClick={submitLogout}
    />
  )
}

export default LogoutButton
