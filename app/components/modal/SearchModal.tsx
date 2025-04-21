'use client'
import Modal from "./Modal"
import { useRouter } from "next/navigation"
import {Range} from 'react-date-range'
import { useState } from "react"
import useSearchModal, { SearchQueryType } from "@/app/hooks/useSearchModal"
import SelectCountry, { SelectCountryValue } from "../form/SelectCountry"
import DatePicker from "../form/DatePicker"
import { formatDate } from "@/app/util/util"
import CustomButton from "../form/CustomButton"

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
}
const SearchModal = () => {
  const searchModal = useSearchModal()
  const [country, setCountry] = useState<SelectCountryValue | undefined>()
  const [dateRange, setDateRange] = useState<Range>(initialDateRange)
  const [checkIn, setCheckIn] = useState<Date | undefined>()
  const [checkOut, setCheckOut] = useState<Date | undefined>()
  const [guests, setGuests] = useState<string>("")
  const [bedrooms, setBedrooms] = useState<string>("")
  const [bathrooms, setBathrooms] = useState<string>("")
  const [category, setCategory] = useState<string>("")
  const router = useRouter()
  
  const _setDateRange = (selection: Range) => {
    const {startDate, endDate} = selection
    setCheckIn(startDate)
    setCheckOut(endDate)
    setDateRange(selection)
  }

  const handleSearch = () => {
    const searchQuery: SearchQueryType = {
      country: country?.label,
      checkIn: checkIn,
      checkOut: checkOut,
      guests: guests,
      bedrooms: bedrooms,
      bathrooms: bathrooms,
      category: category
    }
    searchModal.setSearchQuery(searchQuery)
    setCountry(undefined)
    setDateRange(initialDateRange)
    setCheckIn(undefined)
    setCheckOut(undefined)
    setGuests("")
    setBedrooms("")
    setBathrooms("")
    setCategory("")

    searchModal.close()
  }

  const handleKeyDown = (e:any, action: string) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      searchModal.open(action)
    }
  };

  const contentLocation = (
    <>
      <SelectCountry
        value={country}
        onChange={(value) => {
          setCountry(value as SelectCountryValue)
          searchModal.open("checkin")
        }}
        onKeyDown={ (e: any) => handleKeyDown(e, "checkin")}
      />
      <CustomButton 
      label="Next"
      className="mt-2"
      onClick={() => searchModal.open("checkin")}
    />
  </>
  )
  const contentCheckIn = (
    <>
    <div>Check In</div>
    <DatePicker
      value={dateRange}
      onChange={(value) => {
        _setDateRange(value.selection)
        searchModal.open("checkout")
      }}
    />
      <CustomButton 
        label="Previous"
        className="bg-black mb-2"
        onClick={() => searchModal.open("location")}
      />
      <CustomButton 
        label="Next"
        onClick={() => searchModal.open("checkout")}
      />
    </>
  )
  const contentCheckOut = (
    <>
      <div>Check Out</div>
      <DatePicker
      value={dateRange}
      onChange={(value) => {
        _setDateRange(value.selection)
        // searchModal.open("details")
      }}
    />
     <CustomButton 
      label="Previous"
      className="mb-2 bg-black"
      onClick={() => searchModal.open("checkin")}
      />
    <CustomButton 
      label="Next"
      onClick={() => searchModal.open("details")}
      />
    </>
  
  )
  const contentDetails = (
    <>
        <div>Details</div>
        <div className="mx-2">
          <h3 className="mb-2 text-left">Number of guest</h3>
          <input 
            type="number"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className='border p-2 border-gray-400 rounded-xl w-full my-2'
            />
          <h3 className="mb-2 text-left">Number of bedrooms</h3>
          <input 
            type="number"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className='border p-2 border-gray-400 rounded-xl w-full my-2'
            />
          <h3 className="mb-2 text-left">Number of bathrooms</h3>
          <input 
            type="number"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
            className='border p-2 border-gray-400 rounded-xl w-full my-2'
            />
          <h3 className="mb-2 text-left">Category</h3>
          <input 
            type="string"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='border p-2 border-gray-400 rounded-xl w-full my-2'
            />
        
        </div>
        
        <CustomButton 
          label="Previous"
          className="mt-2 bg-black"
          onClick={() => searchModal.open("checkout")}
        />
        <CustomButton 
          label="Search"
          className="mt-2"
          onClick={() => {
            router.push('/')
            handleSearch()
          }}
        />
    </>
  )
  const content = (
    <>
      {searchModal.step === "location" ? 
      <div>{contentLocation}</div> : 
      searchModal.step === "checkin" ? <div>{contentCheckIn}</div> :
      searchModal.step === "checkout" ? <div>{contentCheckOut}</div> : 
      searchModal.step === "details" ? <div>{contentDetails}</div> :
      <div>{contentLocation}</div>
      }
    </>
  )
  return (
    <Modal
      label="Search Properties"
      content={content}
      isOpen={searchModal.isOpen}
      close={searchModal.close}
    />
  )
}

export default SearchModal
