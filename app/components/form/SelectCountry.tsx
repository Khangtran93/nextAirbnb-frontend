'use client'

import Select from 'react-select'
import useCountries from '@/app/hooks/useCountries'

export type SelectCountryValue = {
  label: string,
  value: string
}

interface SelectCountryProps {
  value?: SelectCountryValue,
  onChange: (value: SelectCountryValue) => void;
  onKeyDown: (e:any) => void
}
const SelectCountry: React.FC<SelectCountryProps> = ({value, onChange, onKeyDown}) => {
  const {getAll} = useCountries()
  return (
    <>
    <Select
      placeholder='Anywhere'
      isClearable
      options={getAll()}
      value={value}
      onChange={(value) => onChange(value as SelectCountryValue)}
      onKeyDown={onKeyDown}
    />
    </>
  )

}

export default SelectCountry