import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx'
import Pocetna from './pages/Pocetna.jsx';
import Profil from "./pages/Profil.jsx";
import Usluge from "./pages/Usluge.tsx";
import './index.css'

function App() {
  return (
    <main>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/pocetna" element={<Pocetna />} />
      <Route path="/profil" element={<Profil />} />
      <Route path="/usluge" element={<Usluge />} />
    </Routes>
    </main>
  )
}

export default App