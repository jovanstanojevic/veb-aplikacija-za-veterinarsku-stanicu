import React, { useState, useMemo, useRef, useEffect} from "react";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Leaf,
  CheckCircle2,
  AlertCircle,
  X,
  Stethoscope,
  Syringe,
  Scissors,
  Microscope,
  ShieldPlus,
  Cross,
  PawPrint,
} from "lucide-react";

/* -------------------------------------------------------------------- */
/*  Podaci                                                              */
/* -------------------------------------------------------------------- */

const SERVICES = [
  {
    id: "pregled",
    grupa: "Preventiva i nega",
    naziv: "Opšti pregled",
    opis: "Redovna kontrola zdravlja, provera težine, srca i opšteg stanja ljubimca.",
    trajanje: 30,
    cena: 1500,
    Icon: Stethoscope,
  },
  {
    id: "vakcinacija",
    grupa: "Preventiva i nega",
    naziv: "Vakcinacija",
    opis: "Zaštita protiv besnila, parvovirusa i drugih zaraznih bolesti.",
    trajanje: 20,
    cena: 2000,
    Icon: Syringe,
  },
  {
    id: "mikrocip",
    grupa: "Preventiva i nega",
    naziv: "Mikročipovanje",
    opis: "Trajna identifikacija ljubimca, u skladu sa zakonskom obavezom.",
    trajanje: 15,
    cena: 2500,
    Icon: ShieldPlus,
  },
  {
    id: "trimovanje",
    grupa: "Preventiva i nega",
    naziv: "Trimovanje i nega dlake",
    opis: "Šišanje, kupanje i osnovna nega dlake i kandži.",
    trajanje: 45,
    cena: 2500,
    Icon: Scissors,
  },
  {
    id: "krv",
    grupa: "Dijagnostika",
    naziv: "Laboratorijske analize krvi",
    opis: "Kompletna krvna slika i biohemijski profil.",
    trajanje: 30,
    cena: 3500,
    Icon: Microscope,
  },
  {
    id: "uzv",
    grupa: "Dijagnostika",
    naziv: "Ultrazvučni i rendgen pregled",
    opis: "Snimanje unutrašnjih organa, zglobova i kostiju.",
    trajanje: 45,
    cena: 4500,
    Icon: Microscope,
  },
  {
    id: "stomatologija",
    grupa: "Stomatologija i hirurgija",
    naziv: "Stomatološki pregled i čišćenje kamenca",
    opis: "Uklanjanje kamenca i provera zdravlja zuba i desni.",
    trajanje: 60,
    cena: 6000,
    Icon: Cross,
  },
  {
    id: "kastracija",
    grupa: "Stomatologija i hirurgija",
    naziv: "Kastracija / sterilizacija",
    opis: "Hirurški zahvat uz punu anesteziju i postoperativnu negu.",
    trajanje: 90,
    cena: 12000,
    Icon: Cross,
  },
  {
    id: "hitno",
    grupa: "Stomatologija i hirurgija",
    naziv: "Hitna intervencija",
    opis: "Prijem i zbrinjavanje ljubimca u urgentnim slučajevima.",
    trajanje: 30,
    cena: null,
    Icon: AlertCircle,
  },
];

const GRUPE = [...new Set(SERVICES.map((s) => s.grupa))];

const UTISCI = [
  {
    vlasnik: "Milica Jovanović",
    ljubimac: "Reks",
    vrsta: "pas",
    emoji: "🐶",
    tekst:
      "Reks je imao problema sa kukovima i zahvaljujući pažljivom pristupu tima ponovo trči kao mladić.",
  },
  {
    vlasnik: "Nikola Petrović",
    ljubimac: "Luna",
    vrsta: "mačka",
    emoji: "🐱",
    tekst:
      "Vakcinacija je prošla brzo i bez stresa, Luna je ostala mirna tokom celog pregleda.",
  },
  {
    vlasnik: "Ana Simić",
    ljubimac: "Buca",
    vrsta: "papagaj",
    emoji: "🦜",
    tekst:
      "Retko se nađe veterinar koji dobro poznaje i ptice — konačno smo dobili jasne i konkretne odgovore.",
  },
  {
    vlasnik: "Marko Đorđević",
    ljubimac: "Bela",
    vrsta: "pas",
    emoji: "🐶",
    tekst:
      "Operacija je prošla odlično, a oporavak je bio brz zahvaljujući detaljnim uputstvima osoblja.",
  },
  {
    vlasnik: "Jovana Ristić",
    ljubimac: "Tom",
    vrsta: "mačka",
    emoji: "🐱",
    tekst:
      "Osoblje je strpljivo objasnilo svaki korak pregleda, pa se Tom osećao sigurno celo vreme.",
  },
  {
    vlasnik: "Stefan Kovač",
    ljubimac: "Miki",
    vrsta: "zec",
    emoji: "🐰",
    tekst:
      "Nije lako naći veterinara koji pregleda zeca — ovde su pravi profesionalci za egzotične ljubimce.",
  },
];

