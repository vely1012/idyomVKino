// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App


import { Routes, Route } from 'react-router-dom'
// import './App.css'
import './assets/style/style.css'

import Index from './pages/Index'
import Seance from './pages/Seance'
import Payment from './pages/Payment'
import Ticket from './pages/Ticket'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />}></Route>
      <Route path="/seance/:seanceId/:date" element={<Seance />}></Route>
      <Route path="/seance/:seanceProps" element={<Seance />}></Route>
      <Route path="/payment" element={<Payment />}></Route>
      <Route path="/ticket" element={<Ticket />}></Route>
    </Routes>
  )
}

export default App
