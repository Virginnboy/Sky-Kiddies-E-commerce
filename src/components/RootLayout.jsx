import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar";
import { useState } from "react"

export default function RootLayout() {
  const [ isOpen, setIsOpen ] = useState(false)
  return (
    <>
      <Navbar 
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <main>
        <Outlet
          context={{isOpen, setIsOpen}}
        />
      </main>
    </>
  )
}