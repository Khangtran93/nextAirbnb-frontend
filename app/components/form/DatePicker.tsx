'use client'
import { Range, DateRange, RangeKeyDict} from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

interface DatePickerProps {
  value: Range,
  onChange: (value: RangeKeyDict) => void,
  bookedDates?: Date[]
}

const DatePicker: React.FC<DatePickerProps> = ({value, onChange, bookedDates}) => {
  return (
   <>
    <DateRange
      className='w-full border border-gray-400 rounded-xl my-4'
      rangeColors={['enbnb']}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction='horizontal'
      showDateDisplay={false}
      minDate={new Date()}
      months={2}
      disabledDates={bookedDates}
    />
   </>
  )
}

export default DatePicker
