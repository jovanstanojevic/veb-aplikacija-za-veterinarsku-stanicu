import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div>
        <div
          className="footer-logo"
          onClick={() => navigate("/")}
        >
          🐾HealthyPaw
        </div>

        <i>
          Veterinarska stanica za pse
          <br />
          mačke i ostale ljubimce
        </i>
      </div>

      <div>
        <strong>Kontakt:</strong>
        <br />
        <i>
          Ulica Vojvode Mišića 14, Niš
          <br />
          060 456 7890
        </i>
      </div>

      <div>
        <strong>Radno Vreme:</strong>
        <br />
        <i>
          Pon – Sub: 08:00–18:00
          <br />
          Nedelja: ne radimo
        </i>
      </div>
    </footer>
  );
}

export default Footer;