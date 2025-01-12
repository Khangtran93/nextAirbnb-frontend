export const getGuestNumber = (guest: number) => {
  return Array.from({length: guest}, (_, index) => index + 1);
}