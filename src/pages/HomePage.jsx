import React from "react";
import { useAuth } from "../context/AuthContext";





function HomePage() {
  const { currentUser } = useAuth();
  return (
    <div>

      <main>

      <section className="imageHome-page">
       
      {currentUser ? `Connecté en tant que ${currentUser.name}` : HomePage}
     

      </section>

     

      
      

<br />
      
      
<br />

</main>

    </div>
  );
}

export default HomePage;
