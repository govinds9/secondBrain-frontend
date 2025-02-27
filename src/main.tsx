import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { RecoilRoot } from 'recoil'
import { BrowserRouter } from 'react-router'
import AuthProvider from './Authprovider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecoilRoot>
      <BrowserRouter>
      <AuthProvider>
       <App />
      </AuthProvider>
      </BrowserRouter>
    </RecoilRoot>
      
  </StrictMode>,
)