const RADNO_VREME = { pocetak: 8 * 60, kraj: 18 * 60 }; // u minutima od ponoći

/* -------------------------------------------------------------------- */
/*  Pomoćne funkcije                                                    */
/* -------------------------------------------------------------------- */

function formatCena(cena) {
  if (cena == null) return "po proceni";
  return cena.toLocaleString("sr-RS") + " RSD";
}

function formatTrajanje(min) {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m === 0 ? `${h} h` : `${h} h ${m} min`;
}

function vremeUMinute(vreme) {
  const [h, m] = vreme.split(":").map(Number);
  return h * 60 + m;
}

function danNedelje(datumStr) {
  // 0 = nedelja
  const [g, mm, d] = datumStr.split("-").map(Number);
  return new Date(g, mm - 1, d).getDay();
}

function danasIso() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function formatDatumSr(datumStr) {
  const [g, m, d] = datumStr.split("-");
  return `${d}.${m}.${g}.`;
}

/* -------------------------------------------------------------------- */
/*  Glavna komponenta                                                   */
/* -------------------------------------------------------------------- */

const TABS = [
  { key: "usluge", label: "Usluge" },
  { key: "komentari", label: "Komentari" },
  { key: "cenovnik", label: "Cenovnik" },
  { key: "zakazivanje", label: "Zakazivanje" },
];

export default function VeterinarskaStanica() {
  const [tab, setTab] = useState(
    () => sessionStorage.getItem("vet-app-tab") || "usluge"
  );

  useEffect(() => {
    sessionStorage.setItem("vet-app-tab", tab);
  }, [tab]);

  return (
    <div className="vet-app">
      <GlobalStyles />
      <Header tab={tab} setTab={setTab} />
      <main>
        {tab === "usluge" && <UslugePage setTab={setTab} />}
        {tab === "komentari" && <KomentariPage />}
        {tab === "cenovnik" && <CenovnikPage setTab={setTab} />}
        {tab === "zakazivanje" && <ZakazivanjePage />}
      </main>
      <Footer />
    </div>
  );
}

/* -------------------------------------------------------------------- */
/*  Header / navigacija                                                 */
/* -------------------------------------------------------------------- */

