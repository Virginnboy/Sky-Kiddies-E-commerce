import { Outlet } from "react-router-dom"
import Header from "./Header"
import { useState } from "react"

export default function RootLayout() {
  const [ isOpen, setIsOpen ] = useState(false)
  return (
    <>
      <Header 
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