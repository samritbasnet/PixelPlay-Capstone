import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer/Footer';
import NavBar from './components/NavBar/NavBar';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard.jsx';
import AdminLoginPage from './pages/AdminLoginPage/AdminLoginPage.jsx';
import GameDetail from './pages/GameDetailsPage/GameDetail.jsx';
import GameList from './pages/GameList/GameList.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
import PixelShelf from './pages/PixelShelf/PixelShelf.jsx';
import SearchResults from './pages/SearchResult/SearchResults.jsx';

import './App.scss';

const Layout = ({ children }) => (
  <>
    <NavBar />
    {children}
    <Footer />
  </>
);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const checkToken = () => setIsAuthenticated(!!localStorage.getItem('token'));
    window.addEventListener('storage', checkToken);
    return () => window.removeEventListener('storage', checkToken);
  }, []);

  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={4000} theme="dark" />
      <Routes>
        <Route
          path="/admin/login"
          element={<AdminLoginPage onLogin={() => setIsAuthenticated(true)} />}
        />
        <Route
          path="/admin/dashboard"
          element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/admin/login" />}
        />

        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/games"
          element={
            <Layout>
              <GameList />
            </Layout>
          }
        />
        <Route
          path="/game/:id"
          element={
            <Layout>
              <GameDetail />
            </Layout>
          }
        />
        <Route
          path="/wishlist"
          element={
            <Layout>
              <PixelShelf />
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <SearchResults />
            </Layout>
          }
        />

        <Route path="/" element={<Navigate to="/games" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
