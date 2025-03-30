import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import NavBar from './components/NavBar/NavBar';
function App() {
  return (
    <main>
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    </main>
  );
}

export default App;
