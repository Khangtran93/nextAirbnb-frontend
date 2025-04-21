'use client'
import Image from "next/image";
import Categories from "./components/Categories/Categories";
import Properties from "./components/properties/PropertyList";
import useSearchModal from "./hooks/useSearchModal";

export default function Home() {
  const searchModal = useSearchModal()
  return (
    <main className="relative max-w-[1500px] mx-auto mt-4">
        <Categories 
          category={searchModal.query.category} 
          setCategory={(category) => searchModal.setSearchQuery({ ...searchModal.query, category })}
        />
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <Properties/>
      </div>
    </main>
  );
}
