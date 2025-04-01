import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.scss';
import NavBar from './components/NavBar/NavBar';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard.jsx';
import AdminLogin from './pages/AdminLoginPage/AdminLoginPage.Jsx';
import GameList from './pages/GameList/GameList.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const checkToken = () => setIsAuthenticated(!!localStorage.getItem('token'));
    window.addEventListener('storage', checkToken);
    return () => window.removeEventListener('storage', checkToken);
  }, []);

  return (
    <main>
      <BrowserRouter>
        <NavBar />
        <ToastContainer position="top-right" autoClose={4000} theme="dark" />{' '}
        <Routes>
          <Route
            path="/admin/login"
            element={<AdminLogin onLogin={() => setIsAuthenticated(true)} />}
          />
          <Route
            path="/admin/dashboard"
            element={
              isAuthenticated ? <AdminDashboard /> : <Navigate to="/admin/login" />
            }
          />
          <Route path="/" element={<Navigate to="/games" />} />
          <Route path="/games" element={<GameList />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
