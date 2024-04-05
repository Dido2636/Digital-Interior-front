import React from "react";
import MediaUpload from "../components/MediaUpload"
import Footer from "../components/Footer"




function SpaceDecorator() {
  const decoratorData = JSON.parse(sessionStorage.getItem("decorator"));
  const userData = JSON.parse(sessionStorage.getItem("user"));
  return (
    <>
      <main>
        <section className="espace-deco">
          
      {userData || decoratorData ? (
        <MediaUpload/>
      
      ): null}
         
        </section>
        <Footer />
      </main>
    </>
  );
}

export default SpaceDecorator;
