# HealthyPaw 🐾

HealthyPaw je web aplikacija namenjena veterinarskoj stanici. 
Aplikacija omogućava korisnicima da pregledaju usluge veterinarske stanice, zakažu termin, pregledaju komentare drugih korisnika i upravljaju osnovnim funkcijama svog naloga.

## Opis projekta

Cilj projekta je izrada jednostavne i pregledne web aplikacije za veterinarsku stanicu koja korisnicima omogućava lakšu komunikaciju sa veterinarskom službom i jednostavno zakazivanje termina.

Aplikacija je razvijena korišćenjem React biblioteke, Vite alata, JavaScript-a i TypeScript-a.

Interfejs je prilagođen različitim veličinama ekrana i može se koristiti na računarima, tabletima i mobilnim uređajima.

---

## Pokretanje na lokalnoj masini

### 1. git clone https://github.com/jovanstanojevic/veb-aplikacija-za-veterinarsku-stanicu
### 2. cd my-react-app
### 3. npm install
### 4. npm run dev
### 5. dobijenu adresu (npr. http://localhost:5173) otvoriti u brauzeru

## Funkcionalnosti projekta

HealthyPaw sadrži sledeće funkcionalnosti:

- Registracija korisnika
- Prijava korisnika
- Početna stranica sa informacijama o veterinarskoj stanici
- Pregled korisničkog profila
- Pregled veterinarskih usluga
- Filtriranje usluga po kategorijama
- Zakazivanje veterinarskog termina
- Provera da li je termin već zauzet
- Validacija podataka prilikom zakazivanja
- Prikaz zakazanih termina
- Otkazivanje zakazanog termina
- Prikaz ukupnog broja zakazanih termina
- Pregled komentara korisnika
- Sortiranje komentara po datumu
- Pretraga i filtriranje komentara
- Paginacija komentara
- Formatiranje datuma
- Potvrda korisnika prilikom odjavljivanja
- Responzivan prikaz stranica
- Korišćenje reusable React komponenti
- Korišćenje TypeScript klasa i interfejsa

---

## Stranice aplikacije

Aplikacija sadrži sledeće stranice:

### 1. Prijava

Korisnik može da unese svoje podatke i pristupi aplikaciji.

### 2. Registracija

Omogućena je registracija novog korisnika.

### 3. Početna stranica

Prikazane su osnovne informacije o veterinarskoj stanici HealthyPaw i ponuđenim uslugama.

### 4. Profil

Korisnik može da pregleda osnovne informacije svog profila.

### 5. Usluge

Prikazane su veterinarske usluge organizovane po kategorijama:

- Dijagnostika
- Stomatologija i hirurgija
- Preventiva i nega

Klikom na kategoriju prikazuju se usluge koje pripadaju izabranoj kategoriji.

### 6. Zakazivanje

Korisnik može da izabere uslugu, unese ime ljubimca, datum i vreme termina.

Aplikacija proverava da li su sva polja popunjena i da li je termin već zauzet.

Korisnik takođe može da otkaže prethodno zakazani termin.

### 7. Komentari

Korisnik može da pregleda komentare drugih korisnika.

Komentari mogu da se:

- sortiraju od najnovijih ka najstarijim
- sortiraju od najstarijih ka najnovijim
- filtriraju pomoću pretrage
- pregledaju kroz više stranica pomoću paginacije

---

## Tehnologije

Projekat je izrađen korišćenjem sledećih tehnologija:

- React
- Vite
- JavaScript
- TypeScript
- JSX / TSX
- HTML
- CSS
- React Router
- Git
- GitHub

---

## Struktura projekta

Glavna struktura projekta:

```text
HealthyPaw/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Buttno.jsx
│   │
│   ├── models/
│   │   ├── TerminManager.ts
│   │   ├── KomentarManager.ts
│   │   ├── IValidator.ts
│   │   └── IKomentarFilter.ts
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Pocetna.jsx
│   │   ├── Profil.jsx
│   │   ├── Usluge.tsx
│   │   ├── Zakazivanje.tsx
│   │   └── Komentari.tsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── package-lock.json
├── vite.config.js
├── eslint.config.js
└── README.md
