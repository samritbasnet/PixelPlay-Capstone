import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import NavBar from './components/NavBar/NavBar';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard.jsx';
import AdminLogin from './pages/AdminLoginPage/AdminLoginPage.Jsx';

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
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
