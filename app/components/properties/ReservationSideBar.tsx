'use client'
import {useState, useEffect} from 'react'
import {Range} from 'react-date-range'
import {differenceInDays, eachDayOfInterval, format} from 'date-fns'
import React from 'react'
import CustomButton from '../form/CustomButton'
import { getGuestNumber } from '@/app/util/util'
import useLoginModal from '@/app/hooks/useLoginModal'
import DatePicker from '../form/DatePicker'
import apiService from '@/app/services/apiService'
import { useRouter } from 'next/navigation'

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
}

export type Property = {
  id: string,
  price_per_night: number,
  guests: number
}

interface ReservationSideBarProps {
  userId: string | null,
  property: Property
}
const ReservationSideBar: React.FC<ReservationSideBarProps> = ({userId, property}) => {
  const router = useRouter()
  const SERVICE_FEE = 0.05
  const loginModal = useLoginModal()
  const maxGuestNumber = getGuestNumber(property.guests)
  //Variables
  const [fee, setFee] = useState<number>(property.price_per_night * SERVICE_FEE)
  const [nights, setNights] = useState<number>(1)
  const [totalPrice, setTotalPrice] = useState<number>(property.price_per_night + fee)
  const [dateRange, setDateRange] = useState<Range>(initialDateRange)
  const [bookedDates, setBookedDates] = useState<Date[]>([])
  const [minDate, setMinDate] = useState<Date>(new Date())
  const [guests, setGuests] = useState<string>('1')

  const reserveProperty = async () => {
    if (userId) {
      if (dateRange.startDate && dateRange.endDate) {
        const reservationDataForm = new FormData();
        reservationDataForm.append('total', totalPrice.toString())
        reservationDataForm.append('start_date', format(dateRange.startDate, 'yyyy-MM-dd'))
        reservationDataForm.append('end_date', format(dateRange.endDate, 'yyyy-MM-dd'))
        reservationDataForm.append('number_of_nights', nights.toString())
        reservationDataForm.append('guest', guests)
        const response = await apiService.authorizedPost(`/api/properties/${property.id}/book/`, reservationDataForm)
        console.log("response", response)
     
        if (response.status_code === 400) {
          console.log("Booking successful.")
          router.push('/')
        }
    }
    
  }
    else {
      loginModal.open()
    }
  }

  const getReservationDate = async () => {
    let dates: Date[] = [];

    const reservations = await apiService.get(`/api/properties/${property.id}/reservations/`)

    reservations.data.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.start_date), 
        end: new Date(reservation.end_date)
    })
      dates = [...dates, ...range]
    })
    setBookedDates(dates)
  }
  const _setDateRange = (selection: any) => {
    let newStartDate = new Date(selection.startDate)
    let newEndDate = new Date(selection.endDate)
    setDateRange({
      ...dateRange,
      startDate: newStartDate,
      endDate: newEndDate
    })
  }

  useEffect(() => {
    getReservationDate()

    if (dateRange.startDate && dateRange.endDate) {
    const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate)
    if (dayCount > 0) {
      const _fee = property.price_per_night * dayCount * SERVICE_FEE
      setNights(dayCount)
      setFee(_fee)
      setTotalPrice(property.price_per_night * dayCount + _fee)
    }
    }
  },[dateRange])
return (
  <aside className='p-6 col-span-2 border border-gray-300 rounded-xl shadow-xl sticky top-0 max-h-max'>
  <div className='text-xl text-black mb-4'>${totalPrice} <span className='text-lg'>total</span></div>
  <div className='border border-gray-300 rounded-xl py-2 px-2 font-bold'>
    <label>Guest</label>
    <select 
      value={guests} 
      onChange={(e) => setGuests(e.target.value)} 
      className='w-full bg-white -ml-1 text-xm'
    >
      {maxGuestNumber.map((value: number, index: number) => (
        <option key={index} value={value}>{value}</option>
      ))}
    </select>  
  </div>
  <div>
    <DatePicker
      value={dateRange}
      onChange={(value) => _setDateRange(value.selection)} 
      bookedDates={bookedDates}
    />
  </div>
  <div className='my-4 text-lg'>
    <div className='grid grid-cols-2 '>
      <p className='text-left'>${property.price_per_night} x {nights} nights</p>
      <p className='text-right'>${property.price_per_night * nights}</p>
    </div>
    <div className='grid grid-cols-2'>
      <p className='text-left'>Enbnb Service Fee</p>
      <p className='text-right'>${fee}</p>
    </div>
    <div className='grid grid-cols-2'>
      <p className='text-left'>Total</p>
      <p className='text-right'>${totalPrice}</p>
    </div>
  </div>
    <CustomButton label="Reserve" className='text-center' onClick={reserveProperty}/>
  </aside>
)
}

export default ReservationSideBar
