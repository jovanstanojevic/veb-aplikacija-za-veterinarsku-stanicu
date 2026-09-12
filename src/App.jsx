import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx'
import Pocetna from './pages/Pocetna.jsx';
import Profil from "./pages/Profil.jsx";
import Usluge from "./pages/Usluge.tsx";
import Komentari from "./pages/Komentari.tsx";
import Zakazivanje from "./pages/Zakazivanje.tsx";
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
      <Route path="/komentari" element={<Komentari />} />
      <Route path="/zakazivanje" element={<Zakazivanje />} />
    </Routes>
    </main>
  )
}

export default App