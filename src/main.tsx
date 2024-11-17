import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './tailwind.css'

// @ts-expect-error - for some reason this doesn't work in terms of importing the font
// however, it works in the browser
import '@fontsource-variable/fira-code';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
