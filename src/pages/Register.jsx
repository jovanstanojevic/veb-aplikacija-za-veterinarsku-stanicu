import { useState } from 'react';
import Button from '../components/Buttno.jsx';
import mojLogo from '../assets/shapa.jpg';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.username.trim() ||
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      alert('Molimo popunite sva polja.');
      return;
    }

    console.log('Registracija:', formData);

    navigate('/pocetna');
  };

  return (
    <div className="login-container">
      <div className="logo">
        <img
          src={mojLogo}
          alt="HealthyPaw Logo"
          className="custom-logo-img"
        />
        <span>HealthyPaw</span>
      </div>

      <h2 className="title">Registracija / Kreiranje naloga</h2>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="input-label">Ime:</label>
          <input
            type="text"
            name="firstName"
            placeholder="Unesite ime"
            className="input-field"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label className="input-label">Prezime:</label>
          <input
            type="text"
            name="lastName"
            placeholder="Unesite prezime"
            className="input-field"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label className="input-label">Korisnicko ime:</label>
          <input
            type="text"
            name="username"
            placeholder="Unesite korisnicko ime"
            className="input-field"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label className="input-label">Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Unesite Email"
            className="input-field"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label className="input-label">Lozinka:</label>
          <input
            type="password"
            name="password"
            placeholder="Unesite lozinku"
            className="input-field"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <Button type="submit">
          Registruj se
        </Button>
      </form>

      <p className="footer-text">
        Imate profil?{' '}
        <Link to="/" className="register-link">
          Prijava
        </Link>
      </p>
    </div>
  );
}

export default Register;