'use client'
import React from 'react'
import PropertyListItem from './PropertyListItem'
import { PropertyType } from '@/app/type/type'
import { useEffect, useState } from 'react'
import apiService from '@/app/services/apiService'
const Properties = () => {
  const [properties, setProperties] = useState<PropertyType[]>([])

  const getProperty = async () => {
    const tempProperties = await apiService.get('/api/properties/')
    setProperties(tempProperties.data)   
  }
  useEffect(() => {
    getProperty()
  }, [])
  return (
    <>
      {properties.map((property) => {
        return (
          <PropertyListItem key={property.id} property={property}/>
        )
      })}
    </>
  )
}

export default Properties
