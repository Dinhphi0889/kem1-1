import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SoChan from './SoChan'
import ChangeColorCar from './pages/ChangeColorCar'
import Con from './pages/Tinder'

function Cha() {
  const [change, setChange] = useState("https://i.pravatar.cc?u=1")

  const handleChange = (thamSo) => {
    console.log("value của con truyền lên cha: ", thamSo)
    setChange(`https://i.pravatar.cc?u=1${thamSo}`)
  }
  let hinh = change
  
  return (
    <>
      {/* <ChangeColorCar /> */}

      <Con hinh={change} handleChange={handleChange}/>
    </>
  )
}

export default Cha
