import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Parent from './compontents/Parent.jsx' 
import Parent1 from './compontents/Parent1.jsx' 


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*<App />*/}
  <Parent1></Parent1>
  </StrictMode>,
)
