'use client'
import React from 'react'
import PropertyListItem from './PropertyListItem'
import { PropertyType } from '@/app/type/type'
import { useEffect, useState } from 'react'
import apiService from '@/app/services/apiService'

interface PropertyListProps {
  host_id?: string | null
  is_favorite?: boolean
}
const Properties: React.FC<PropertyListProps> = (
  {host_id, is_favorite}
) => {
  const [properties, setProperties] = useState<PropertyType[]>([])

  const getProperty = async () => {
    let url = '/api/properties/'
    if (host_id) {
      if (is_favorite) {
        url += 'favorites/'
      }
      else {
        url += `?host_id=${host_id}`
      }
    }

      const tempProperties = await apiService.authorizedGet(url)
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
