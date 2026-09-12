import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";

function Profil() {
  return (
    <div className="profil-page">

      <Header />

      <main className="profil-content">

        <div className="profil-info">

          <img
            src="/public/profilna.png"
            alt="Profilna slika"
            className="profil-slika"
          />

          <div className="profil-podaci">
            <p><strong>Ime:</strong> Jovan</p>
            <p><strong>Prezime:</strong> Stanojevic</p>
            <p><strong>Email:</strong> js20220323@student.fon.bg.ac.rs</p>
            <p><strong>Starost:</strong> 23 godine</p>
          </div>

        </div>

      </main>

      <Footer />

    </div>
  );
}

export default Profil;