import { useState } from "react";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";

type Termin = {
  usluga: string;
  ljubimac: string;
  datum: string;
  vreme: string;
};

function Zakazivanje() {
  const [usluga, setUsluga] = useState("");
  const [ljubimac, setLjubimac] = useState("");
  const [datum, setDatum] = useState("");
  const [vreme, setVreme] = useState("");
  const [potvrda, setPotvrda] = useState<Termin | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!usluga || !ljubimac.trim() || !datum || !vreme) {
      alert("Molimo popunite sva polja.");
      return;
    }

    setPotvrda({
      usluga,
      ljubimac,
      datum,
      vreme,
    });
  };

  return (
    <div className="zakazivanje-page">
      <Header />

      <main className="zakazivanje-content">
        <h1>Zakazivanje pregleda</h1>

        <form className="zakazivanje-form" onSubmit={handleSubmit}>
          <div className="zakazivanje-grupa">
            <label>Usluga:</label>
            <select
              value={usluga}
              onChange={(e) => setUsluga(e.target.value)}
            >
              <option value="">Izaberite uslugu</option>
              <option value="Opšti pregled">Opšti pregled</option>
              <option value="Vakcinacija">Vakcinacija</option>
              <option value="Lab. analize">Lab. analize</option>
              <option value="Ultrazvuk i rendgen">
                Ultrazvuk i rendgen
              </option>
              <option value="Stomatološki pregled">
                Stomatološki pregled
              </option>
              <option value="Hitna intervencija">Hitna intervencija</option>
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

          <button type="submit" className="zakazi-btn">
            Zakaži pregled
          </button>
        </form>

        {potvrda && (
          <div className="potvrda">
            <h2>Termin je uspešno zakazan!</h2>

            <p>
              <strong>Usluga:</strong> {potvrda.usluga}
            </p>

            <p>
              <strong>Ljubimac:</strong> {potvrda.ljubimac}
            </p>

            <p>
              <strong>Datum:</strong> {potvrda.datum}
            </p>

            <p>
              <strong>Vreme:</strong> {potvrda.vreme}
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Zakazivanje;