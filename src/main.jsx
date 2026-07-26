import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Layout from './Layout.jsx'
import Robotics from './pages/Robotics.jsx'
import Systems from './pages/Systems.jsx'
import Research from './pages/Research.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/robotics" element={<Robotics />} />
          <Route path="/systems" element={<Systems />} />
          <Route path="/research" element={<Research />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
