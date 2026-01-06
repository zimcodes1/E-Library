import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/Login';
import SignUp from './pages/SignUp';
import HomePage from './pages/HomePage';
import SearchPage from './pages/Search';
import Shelve from './pages/Shelve';
import UploadPage from './pages/Upload';
import UserProfile from './pages/Profile';

const router  = createBrowserRouter([
  {path:"/", element:<LandingPage />},
  {path:'/login', element: <LoginPage/>},
  {path:'/signup', element: <SignUp/>},
  {path:'/home', element: <HomePage/>},
  {path:'/search', element: <SearchPage/>},
  {path:'/myshelve', element: <Shelve/>},
  {path:'/upload', element: <UploadPage/>},
  {path:'/profile', element: <UserProfile/>}
]
)
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
