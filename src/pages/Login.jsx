import { useState } from 'react';
import Button from '../components/Buttno.jsx';
import mojLogo from '../assets/shapa.jpg';
import { Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Prijava:', { username, password });
  };

  return (
    <div className="login-container">
      <div className="logo">
        <img 
          src={mojLogo} 
          alt="HealthyPaw Logo" 
          className="custom-logo-img" /* Dodajemo novu klasu za CSS */
        />
        <span>HealthyPaw</span>
      </div>

      <h2 className="title">Prijava na nalog</h2>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <label className="input-label">Korisnicko ime:</label>
          <input
            type="text"
            placeholder="Unesite ime"
            className="input-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label className="input-label">Lozinka:</label>
          <input
            type="password"
            placeholder="Unesite lozinku"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button type="submit">Prijavi se</Button>
      </form>

      <p className="footer-text">
        Nemate nalog &rarr; <Link to="/register" className="register-link">Registracija</Link>
      </p>
    </div>
  );
}

export default Login;