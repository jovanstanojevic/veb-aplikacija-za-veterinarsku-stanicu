import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx'
import Pocetna from './Pocetna.jsx';
import './index.css'

function App() {
  return (
    <main>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/pocetna" element={<Pocetna />} />
    </Routes>
    </main>
  )
}

export default App