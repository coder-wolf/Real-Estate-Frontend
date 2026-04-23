import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from './Routes/Routes.jsx'
import { RouterProvider } from 'react-router-dom'
import AppProvider from './providers/AppProvider.jsx'
import { Helmet, HelmetProvider } from 'react-helmet-async';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <Helmet>
        <title>Estatery</title>
      </Helmet>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </HelmetProvider>
  </StrictMode>
)
