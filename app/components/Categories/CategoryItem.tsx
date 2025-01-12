import Image from 'next/image'
import React, { useEffect } from 'react'

interface CategoryItemProps {
  label: string,
  img: string,
  category: string,
  setCategory: (category:string) => void
}
const CategoryItem: React.FC<CategoryItemProps> = ({label, img, category, setCategory}) => {
  useEffect(() => {
    console.log("category", category, "label", label)
  },[category])
  return (
    <div onClick={() => setCategory(label)}
    className={`flex flex-col items-center py-3 opacity-60 hover:opacity-100 border-b-2 border-white ${category === label ? 'border-gray-500 opacity-100' : 'border-white'} hover:border-gray-500 space-y-2`}>
      <Image className='' src={img} alt="tower-category" width={20} height={20}/>
      <span className='text-xs'>{label}</span>
    </div>
  )
}

export default CategoryItem
