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
      <Route path="/idyomVKino/" element={<Index />}></Route>
      <Route path="/idyomVKino/seance" element={<Seance />}></Route>
      <Route path="/idyomVKino/payment" element={<Payment />}></Route>
      <Route path="/idyomVKino/ticket" element={<Ticket />}></Route>
      <Route path="/idyomVKino/login" element={<Login />}></Route>
      <Route path="/idyomVKino/admin" element={<Admin />}></Route>
    </Routes>
  )
}

export default App
