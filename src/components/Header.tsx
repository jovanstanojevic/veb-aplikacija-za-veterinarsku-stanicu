import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate("/")}>
        🐾 HealthyPaw
      </div>

      <nav>
        <button onClick={() => navigate("/")}>Početna</button>
        <button onClick={() => navigate("/profil")}>Profil</button>
        <button onClick={() => navigate("/usluge")}>Usluge</button>
        <button onClick={() => navigate("/komentari")}>Komentari</button>
        <button onClick={() => navigate("/zakazivanje")}>
          Zakazivanje
        </button>
      </nav>
    </header>
  );
}

export default Header;