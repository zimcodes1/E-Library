import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/Login';

const router  = createBrowserRouter([
  {path:"/", element:<LandingPage />},
  {path:'/login', element: <LoginPage/>}
]
)
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
