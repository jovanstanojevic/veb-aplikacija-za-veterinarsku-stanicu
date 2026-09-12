import { useNavigate } from "react-router-dom";

function Footer() {
    const navigate = useNavigate();
  return (
    <footer className="footer">

      <div className="footer-column">
        <div className="footer-logo"  onClick={() => navigate("/pocetna")}>
          <img
            src="/shapa.png"
            alt="HealthyPaw Logo"
            className="footer-logo-img"
          />
          <span>HealthyPaw</span>
        </div>

        <p>
          Veterinarska stanica za pse
          <br />
          mačke i ostale ljubimce
        </p>
      </div>

      <div className="footer-column">
        <strong>Kontakt:</strong>
        <p>
          Ulica Vojvode Mišića 14, Niš
          <br />
          060 456 7890
        </p>
      </div>

      <div className="footer-column">
        <strong>Radno Vreme:</strong>
        <p>
          Pon – Sub: 08:00–18:00
          <br />
          Nedelja: ne radimo
        </p>
      </div>

    </footer>
  );
}

export default Footer;