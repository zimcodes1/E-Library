import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/Login';
import SignUp from './pages/SignUp';
import HomePage from './pages/HomePage';
import SearchPage from './pages/Search';
import Shelve from './pages/Shelve';
import UploadPage from './pages/Upload';
import UserProfile from './pages/Profile';
import Lost from './pages/Lost';
import ReadBook from './pages/ReadBook';
import BookDetails from './pages/BookDetails';
import About from './pages/About';
import TermsAndConditions from './pages/TermsAndConditions';
import FeedbackPage from './pages/Feedback';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminBooks from './pages/AdminBooks';
import AdminFeedback from './pages/AdminFeedback';
import AdminLogin from './pages/AdminLogin';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import ScrollToTop from './components/ScrollToTop';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/myshelve' element={<Shelve />} />
        <Route path='/upload' element={<UploadPage />} />
        <Route path='/profile' element={<UserProfile />} />
        <Route path='/reading/:bookId' element={<ReadBook />} />
        <Route path='/bookdetails/:bookId' element={<BookDetails />} />
        <Route path='/about' element={<About />} />
        <Route path='/terms' element={<TermsAndConditions />} />
        <Route path='/feedback' element={<FeedbackPage />} />
        <Route path='/admin' element={<AdminLogin />} />
        <Route path='/admin/dashboard' element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
        <Route path='/admin/dashboard/users' element={<AdminProtectedRoute><AdminUsers /></AdminProtectedRoute>} />
        <Route path='/admin/dashboard/books' element={<AdminProtectedRoute><AdminBooks /></AdminProtectedRoute>} />
        <Route path='/admin/dashboard/feedbacks' element={<AdminProtectedRoute><AdminFeedback /></AdminProtectedRoute>} />
        <Route path='*' element={<Lost />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
