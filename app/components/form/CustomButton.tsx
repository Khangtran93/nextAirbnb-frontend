import React from 'react'
interface CustomButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({label, onClick, className}) => {
  return (
    <div 
    onClick={onClick}
    className={`py-4 px-6 bg-enbnb hover:bg-enbnb-dark text-white rounded-xl transition cursor-pointer ${className} `}>
      {label}
    </div>
  )
}

export default CustomButton
