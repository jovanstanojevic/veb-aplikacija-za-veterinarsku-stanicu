import { useState } from 'react';
import Button from '../components/Buttno.jsx';
import mojLogo from '../assets/shapa.jpg';
import { Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', username: '', email: '', password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-container">
      <div className="logo">
        <img src={mojLogo} alt="Logo" className="custom-logo-img" />
        <span>HealthyPaw</span>
      </div>

      <h2 className="title">Registracija / Kreiranje naloga</h2>

      <form className="login-form">
        <div className="input-group">
          <label className="input-label">Ime:</label>
          <input type="text" name="firstName" placeholder="Unesite ime" className="input-field" onChange={handleChange} />
        </div>
        <div className="input-group">
          <label className="input-label">Prezime:</label>
          <input type="text" name="lastName" placeholder="Unesite prezime" className="input-field" onChange={handleChange} />
        </div>
        <div className="input-group">
          <label className="input-label">Korisnicko ime:</label>
          <input type="text" name="username" placeholder="Unesite korisnicko ime" className="input-field" onChange={handleChange} />
        </div>
        <div className="input-group">
          <label className="input-label">Email:</label>
          <input type="email" name="email" placeholder="Unesite Email" className="input-field" onChange={handleChange} />
        </div>
        <div className="input-group">
          <label className="input-label">Lozinka:</label>
          <input type="password" name="password" placeholder="Unesite lozinku" className="input-field" onChange={handleChange} />
        </div>

        <Button type="submit">Registruj se</Button>
      </form>
      <p className="footer-text">
        Imate profil? <Link to="/" className="register-link">Prijava</Link>
      </p>
    </div>
  );
}

export default Register;