import { Routes, Route } from 'react-router-dom'

import Index from './pages/Index'
import Seance from './pages/Seance'
import Payment from './pages/Payment'
import Ticket from './pages/Ticket'
import Login from './pages/Login'
import Admin from './pages/Admin'

import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />}></Route>
      <Route path="/seance" element={<Seance />}></Route>
      <Route path="/payment" element={<Payment />}></Route>
      <Route path="/ticket" element={<Ticket />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/admin" element={<Admin />}></Route>
    </Routes>
  )
}

export default App
