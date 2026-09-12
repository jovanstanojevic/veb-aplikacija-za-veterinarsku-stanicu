import { useState } from "react";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import { TerminManager } from "../models/TerminManager";
import { validator } from "../models/IValidator";

type Termin = {
  usluga: string;
  ljubimac: string;
  datum: string;
  vreme: string;
};

const SACUVANI_TERMINI = "zakazaniTermini";

function Zakazivanje() {
  const [usluga, setUsluga] = useState("");
  const [ljubimac, setLjubimac] = useState("");
  const [datum, setDatum] = useState("");
  const [vreme, setVreme] = useState("");
  const danas = new Date().toISOString().split("T")[0];

  const [termini, setTermini] = useState<Termin[]>(() => {
    const sacuvano = sessionStorage.getItem(SACUVANI_TERMINI);

    if (!sacuvano) {
      return [];
    }

    return JSON.parse(sacuvano);
  });

  const [poruka, setPoruka] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!usluga || !ljubimac.trim() || !datum || !vreme) {
      setPoruka("Molimo popunite sva polja.");
      return;
    }

    if (!validator.validanTekst(ljubimac)) {
        setPoruka("Ime ljubimca mora imati najmanje 2 karaktera.");
        return;
    }

    // Provera da li je termin već zauzet
    const terminZauzet = TerminManager.terminJeZauzet(
        termini,
        datum,
        vreme
    );

    if (terminZauzet) {
      setPoruka(
        "Termin u ovom vremenskom periodu je već zauzet. Izaberite drugo vreme."
      );
      return;
    }

    const noviTermin: Termin = {
      usluga,
      ljubimac: ljubimac.trim(),
      datum,
      vreme,
    };

    const noviTermini = [...termini, noviTermin];

    setTermini(noviTermini);

    // Pamti termine samo do kraja sesije
    sessionStorage.setItem(
      SACUVANI_TERMINI,
      JSON.stringify(noviTermini)
    );

    setPoruka("Termin je uspešno zakazan!");

    // Čišćenje forme
    setUsluga("");
    setLjubimac("");
    setDatum("");
    setVreme("");
  };

  return (
    <div className="zakazivanje-page">
      <Header />

      <main className="zakazivanje-content">
        <h1>Zakazivanje pregleda</h1>

        <form
          className="zakazivanje-form"
          onSubmit={handleSubmit}
        >
          <div className="zakazivanje-grupa">
            <label>Usluga:</label>

            <select
              value={usluga}
              onChange={(e) => setUsluga(e.target.value)}
            >
              <option value="">Izaberite uslugu</option>
              <option value="Opšti pregled">Opšti pregled</option>
              <option value="Vakcinacija">Vakcinacija</option>
              <option value="Mikročipovanje">Mikročipovanje</option>
              <option value="Trimovanje i nega dlake">
                Trimovanje i nega dlake
              </option>
              <option value="Lab. analize">Lab. analize</option>
              <option value="Ultrazvuk i rendgen">
                Ultrazvuk i rendgen
              </option>
              <option value="Stomatološki pregled">
                Stomatološki pregled
              </option>
              <option value="Sterilizacija">Sterilizacija</option>
              <option value="Hitna intervencija">
                Hitna intervencija
              </option>
            </select>
          </div>

          <div className="zakazivanje-grupa">
            <label>Ime ljubimca:</label>

            <input
              type="text"
              placeholder="Unesite ime ljubimca"
              value={ljubimac}
              onChange={(e) => setLjubimac(e.target.value)}
            />
          </div>

          <div className="zakazivanje-grupa">
            <label>Datum:</label>

            <input
              type="date"
              min={danas}
              value={datum}
              onChange={(e) => setDatum(e.target.value)}
            />
          </div>

          <div className="zakazivanje-grupa">
            <label>Vreme:</label>

            <select
              value={vreme}
              onChange={(e) => setVreme(e.target.value)}
            >
              <option value="">Izaberite vreme</option>
              <option value="08:00">08:00</option>
              <option value="09:00">09:00</option>
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="12:00">12:00</option>
              <option value="13:00">13:00</option>
              <option value="14:00">14:00</option>
              <option value="15:00">15:00</option>
              <option value="16:00">16:00</option>
              <option value="17:00">17:00</option>
            </select>
          </div>

          <button
            type="submit"
            className="zakazi-btn"
          >
            Zakaži pregled
          </button>

          {poruka && (
            <p className="zakazivanje-poruka">
              {poruka}
            </p>
          )}
        </form>

        {/* ZAKAZANI TERMINI */}
        <section className="zakazani-termini">
          <h2>Zakazani termini</h2>

        <p>
            Ukupno zakazanih termina: {termini.length}
        </p>

          {termini.length === 0 ? (
            <p className="nema-termina">
              Trenutno nema zakazanih termina.
            </p>
          ) : (
            termini.map((termin, index) => (
              <div
                className="termin"
                key={`${termin.datum}-${termin.vreme}-${index}`}
              >
                <h3>{termin.usluga}</h3>

                <p>
                  <strong>Ljubimac:</strong>{" "}
                  {termin.ljubimac}
                </p>

                <p>
                  <strong>Datum:</strong>{" "}
                  {TerminManager.formatDatum(termin.datum)}
                </p>

                <p>
                  <strong>Vreme:</strong>{" "}
                  {termin.vreme}
                </p>
                <button
                    type="button"
                    onClick={() => {
                    const potvrda = window.confirm(
                    "Da li ste sigurni da želite da otkažete ovaj termin?"
                    );

                    if (potvrda) {
                        setTermini(termini.filter((_, i) => i !== index));
                    }
                }}
                >
                    Otkaži termin
                </button>
              </div>
            ))
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Zakazivanje;