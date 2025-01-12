'use client'
import { useRouter } from "next/navigation"
import { resetAuthCookies } from '../lib/action'
import MenuLink from "./navbar/MenuLink"

interface LogoutProp {
  navOpen: boolean
  setNavOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const LogoutButton: React.FC<LogoutProp> = ({navOpen, setNavOpen}) => {
  const router = useRouter()

  const submitLogout = () => {
    resetAuthCookies()
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
