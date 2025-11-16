import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App.tsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivacyPolicy from './support/PrivacyPolicy.tsx';
import TermsOfService from './support/TermsOfService.tsx';
import Contact from './support/Contact.tsx';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { initDB } from './util/db.ts';

await initDB();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
    <Analytics />
    <SpeedInsights />
  </StrictMode>,
)
