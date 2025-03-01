export const getGuestNumber = (guest: number) => {
  return Array.from({length: guest}, (_, index) => index + 1);
}

export const formatDate = (date: string) => {
  const dateObject = new Date(date)

  return dateObject.toLocaleDateString();
  // return 1
}

export const numberOfDays = (startDate: string, endDate: string) => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  return Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

}