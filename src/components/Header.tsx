import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div
        className="header-logo"
        onClick={() => navigate("/pocetna")}
      >
        <img
            src="/shapa.png"
            alt="HealthyPaw Logo"
            className="header-logo-img"
        />
        <span>HealthyPaw</span>
      </div>

      <nav className="header-nav">
        <button onClick={() => navigate("/pocetna")}>Početna</button>
        <button onClick={() => navigate("/profil")}>Profil</button>
        <button onClick={() => navigate("/usluge")}>Usluge</button>
        <button onClick={() => navigate("/komentari")}>Komentari</button>
        <button onClick={() => navigate("/zakazivanje")}>
          Zakazivanje
        </button>
        <button
          className="logout-button"
            onClick={() => {
            const potvrda = window.confirm(
            "Da li ste sigurni da želite da se odjavite?"
          );

          if (potvrda) {
          navigate("/");
          }
            }}
          >
          Odjavi se
        </button>
      </nav>
    </header>
  );
}

export default Header;