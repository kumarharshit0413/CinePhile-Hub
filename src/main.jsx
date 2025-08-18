import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements,RouterProvider ,Route} from 'react-router-dom';
import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailsPage';
import SearchPage from './pages/SearchPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import WatchlistPage from './pages/WatchlistPage';
import { AuthProvider } from './context/AuthContext';

const route = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={
            <AuthProvider>
              <Layout />
            </AuthProvider>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/movie/:id" element={<DetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
        </Route>
    )
  )


createRoot(document.getElementById('root')).render(

  <StrictMode>
    <RouterProvider router={route} />
  </StrictMode>,
)
