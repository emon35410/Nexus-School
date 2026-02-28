import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './Router/RootRouter.jsx'
import AuthProvider from './AuthContext/AuthProvider.jsx'
import { ToastContainer } from 'react-toastify'
import { Toaster } from 'react-hot-toast'

// ১. React Query ইম্পোর্ট করুন
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// ২. একটি Query Client তৈরি করুন
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* ৩. পুরো অ্যাপকে QueryClientProvider দিয়ে র‍্যাপ করুন */}
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);