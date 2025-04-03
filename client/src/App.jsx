import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import NavBar from './components/NavBar/NavBar';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard.jsx';
import AdminLogin from './pages/AdminLoginPage/AdminLoginPage.Jsx';
import GameDetail from './pages/GameDetailsPage/GameDetail.jsx';
import GameList from './pages/GameList/GameList.jsx';
import PixelShelf from './pages/PixelShelf/PixelShelf.jsx';
import SearchResults from './pages/SearchResult/SearchResults.jsx';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const checkToken = () => setIsAuthenticated(!!localStorage.getItem('token'));
    window.addEventListener('storage', checkToken);
    return () => window.removeEventListener('storage', checkToken);
  }, []);

  return (
    <main>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      <BrowserRouter>
        <NavBar />
        <ToastContainer position="top-right" autoClose={4000} theme="dark" />{' '}
        <Routes>
          <Route
            path="/admin/login"
            element={<AdminLogin onLogin={() => setIsAuthenticated(true)} />}
          />
          <Route path="/search" element={<SearchResults />} />

          <Route
            path="/admin/dashboard"
            element={
              isAuthenticated ? <AdminDashboard /> : <Navigate to="/admin/login" />
            }
          />
          <Route path="/" element={<Navigate to="/games" />} />
          <Route path="/games" element={<GameList />} />
          <Route path="/game/:id" element={<GameDetail />} />
          <Route path="/wishlist" element={<PixelShelf />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
