'use client'
import React from 'react'
import PropertyListItem from './PropertyListItem'
import { PropertyType } from '@/app/type/type'
import { useEffect, useState } from 'react'
import apiService from '@/app/services/apiService'
import useSearchModal from '@/app/hooks/useSearchModal'
import { formatDate } from '@/app/util/util'
import {format} from 'date-fns'

interface PropertyListProps {
  host_id?: string | null
  is_favorite?: boolean
}
const Properties: React.FC<PropertyListProps> = (
  {host_id, is_favorite}
) => {
  const [properties, setProperties] = useState<PropertyType[]>([])
  const searchModal = useSearchModal()
 
  const getProperty = async () => {
    let url = '/api/properties/'
    let firstParam = true
    // if (host_id) {
      if (is_favorite) {
        url += 'favorites/'
      }
      if (host_id) {
        url += firstParam ? `?host_id=${host_id}` : `&host_id=${host_id}`
        firstParam = false
      }
      if (searchModal.query.country !== "" && searchModal.query.country !== undefined) {
        url+= firstParam ? `?country=${searchModal.query.country}` : `&country=${searchModal.query.country}`
        firstParam = false
      } 
      if (searchModal.query.checkIn !== undefined) {
        console.log("searchModal.query.checkin ", format(searchModal.query.checkIn, "MM/dd/yyyy'T'HH:mm:ss"))
        url+= firstParam ? `?check_in=${format(searchModal.query.checkIn, "MM/dd/yyyy' 'HH:mm:ss")}` : `&check_in=${format(searchModal.query.checkIn, "MM/dd/yyyy' 'HH:mm:ss")}`
        firstParam = false
      }
      if (searchModal.query.checkOut !== undefined) {
        url+= firstParam ? `?check_out=${format(searchModal.query.checkOut, "MM/dd/yyyy' 'HH:mm:ss")}` : `&check_out=${format(searchModal.query.checkOut, "MM/dd/yyyy' 'HH:mm:ss")}`
        firstParam = false
      }
      if (searchModal.query.guests != "") {
        console.log("guest is undefined", searchModal.query.guests)
        url+= firstParam ? `?guests=${searchModal.query.guests}` : `&guests=${searchModal.query.guests}`
        firstParam = false
      }
      if (searchModal.query.bedrooms !== "") {
        url+= firstParam ? `?bedrooms=${searchModal.query.bedrooms}` : `&bedrooms=${searchModal.query.bedrooms}`
        firstParam = false
      }
      if (searchModal.query.bathrooms !== "") {
        url+= firstParam ? `?bathrooms=${searchModal.query.bathrooms}` : `&bathrooms=${searchModal.query.bathrooms}`
        firstParam = false
      }
      if (searchModal.query.category !== "") {
        url+= firstParam ? `?category=${searchModal.query.category}` : `&category=${searchModal.query.category}`
        firstParam = false
      }
    // }
      console.log("url received: " , url)
      const tempProperties = await apiService.get(url)
      setProperties(tempProperties.data)  
    }
 
  useEffect(() => {
    console.log("searchModalQuery", searchModal.query)
    getProperty()
  }, [searchModal.query.country, searchModal.query])
  return (
    <>
      {properties ? (properties.map((property) => {
        return (
          <PropertyListItem key={property.id} property={property}/>
        )
      })) : (
        <>
          You have no favorite properties.
        </>
      )}
    </>
  )
}

export default Properties
