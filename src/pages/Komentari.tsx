import { useState } from "react";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";

type Komentar = {
  ime: string;
  tekst: string;
  datum: string;
};

const komentari: Komentar[] = [
  {
    ime: "Marko",
    tekst: "Veoma ljubazno osoblje i odlična usluga.",
    datum: "2025-03-15",
  },
  {
    ime: "Ana",
    tekst: "Moj pas je dobio odličnu negu. Sve preporuke!",
    datum: "2025-06-10",
  },
  {
    ime: "Nikola",
    tekst: "Brzo zakazivanje i veoma profesionalni veterinari.",
    datum: "2025-09-22",
  },
  {
    ime: "Milica",
    tekst: "Veoma sam zadovoljna uslugom i pristupom prema ljubimcima.",
    datum: "2026-01-08",
  },
];

function Komentari() {
    const formatDatum = (datum: string) => {
    const [godina, mesec, dan] = datum.split("-");

    return `${dan}.${mesec}.${godina}.`;
    };

  const [sortiranje, setSortiranje] = useState<"najstariji" | "najnoviji">(
    "najnoviji"
  );

  const sortiraniKomentari = [...komentari].sort((a, b) => {
    const datumA = new Date(a.datum).getTime();
    const datumB = new Date(b.datum).getTime();

    if (sortiranje === "najstariji") {
      return datumA - datumB;
    }

    return datumB - datumA;
  });

  return (
    <div className="komentari-page">
      <Header />

      <main className="komentari-content">
        <h1>Komentari korisnika</h1>

        <div className="sortiranje">
          <button
            className={sortiranje === "najnoviji" ? "aktivno" : ""}
            onClick={() => setSortiranje("najnoviji")}
          >
            Najnoviji
          </button>

          <button
            className={sortiranje === "najstariji" ? "aktivno" : ""}
            onClick={() => setSortiranje("najstariji")}
          >
            Najstariji
          </button>
        </div>

        <div className="komentari-lista">
          {sortiraniKomentari.map((komentar, index) => (
            <div className="komentar" key={index}>
              <h3>{komentar.ime}</h3>
              <p>{komentar.tekst}</p>
              <small>{formatDatum(komentar.datum)}</small>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Komentari;