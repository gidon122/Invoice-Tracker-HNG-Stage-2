import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { InvoiceProvider } from './contexts/InvoiceContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <InvoiceProvider>
      <App />
    </InvoiceProvider>
  </StrictMode>,
)
