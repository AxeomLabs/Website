import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Layout from './Layout.jsx'
import Robotics from './pages/Robotics.jsx'
import Systems from './pages/Systems.jsx'
import Research from './pages/Research.jsx'
import Founders from './pages/Founders.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import TermsOfService from './pages/TermsOfService.jsx'
import CookiePolicy from './pages/CookiePolicy.jsx'
import Contact from './pages/Contact.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/robotics" element={<Robotics />} />
          <Route path="/systems" element={<Systems />} />
          <Route path="/research" element={<Research />} />
          <Route path="/founders" element={<Founders />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
