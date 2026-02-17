import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import router from './Router/RootRouter.jsx'
import MainLayout from './Layouts/MainLayout.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>

    <RouterProvider router={router}>
      <MainLayout></MainLayout>
   </RouterProvider>
     
   
  </StrictMode>
);

