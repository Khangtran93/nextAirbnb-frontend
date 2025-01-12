import React from 'react'

interface MenuLinkProps {
  label: string,
  onClick: () => void
}
const MenuLink: React.FC<MenuLinkProps> = ({label, onClick}) => {
  return (
    <div 
    onClick={onClick}
    className='text-sm hover:font-semibold px-4'>
      {label}
    </div>
  )
}

export default MenuLink
