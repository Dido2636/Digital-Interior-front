import React from "react";
import { useAuth } from "../context/AuthContext";


function HomePage() {
  const { currentUser } = useAuth();
  return (
    <div>
      <main>
        <section className="imageHome-page">
          {/* {currentUser ? `Connecté en tant que ${currentUser.name}` : HomePage} */}

          <div className=".container-bienvenue">
            <h3 className="card-bienvenue">
              Bienvenue <br />
              sur votre espace <br />
              de deco digital
            </h3>
          </div>
        </section>

       
        
      </main>
    </div>
  );
}

export default HomePage;
