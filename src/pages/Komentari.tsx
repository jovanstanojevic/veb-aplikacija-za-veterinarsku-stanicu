import { useState } from "react";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import { KomentarManager } from "../models/KomentarManager";
import { IKomentarFilter } from "../models/IKomentarFilter";

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

const komentarFilter: IKomentarFilter = {
  filtriraj(tekst: string, pretraga: string): boolean {
    return tekst.toLowerCase().includes(pretraga.toLowerCase());
  },
};

function Komentari() {

    const [sortiranje, setSortiranje] = useState<"najstariji" | "najnoviji">(
        "najnoviji"
    );

    const [stranica, setStranica] = useState(1);
    const [pretraga, setPretraga] = useState("");
    const komentaraPoStranici = 2;

    const filtriraniKomentari = komentari.filter((komentar) =>
        komentarFilter.filtriraj(
            `${komentar.ime} ${komentar.tekst}`,
            pretraga
        )
    );

    const sortiraniKomentari = KomentarManager.sortirajPoDatumu(
        filtriraniKomentari,
        sortiranje === "najnoviji"
    );

    const ukupanBrojStranica = Math.ceil(
        sortiraniKomentari.length / komentaraPoStranici
    );

    const pocetak = (stranica - 1) * komentaraPoStranici;

    const prikazaniKomentari = sortiraniKomentari.slice(
        pocetak,
        pocetak + komentaraPoStranici
    );

  return (
    <div className="komentari-page">
      <Header />

      <main className="komentari-content">
        <h1>Komentari korisnika</h1>

        <div className="pretraga-komentara">
            <input
                type="text"
                placeholder="Pretraži komentare..."
                value={pretraga}
                onChange={(e) => {
                setPretraga(e.target.value);
                setStranica(1);
                }}
            />
        </div>

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
          {prikazaniKomentari.map((komentar, index) => (
            <div className="komentar" key={index}>
              <h3>{komentar.ime}</h3>
              <p>{komentar.tekst}</p>
              <small>{KomentarManager.formatDatum(komentar.datum)}</small>
            </div>
          ))}
        </div>

        <div className="paginacija">
            <button
                disabled={stranica === 1}
                onClick={() => setStranica(stranica - 1)}
            >
             Prethodna
            </button>

            <span>
                Stranica {stranica} od {ukupanBrojStranica}
            </span>

            <button
                disabled={stranica === ukupanBrojStranica}
                onClick={() => setStranica(stranica + 1)}
            >
                Sledeća
            </button>
        </div>

      </main>

      <Footer />
    </div>
  );
}

export default Komentari;