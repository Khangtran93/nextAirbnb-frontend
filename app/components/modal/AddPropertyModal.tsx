'use client'
import Modal from './Modal'
import useAddPropertyModal from '@/app/hooks/useAddPropertyModal'
import React, { ChangeEvent, useEffect, useState } from 'react'
import CustomButton from '../form/CustomButton'
// import CategoryItem from '../Categories/CategoryItem'
import Categories from '../Categories/Categories'
import SelectCountry, { SelectCountryValue } from '../form/SelectCountry'
import Image from 'next/image'
import apiService from '@/app/services/apiService'
import { useRouter } from 'next/navigation'

const AddPropertyModal = () => {
  const router = useRouter()
  const addPropertyModal = useAddPropertyModal()
  const [currentStep, setCurrentStep] = useState(1)
  const [errors, setErrors] = useState<string[]>([])
  const [propertyCategory, setPropertyCategory] = useState<string>('')
  const [propertyTitle, setPropertyTitle] = useState<string>('')
  const [propertyDesc, setPropertyDesc] = useState<string>('')
  const [propertyPrice, setPropertyPrice] = useState<string>('')
  const [propertyBedroom, setPropertyBedroom] = useState<string>('')
  const [propertyBathroom, setPropertyBathroom] = useState<string>('')
  const [propertyGuest, setPropertyGuest] = useState<string>('')
  const [propertyCountry, setPropertyCountry] = useState<SelectCountryValue | undefined>()
  const [propertyImage, setPropertyImage] = useState<File | undefined>()

  const incrementStep = () => {
    setCurrentStep(currentStep + 1)
  }

  const decrementStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const setCategory = (category:string) => {
    setPropertyCategory(category)
  }

  const setImage = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("file", event.target.files)
    if (event.target.files && event.target.files.length > 0) {
      const tmpImage = event.target.files[0]
      setPropertyImage(tmpImage)
    }
  }

  const submitForm = async () => {
    console.log('submit')
    
    if (
      propertyCategory &&
      propertyTitle && 
      propertyDesc && 
      propertyPrice && 
      propertyBedroom && 
      propertyBathroom && 
      propertyGuest && 
      propertyCountry &&
      propertyImage
    ) {

      // console.log(propertyBathroom, propertyCategory, propertyTitle, propertyBedroom, propertyGuest, propertyCountry, propertyImage)
    
      // const data = {
      //   title: propertyTitle,
      //   category: propertyCategory,
      //   description: propertyDesc,
      //   price_per_night: propertyPrice,
      //   bedrooms: propertyBedroom,
      //   bathrooms: propertyBathroom,
      //   guests: propertyGuest,
      //   country: propertyCountry.value,
      //   country_code: propertyCountry.label,
      //   image: propertyImage,
      // }
      
        const data = new FormData()
        data.append('title', propertyTitle) 
        data.append('category', propertyCategory)
        data.append('description', propertyDesc)
        data.append('price_per_night', propertyPrice)
        data.append('bedrooms', propertyBedroom)
        data.append('bathrooms', propertyBathroom)
        data.append('guests', propertyGuest)
        data.append('country', propertyCountry.value)
        data.append('country_code', propertyCountry.label)
        data.append('image', propertyImage)

      // console.log("=============data===========", data)
      
      const response = await apiService.authorizedPost('/api/properties/create/', data)

      if (response.success) {
        addPropertyModal.close()
        router.push('/')
      }

      const tmpErrors: string[] = Object.values(response.errors).map((error:any) => {
        return error
      })
      setErrors(tmpErrors)
      addPropertyModal.close()
      router.push('/')
    }

    
  }

  useEffect(() => {
    console.log(propertyCategory)
    console.log(propertyCountry)

  }, [propertyCategory, propertyCountry])

  const content = (
    <>
    {currentStep == 1 ? 
    <>
      <h2 className="mb-6 text-xl text-left">Choose a Category</h2>
      <Categories category={propertyCategory} setCategory={setCategory}/>
      <CustomButton label="Next" onClick={incrementStep}/>
    </> : currentStep == 2 ? 
    <>
      <div>
      <h3 className="mb-2 text-left">Title</h3>
      <input 
        type="text"
        value={propertyTitle}
        onChange={(e) => setPropertyTitle(e.target.value)}
        className='border p-2 border-gray-400 rounded-xl w-full'/>

      <h3 className="mb-2 mt-2 text-left">Describe your place</h3>
      <textarea  
        value={propertyDesc}
        onChange={(e) => setPropertyDesc(e.target.value)}
        className='border border-gray-400 p-2 rounded-xl h-[200px] w-full'/>
      </div>
      <div className=' mt-4 space-y-4'>
        <CustomButton label="Previous" className='w-full bg-enbnb-black hover:bg-gray-600' onClick={decrementStep}/>
        <CustomButton label="Next" className='w-full' onClick={incrementStep}/>
      </div>

    </> : currentStep == 3 ?
    <>
     <div className='mb-6'>
      <h3 className="mb-2 text-left">Price</h3>
        <input 
          type="number"
          value={propertyPrice}
          onChange={(e) => setPropertyPrice(e.target.value)}
          className='border p-2 border-gray-400 rounded-xl w-full'/>
        
        <h2 className="mb-2 mt-2 text-left">Bedroom</h2>
        <input 
          type="number"
          value={propertyBedroom}
          onChange={(e) => setPropertyBedroom(e.target.value)}
          className='border p-2 border-gray-400 rounded-xl w-full'/>
        
        <h2 className="mb-2 mt-2 text-left">Bathroom</h2>
        <input 
          type="number"
          value={propertyBathroom}
          onChange={(e) => setPropertyBathroom(e.target.value)}
          className='border p-2 border-gray-400 rounded-xl w-full'/>

        <h2 className="mb-2 mt-2 text-left">Guest</h2>
        <input 
          type="number"
          value={propertyGuest}
          onChange={(e) => setPropertyGuest(e.target.value)}
          className='border p-2 border-gray-400 rounded-xl w-full'/>
      </div>
      <div className=' mt-4 space-y-4'>
          <CustomButton label="Previous" className='w-full bg-enbnb-black hover:bg-gray-600' onClick={decrementStep}/>
          <CustomButton label="Next" className='w-full' onClick={incrementStep}/>
        </div>

    </> : currentStep == 4 ? 
    <>
      <SelectCountry
        value={propertyCountry}
        onChange={(value) => setPropertyCountry(value as SelectCountryValue)}
      />
      <div className=' mt-4 space-y-4'>
          <CustomButton label="Previous" className='w-full bg-enbnb-black hover:bg-gray-600' onClick={decrementStep}/>
          <CustomButton label="Next" className='w-full' onClick={incrementStep}/>
        </div>
      {/* <div className='mb-6'>
        <h3 className='text-l text-left mb-2'>Select Country</h3>
        <input 
          type="number"
          value={propertyPrice}
          onChange={(e) => setPropertyPrice(e.target.value)}
          className='border p-2 border-gray-400 rounded-xl w-full'/>
        <div className=' mt-4 space-y-4'>
          <CustomButton label="Previous" className='bg-black w-full' onClick={decrementStep}/>
          <CustomButton label="Next" className='w-full' onClick={incrementStep}/>
        </div>
      </div> */}
    </> :
    <>
      <div className='mb-6'>
        <h3 className="mb-2 mt-2 text-left">Choose an image:</h3>
        <div className='py-4 px-6 bg-gray-400 rounded-xl text-white text-left'>
          <input
            type='file'
            // multiple
            className=''
            accept='image/*'
            onChange={setImage}
          />
        </div>
        {propertyImage && 
        <div className='w-[200px] h-[150px] relative mt-4 grid grid-cols-2'>
              <Image
              fill
              alt='uploaded-image' 
              src={URL.createObjectURL(propertyImage)} //this javascript method creates a temporary url
              className='w-full h-full object-cover rounded-xl'
            />
        </div>}
      </div>

      <div className=' mt-4 space-y-4'>
        <CustomButton label="Previous" className='w-full bg-enbnb-black hover:bg-gray-600' onClick={decrementStep}/>
        <CustomButton label="Submit" className='w-full' onClick={submitForm}/>
      </div>
    </>
    
    }
    
    </>
  )
  return (
    <>
      <Modal
        isOpen={addPropertyModal.isOpen}
        close={addPropertyModal.close}
        label="Add Property"
        content={content}
      />
    </>
  )
}

export default AddPropertyModal
