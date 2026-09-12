import { useState } from "react";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";

type Kategorija =
  | "Dijagnostika"
  | "Stomatologija i hirurgija"
  | "Preventiva i nega";

const usluge: Record<Kategorija, string[]> = {
  "Dijagnostika": [
    "Lab. analize - 30 min - 3500 RSD",
    "Ultrazvuk i rendgen - 45 min - 4500 RSD",
  ],

  "Stomatologija i hirurgija": [
    "Stomatološki pregled - 1h - 6000 RSD",
    "Sterilizacija - 90 min - 12000 RSD",
    "Hitna intervencija - 30 min - procena",
  ],

  "Preventiva i nega": [
    "Opšti pregled - 30 min - 1500 RSD",
    "Vakcinacija - 20 min - 2000 RSD",
    "Mikročipovanje - 15 min - 2500 RSD",
    "Trimovanje i nega dlake - 45 min - 2500 RSD",
  ],
};

const kategorije: Kategorija[] = [
  "Dijagnostika",
  "Stomatologija i hirurgija",
  "Preventiva i nega",
];

function Usluge() {
  const [aktivnaKategorija, setAktivnaKategorija] =
    useState<Kategorija | null>(null);

  return (
    <div className="usluge-page">
      <Header />

      <main className="usluge-content">
        <h1>Usluge koje nudimo</h1>

        <div className="kategorije">
          {kategorije.map((kategorija) => (
            <button
              key={kategorija}
              className={
                aktivnaKategorija === kategorija
                  ? "kategorija-btn aktivna"
                  : "kategorija-btn"
              }
              onClick={() => setAktivnaKategorija(kategorija)}
            >
              {kategorija}
            </button>
          ))}
        </div>

        {aktivnaKategorija && (
          <button
            className="sakrij-btn"
            onClick={() => setAktivnaKategorija(null)}
          >
            Sakrij usluge
          </button>
)}

        {aktivnaKategorija && (

          <>
            <p className="izabrana-kategorija">
              Izabrana kategorija: <strong>{aktivnaKategorija}</strong>
            </p>
          <div className="usluge-lista">
            <h2>{aktivnaKategorija}</h2>

            {usluge[aktivnaKategorija].map((usluga, index) => (
              <div className="usluga" key={index}>
                {usluga}
              </div>
            ))}
          </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Usluge;