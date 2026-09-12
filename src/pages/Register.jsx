import { useState } from 'react';
import Button from '../components/Buttno.jsx';
import mojLogo from '../assets/moj-logo.png'; // Uvezi svoju sliku kao u Login.jsx

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registracija podaci:', formData);
  };

  return (
    <div className="login-container">
      <div className="logo">
        <img src={mojLogo} alt="HealthyPaw Logo" className="custom-logo-img" />
        <span>HealthyPaw</span>
      </div>

      <h2 className="title">Registracija / Kreiranje naloga</h2>

      <form onSubmit={handleSubmit} className="login-form">
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

        <Button type="submit">Registruj se</Button>
      </form>
    </div>
  );
}

export default Register;