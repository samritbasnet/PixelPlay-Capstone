import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import NavBar from './components/NavBar/NavBar';
import AdminLogin from './pages/AdminLoginPage/AdminLoginPage.Jsx';
function App() {
  return (
    <main>
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
