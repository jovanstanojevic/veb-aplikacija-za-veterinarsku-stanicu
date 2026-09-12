import { useNavigate } from "react-router-dom";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";

function Pocetna() {
  const navigate = useNavigate();

  return (
    <div className="pocetna-page">
      <Header />

      <main className="pocetna-content">

        <section className="hero-section">
          <div className="hero-text">
            <p>Otvoreno svakog dana osim nedelje.</p>

            <h1>
              Briga o vašem ljubimcu,
              <br />
              iz iskustva i sa pažnjom.
            </h1>

            <span>
              Od redovnih pregleda do hirurških zahvata — naš tim vodi računa
              o zdravlju pasa, mačaka i drugih ljubimaca kao o svojim.
            </span>
          </div>

          <img
            src="/shapa.png"
            alt="Šapa"
            className="hero-image"
          />
        </section>


        <section className="home-actions">

          <div className="action-box">
            <h2>Zakažite pregled odmah:</h2>

            <button onClick={() => navigate("/zakazivanje")}>
              Zakazivanje
            </button>
          </div>

          <div className="action-box">
            <h2>Saznajte više o ponudi:</h2>

            <button onClick={() => navigate("/usluge")}>
              Usluge
            </button>
          </div>

        </section>

      </main>

      <Footer />
    </div>
  );
}

export default Pocetna;