function Header({ tab, setTab }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="brand">
          <PawPrint size={26} strokeWidth={2} />
          <span className="brand-name">Dobra Šapa</span>
          <span className="brand-tag">veterinarska stanica</span>
        </div>
        <nav className="tabs" aria-label="Glavna navigacija">
          {TABS.map((t) => (
            <button
              key={t.key}
              className={"tab" + (tab === t.key ? " tab-active" : "")}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------- */
/*  Stranica: Usluge                                                    */
/* -------------------------------------------------------------------- */

function UslugePage({ setTab }) {
  return (
    <div className="page">
      <section className="hero">
        <div className="hero-text">
          <p className="eyebrow-leaf">
            <Leaf size={16} /> otvoreno svakog dana osim nedelje
          </p>
          <h1>
            Briga o vašem ljubimcu, iz iskustva i sa pažnjom.
          </h1>
          <p className="hero-sub">
            Od redovnih pregleda do hirurških zahvata — naš tim vodi računa
            o zdravlju pasa, mačaka i drugih ljubimaca kao o svojim.
          </p>
          <button className="btn-primary" onClick={() => setTab("zakazivanje")}>
            Zakažite termin
          </button>
        </div>
        <HeroArt />
      </section>

      {GRUPE.map((grupa) => (
        <section className="service-group" key={grupa}>
          <h2>{grupa}</h2>
          <div className="menu-list">
            {SERVICES.filter((s) => s.grupa === grupa).map((s) => (
              <div className="menu-row" key={s.id}>
                <div className="menu-icon">
                  <s.Icon size={20} strokeWidth={1.75} />
                </div>
                <div className="menu-main">
                  <div className="menu-title-row">
                    <h3>{s.naziv}</h3>
                    <span className="menu-duration">
                      <Clock size={13} /> {formatTrajanje(s.trajanje)}
                    </span>
                  </div>
                  <p>{s.opis}</p>
                </div>
                <div className="menu-price">{formatCena(s.cena)}</div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function HeroArt() {
  return (
    <svg
      className="hero-art"
      viewBox="0 0 260 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="130" cy="110" r="95" fill="var(--accent-soft)" />
      <path
        d="M40 130 L85 130 L100 105 L112 150 L124 90 L138 130 L220 130"
        stroke="var(--primary)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <g stroke="var(--primary)" strokeWidth="3" fill="none" strokeLinecap="round">
        <ellipse cx="150" cy="55" rx="9" ry="12" transform="rotate(-15 150 55)" />
        <ellipse cx="172" cy="48" rx="9" ry="12" transform="rotate(5 172 48)" />
        <ellipse cx="188" cy="62" rx="8" ry="11" transform="rotate(25 188 62)" />
        <ellipse cx="132" cy="70" rx="8" ry="11" transform="rotate(-35 132 70)" />
        <ellipse cx="165" cy="75" rx="16" ry="14" />
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------- */
/*  Stranica: Komentari                                                 */
/* -------------------------------------------------------------------- */

function KomentariPage() {
  return (
    <div className="page">
      <section className="page-intro">
        <h1>Utisci vlasnika i njihovih ljubimaca</h1>
        <p className="hero-sub">
          Nekoliko redova od porodica koje su nam poverile svoje ljubimce.
        </p>
      </section>
      <section className="notes-grid">
        {UTISCI.map((u, i) => (
          <article className="note" key={i}>
            <span className="note-quote-mark">”</span>
            <p className="note-text">{u.tekst}</p>
            <div className="note-footer">
              <span className="note-pet-emoji">{u.emoji}</span>
              <div>
                <div className="note-name">{u.ljubimac}</div>
                <div className="note-owner">vlasnik: {u.vlasnik}</div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------- */
/*  Stranica: Cenovnik                                                  */
/* -------------------------------------------------------------------- */

function CenovnikPage({ setTab }) {
  return (
    <div className="page">
      <section className="page-intro">
        <h1>Cenovnik usluga</h1>
        <p className="hero-sub">
          Sve cene su izražene u dinarima (RSD) i uključuju materijal potreban
          za izvođenje usluge.
        </p>
      </section>
      <section className="price-table">
        <div className="price-head">
          <span>Usluga</span>
          <span>Trajanje</span>
          <span>Cena</span>
        </div>
        {SERVICES.map((s) => (
          <div className="price-row" key={s.id}>
            <span className="price-name">{s.naziv}</span>
            <span className="price-duration">{formatTrajanje(s.trajanje)}</span>
            <span className="price-value">{formatCena(s.cena)}</span>
          </div>
        ))}
      </section>
      <button className="btn-primary" onClick={() => setTab("zakazivanje")}>
        Zakažite termin
      </button>
    </div>
  );
}

/* -------------------------------------------------------------------- */
/*  Stranica: Zakazivanje                                               */
/* -------------------------------------------------------------------- */

const PRAZNA_FORMA = {
  vlasnik: "",
  telefon: "",
  ljubimac: "",
  vrstaLjubimca: "pas",
  usluga: SERVICES[0].id,
  datum: "",
  vreme: "",
};

function ZakazivanjePage() {
  const [forma, setForma] = useState(PRAZNA_FORMA);
  const [termini, setTermini] = useState([]); // pamti se samo dok traje sesija
  const [greska, setGreska] = useState("");
  const [poruka, setPoruka] = useState("");
  const poljaRef = useRef(null);

  const izabranaUsluga = SERVICES.find((s) => s.id === forma.usluga);

  function izmeniPolje(polje, vrednost) {
    setForma((f) => ({ ...f, [polje]: vrednost }));
  }

  function potvrdiTermin(e) {
    e.preventDefault();
    setPoruka("");

    if (!forma.vlasnik.trim() || !forma.telefon.trim() || !forma.ljubimac.trim()) {
      setGreska("Popunite ime, telefon i ime ljubimca.");
      return;
    }
    if (!forma.datum || !forma.vreme) {
      setGreska("Izaberite datum i vreme termina.");
      return;
    }
    if (forma.datum < danasIso()) {
      setGreska("Ne možete zakazati termin u prošlosti.");
      return;
    }
    if (danNedelje(forma.datum) === 0) {
      setGreska("Nedeljom ne radimo — izaberite drugi dan.");
      return;
    }

    const pocetak = vremeUMinute(forma.vreme);
    const kraj = pocetak + izabranaUsluga.trajanje;

    if (pocetak < RADNO_VREME.pocetak || kraj > RADNO_VREME.kraj) {
      setGreska("Radno vreme je od 08:00 do 18:00 — izaberite vreme u tom okviru.");
      return;
    }

    const preklapanje = termini.find((t) => {
      if (t.datum !== forma.datum) return false;
      const tUsluga = SERVICES.find((s) => s.id === t.usluga);
      const tPocetak = vremeUMinute(t.vreme);
      const tKraj = tPocetak + tUsluga.trajanje;
      return pocetak < tKraj && tPocetak < kraj;
    });

    if (preklapanje) {
      const tUsluga = SERVICES.find((s) => s.id === preklapanje.usluga);
      setGreska(
        `Termin se poklapa sa već zakazanom uslugom "${tUsluga.naziv}" za ljubimca ${preklapanje.ljubimac} u ${preklapanje.vreme}. Izaberite drugo vreme.`
      );
      return;
    }

    const novi = { ...forma, id: Date.now() };
    setTermini((prev) =>
      [...prev, novi].sort((a, b) =>
        a.datum === b.datum ? a.vreme.localeCompare(b.vreme) : a.datum.localeCompare(b.datum)
      )
    );
    setGreska("");
    setPoruka(
      `Termin je zakazan — ${izabranaUsluga.naziv} za ${forma.ljubimac}, ${formatDatumSr(
        forma.datum
      )} u ${forma.vreme}.`
    );
    setForma((f) => ({ ...PRAZNA_FORMA, datum: f.datum }));
  }

  function otkaziTermin(id) {
    setTermini((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="page">
      <section className="page-intro">
        <h1>Zakazivanje termina</h1>
        <p className="hero-sub">
          Popunite formu ispod. Termini se čuvaju samo tokom trenutne sesije
          i dve usluge ne mogu biti zakazane u istom vremenskom periodu.
        </p>
      </section>

      <div className="booking-layout">
        <form className="booking-form" onSubmit={potvrdiTermin} ref={poljaRef}>
          {greska && (
            <div className="alert alert-error">
              <AlertCircle size={18} />
              <span>{greska}</span>
              <button
                type="button"
                className="alert-close"
                onClick={() => setGreska("")}
                aria-label="Zatvori poruku"
              >
                <X size={16} />
              </button>
            </div>
          )}
          {poruka && (
            <div className="alert alert-success">
              <CheckCircle2 size={18} />
              <span>{poruka}</span>
              <button
                type="button"
                className="alert-close"
                onClick={() => setPoruka("")}
                aria-label="Zatvori poruku"
              >
                <X size={16} />
              </button>
            </div>
          )}

          <div className="field-row">
            <label>
              <span><User size={14} /> Ime i prezime vlasnika</span>
              <input
                type="text"
                value={forma.vlasnik}
                onChange={(e) => izmeniPolje("vlasnik", e.target.value)}
                placeholder="npr. Milica Jovanović"
              />
            </label>
            <label>
              <span><Phone size={14} /> Telefon</span>
              <input
                type="tel"
                value={forma.telefon}
                onChange={(e) => izmeniPolje("telefon", e.target.value)}
                placeholder="npr. 060 123 4567"
              />
            </label>
          </div>

          <div className="field-row">
            <label>
              <span><PawPrint size={14} /> Ime ljubimca</span>
              <input
                type="text"
                value={forma.ljubimac}
                onChange={(e) => izmeniPolje("ljubimac", e.target.value)}
                placeholder="npr. Reks"
              />
            </label>
            <label>
              <span>Vrsta ljubimca</span>
              <select
                value={forma.vrstaLjubimca}
                onChange={(e) => izmeniPolje("vrstaLjubimca", e.target.value)}
              >
                <option value="pas">Pas</option>
                <option value="mačka">Mačka</option>
                <option value="ptica">Ptica</option>
                <option value="zec">Zec</option>
                <option value="drugo">Drugo</option>
              </select>
            </label>
          </div>

          <label className="field-full">
            <span>Usluga</span>
            <select
              value={forma.usluga}
              onChange={(e) => izmeniPolje("usluga", e.target.value)}
            >
              {SERVICES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.naziv} — {formatTrajanje(s.trajanje)} — {formatCena(s.cena)}
                </option>
              ))}
            </select>
          </label>

          <div className="field-row">
            <label>
              <span><Calendar size={14} /> Datum</span>
              <input
                type="date"
                min={danasIso()}
                value={forma.datum}
                onChange={(e) => izmeniPolje("datum", e.target.value)}
              />
            </label>
            <label>
              <span><Clock size={14} /> Vreme</span>
              <input
                type="time"
                step="900"
                min="08:00"
                max="18:00"
                value={forma.vreme}
                onChange={(e) => izmeniPolje("vreme", e.target.value)}
              />
            </label>
          </div>

          <p className="form-note">
            Radno vreme: pon–sub, 08:00–18:00. Izabrana usluga traje{" "}
            {formatTrajanje(izabranaUsluga.trajanje)}.
          </p>

          <button type="submit" className="btn-primary btn-full">
            Zakaži termin
          </button>
        </form>

        <aside className="booking-list">
          <h2>Zakazani termini u ovoj sesiji</h2>
          {termini.length === 0 ? (
            <p className="empty-state">
              Još nema zakazanih termina. Popunite formu da biste zakazali prvi.
            </p>
          ) : (
            <ul>
              {termini.map((t) => {
                const usluga = SERVICES.find((s) => s.id === t.usluga);
                return (
                  <li key={t.id} className="ticket">
                    <div className="ticket-main">
                      <div className="ticket-service">{usluga.naziv}</div>
                      <div className="ticket-meta">
                        {formatDatumSr(t.datum)} u {t.vreme} ·{" "}
                        {formatTrajanje(usluga.trajanje)}
                      </div>
                      <div className="ticket-owner">
                        {t.ljubimac} ({t.vrstaLjubimca}) — {t.vlasnik}
                      </div>
                    </div>
                    <button
                      className="ticket-cancel"
                      onClick={() => otkaziTermin(t.id)}
                      aria-label="Otkaži termin"
                    >
                      Otkaži
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </aside>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- */
/*  Footer                                                               */
/* -------------------------------------------------------------------- */

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div className="brand brand-footer">
            <PawPrint size={20} />
            <span className="brand-name">Dobra Šapa</span>
          </div>
          <p>Veterinarska stanica za pse, mačke i ostale ljubimce.</p>
        </div>
        <div>
          <h4>Kontakt</h4>
          <p>Ulica Vojvode Mišića 14, Niš</p>
          <p>060 456 7890</p>
        </div>
        <div>
          <h4>Radno vreme</h4>
          <p>Pon – Sub: 08:00–18:00</p>
          <p>Nedelja: ne radimo</p>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------- */
/*  Stilovi                                                              */
/* -------------------------------------------------------------------- */

function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..600&family=Inter:wght@400;500;600&display=swap');

      html, body, #root {
        margin: 0;
        padding: 0;
        width: 100%;
        min-height: 100%;
        background: #F5F2E8;
      }

      .vet-app {
        --bg: #F5F2E8;
        --surface: #FFFFFF;
        --ink: #1E2B24;
        --ink-soft: #4A5750;
        --primary: #2F4B3C;
        --primary-light: #4C6B58;
        --accent: #E2A63B;
        --accent-soft: #F3D9A6;
        --line: #DAD3C0;
        --error: #A8433D;
        --error-bg: #F7E7E4;
        --success-bg: #E7EFE3;

        background: var(--bg);
        color: var(--ink);
        font-family: 'Inter', sans-serif;
        line-height: 1.5;
        min-height: 100vh;
      }

      .vet-app * { box-sizing: border-box; }

      .vet-app h1, .vet-app h2, .vet-app h3 {
        font-family: 'Fraunces', serif;
        color: var(--primary);
        margin: 0;
        font-weight: 600;
      }

      .vet-app button, .vet-app input, .vet-app select {
        font-family: 'Inter', sans-serif;
      }

      .vet-app :focus-visible {
        outline: 2px solid var(--primary);
        outline-offset: 2px;
      }

      /* Header */
      .header {
        background: var(--primary);
        position: sticky;
        top: 0;
        z-index: 10;
      }
      .header-inner {
        max-width: 1040px;
        margin: 0 auto;
        padding: 16px 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 12px;
        color: #F5F2E8;
      }
      .brand {
        display: flex;
        align-items: baseline;
        gap: 8px;
      }
      .brand-name {
        font-family: 'Fraunces', serif;
        font-size: 21px;
        font-weight: 600;
        color: #FDF9EE;
      }
      .brand-tag {
        font-size: 13px;
        color: var(--accent-soft);
      }
      .tabs {
        display: flex;
        gap: 4px;
        flex-wrap: wrap;
      }
      .tab {
        background: transparent;
        border: none;
        color: #E7E2CF;
        font-size: 14px;
        padding: 8px 14px;
        border-radius: 6px;
        cursor: pointer;
        transition: background 0.15s ease, color 0.15s ease;
      }
      .tab:hover { background: rgba(255,255,255,0.08); color: #fff; }
      .tab-active {
        background: var(--accent);
        color: var(--primary);
        font-weight: 600;
      }
      .tab-active:hover { background: var(--accent); color: var(--primary); }

      .page {
        max-width: 1040px;
        margin: 0 auto;
        padding: 48px 24px 72px;
      }

      /* Hero */
      .hero {
        display: flex;
        align-items: center;
        gap: 48px;
        margin-bottom: 56px;
      }
      .hero-text { flex: 1.2; min-width: 280px; }
      .eyebrow-leaf {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        color: var(--primary-light);
        font-size: 14px;
        margin: 0 0 14px;
      }
      .hero h1 {
        font-size: 40px;
        line-height: 1.15;
        max-width: 480px;
        margin-bottom: 18px;
      }
      .hero-sub {
        font-size: 16px;
        color: var(--ink-soft);
        max-width: 460px;
        margin-bottom: 26px;
      }
      .hero-art {
        flex: 1;
        max-width: 260px;
        min-width: 180px;
        height: auto;
      }

      .btn-primary {
        background: var(--primary);
        color: #FDF9EE;
        border: none;
        padding: 13px 26px;
        font-size: 15px;
        font-weight: 600;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.15s ease, transform 0.1s ease;
      }
      .btn-primary:hover { background: var(--primary-light); }
      .btn-primary:active { transform: translateY(1px); }
      .btn-full { width: 100%; }

      /* Usluge - menu list */
      .service-group { margin-bottom: 40px; }
      .service-group h2 {
        font-size: 22px;
        margin-bottom: 4px;
      }
      .menu-list {
        border-top: 1px solid var(--line);
        margin-top: 16px;
      }
      .menu-row {
        display: flex;
        gap: 16px;
        align-items: flex-start;
        padding: 20px 0;
        border-bottom: 1px solid var(--line);
      }
      .menu-icon {
        color: var(--primary);
        background: var(--accent-soft);
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .menu-main { flex: 1; min-width: 0; }
      .menu-title-row {
        display: flex;
        align-items: baseline;
        gap: 12px;
        flex-wrap: wrap;
      }
      .menu-title-row h3 { font-size: 17px; }
      .menu-duration {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        font-size: 13px;
        color: var(--ink-soft);
      }
      .menu-main p {
        margin: 6px 0 0;
        font-size: 14px;
        color: var(--ink-soft);
        max-width: 560px;
      }
      .menu-price {
        font-family: 'Fraunces', serif;
        font-weight: 600;
        font-size: 16px;
        color: var(--primary);
        white-space: nowrap;
        padding-top: 2px;
      }

      /* Page intro (komentari, cenovnik, zakazivanje) */
      .page-intro { margin-bottom: 40px; max-width: 620px; }
      .page-intro h1 { font-size: 32px; margin-bottom: 10px; }

      /* Komentari */
      .notes-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 20px;
      }
      .note {
        background: var(--surface);
        border: 1px solid var(--line);
        border-radius: 10px;
        padding: 24px 22px 20px;
        position: relative;
      }
      .note-quote-mark {
        font-family: 'Fraunces', serif;
        font-size: 40px;
        color: var(--accent);
        line-height: 0;
        display: block;
        margin-bottom: 8px;
      }
      .note-text {
        font-size: 15px;
        color: var(--ink);
        margin: 0 0 18px;
      }
      .note-footer {
        display: flex;
        align-items: center;
        gap: 10px;
        border-top: 1px solid var(--line);
        padding-top: 14px;
      }
      .note-pet-emoji { font-size: 22px; }
      .note-name { font-weight: 600; font-size: 14px; }
      .note-owner { font-size: 13px; color: var(--ink-soft); }

      /* Cenovnik */
      .price-table { margin-bottom: 32px; }
      .price-head, .price-row {
        display: grid;
        grid-template-columns: 1fr 110px 130px;
        gap: 12px;
        align-items: center;
        padding: 14px 4px;
      }
      .price-head {
        border-bottom: 2px solid var(--primary);
        font-size: 13px;
        color: var(--primary-light);
        font-weight: 600;
      }
      .price-row { border-bottom: 1px solid var(--line); }
      .price-name { font-size: 15px; }
      .price-duration { font-size: 14px; color: var(--ink-soft); }
      .price-value {
        font-family: 'Fraunces', serif;
        font-weight: 600;
        color: var(--accent);
        text-align: right;
      }
      @media (max-width: 560px) {
        .price-head, .price-row { grid-template-columns: 1fr 80px; }
        .price-duration { display: none; }
      }

      /* Zakazivanje */
      .booking-layout {
        display: grid;
        grid-template-columns: 1.3fr 1fr;
        gap: 32px;
        align-items: start;
      }
      @media (max-width: 780px) {
        .booking-layout { grid-template-columns: 1fr; }
      }
      .booking-form {
        background: var(--surface);
        border: 1px solid var(--line);
        border-radius: 12px;
        padding: 28px;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .field-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 14px;
      }
      @media (max-width: 480px) {
        .field-row { grid-template-columns: 1fr; }
      }
      .booking-form label {
        display: flex;
        flex-direction: column;
        gap: 6px;
        font-size: 13px;
        color: var(--ink-soft);
      }
      .booking-form label span {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        font-weight: 500;
      }
      .field-full { width: 100%; }
      .booking-form input, .booking-form select {
        border: 1px solid var(--line);
        border-radius: 7px;
        padding: 10px 12px;
        font-size: 14px;
        color: var(--ink);
        background: var(--bg);
      }
      .booking-form input:focus, .booking-form select:focus {
        border-color: var(--primary);
      }
      .form-note {
        font-size: 13px;
        color: var(--ink-soft);
        margin: 0;
      }

      .alert {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        padding: 12px 14px;
        border-radius: 8px;
        font-size: 14px;
      }
      .alert span { flex: 1; }
      .alert-error { background: var(--error-bg); color: var(--error); }
      .alert-success { background: var(--success-bg); color: var(--primary); }
      .alert-close {
        background: none;
        border: none;
        cursor: pointer;
        color: inherit;
        display: flex;
        padding: 0;
      }

      .booking-list h2 {
        font-size: 19px;
        margin-bottom: 16px;
      }
      .empty-state {
        font-size: 14px;
        color: var(--ink-soft);
        border: 1px dashed var(--line);
        border-radius: 10px;
        padding: 20px;
      }
      .booking-list ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .ticket {
        background: var(--surface);
        border: 1px solid var(--line);
        border-left: 4px solid var(--accent);
        border-radius: 8px;
        padding: 14px 16px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 10px;
      }
      .ticket-service { font-weight: 600; font-size: 14px; }
      .ticket-meta { font-size: 12.5px; color: var(--ink-soft); margin-top: 2px; }
      .ticket-owner { font-size: 12.5px; color: var(--ink-soft); margin-top: 2px; }
      .ticket-cancel {
        background: none;
        border: 1px solid var(--line);
        color: var(--error);
        font-size: 12.5px;
        padding: 6px 10px;
        border-radius: 6px;
        cursor: pointer;
        white-space: nowrap;
      }
      .ticket-cancel:hover { background: var(--error-bg); }

      /* Footer */
      .footer {
        background: var(--primary);
        color: #E7E2CF;
        margin-top: 40px;
      }
      .footer-inner {
        max-width: 1040px;
        margin: 0 auto;
        padding: 40px 24px;
        display: grid;
        grid-template-columns: 1.4fr 1fr 1fr;
        gap: 24px;
      }
      @media (max-width: 640px) {
        .footer-inner { grid-template-columns: 1fr; }
      }
      .footer h4 {
        font-family: 'Fraunces', serif;
        color: #FDF9EE;
        font-size: 15px;
        margin: 0 0 8px;
      }
      .footer p { font-size: 13.5px; margin: 4px 0; color: #D8D2BC; }
      .brand-footer { margin-bottom: 8px; }
      .brand-footer .brand-name { font-size: 17px; }
    `}</style>
  );
}
