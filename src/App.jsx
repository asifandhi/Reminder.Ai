import { useState } from 'react'
import './App.css'
import { useSelector } from 'react-redux'
import theme from './theme'
import { Outlet } from 'react-router-dom'


function App() {

  const mode = useSelector((state)=> state.theme.mode);
  const t = theme[mode]



  return (
    
    <div style={{ backgroundColor: t.bg, color: t.text, minHeight: "100vh" }}
    >
      <Outlet/>

    </div>
  )
}

export default App
