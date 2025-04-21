import {create} from "zustand"

export type SearchQueryType = {
  country?: string | undefined;
  checkIn?: Date | undefined;
  checkOut?: Date | undefined;
  guests?: string | "";
  bedrooms?: string | "";
  bathrooms?: string | "";
  category: string;
}
interface SearchModalStore {
  isOpen: boolean,
  step: string,
  open: (step: string) => void,
  close: () => void,
  query: SearchQueryType,
  setSearchQuery: (query: SearchQueryType) => void
}

const useSearchModal = create<SearchModalStore>((set) => ({
  isOpen: false,
  step: "",
  open: (step) => set({isOpen: true, step: step}),
  close: () => set({isOpen: false}),
  query: {
    country: "",
    checkIn: undefined,
    checkOut: undefined,
    guests: "",
    bedrooms: "",
    bathrooms: "",
    category: "",
  },
  setSearchQuery: (query) => set({query: query})
}))

export default useSearchModal;