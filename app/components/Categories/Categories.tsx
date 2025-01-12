'use client'
import Image from 'next/image'
import React from 'react'
import CategoryItem from './CategoryItem'

interface CategoriesProps {
  category: string,
  setCategory: (category:string) => void
}
const Categories:React.FC<CategoriesProps> = ({category, setCategory}) => {
  return (
    <div className='cursor-pointer flex items-center space-x-8 mb-6'>
      {/* <CategoryItem label="Towers" img="/images/icon_cate_tower.jpg" category={category} setCategory={setCategory}/>
      <CategoryItem label="Golfing" img="/images/icon_cate_golfing.jpg" category={category} setCategory={setCategory}/>
      <CategoryItem label="Windmills" img="/images/icon_cate_windmill.jpg" category={category} setCategory={setCategory}/>
      <CategoryItem label="Riads" img="/images/icon_cate_riad.jpg" category={category} setCategory={setCategory}/> */}

      <div 
      onClick={() => setCategory("Towers")}
      className={`flex flex-col items-center py-3 opacity-60 hover:opacity-100 border-b-2 border-white hover:border-gray-500 space-y-2 ${category == "Towers" ? 'border-gray-600 opacity-90' : 'border-white'} `}>
        <Image className='' src="/images/icon_cate_tower.jpg" alt="tower-category" width={20} height={20}/>
        <span className='text-xs'>Towers</span>
      </div>

      <div 
      onClick={() => setCategory("Golfing")}
      className={`flex flex-col items-center py-3 opacity-60 hover:opacity-100 border-b-2 border-white hover:border-gray-500 space-y-2 ${category == "Golfing" ? 'border-gray-600 opacity-90' : 'border-white'}`}>
        <Image className='opacity-60' src="/images/icon_cate_golfing.jpg" alt="tower-category" width={20} height={20}/>
        <span className='text-xs'>Golfing</span>
      </div>

      <div 
      onClick={() => setCategory("Windmills")}
      className={`flex flex-col items-center py-3 opacity-60 hover:opacity-100 border-b-2 border-white hover:border-gray-500 space-y-2 ${category == "Windmills" ? 'border-gray-600 opacity-90' : 'border-white'}`}>
        <Image className='opacity-60' src="/images/icon_cate_windmill.jpg" alt="tower-category" width={20} height={20}/>
        <span className='text-xs'>Windmills</span>
      </div>

      <div 
      onClick={() => setCategory("Riads")}
      className={`flex flex-col items-center py-3 opacity-60 hover:opacity-100 border-b-2 border-white hover:border-gray-500 space-y-2 ${category == "Riads" ? 'border-gray-600 opacity-90' : 'border-white'}`}>
        <Image className='opacity-60' src="/images/icon_cate_riad.jpg" alt="tower-category" width={20} height={20}/>
        <span className='text-xs'>Riads</span>
      </div>
    </div>
  )
}

export default Categories
