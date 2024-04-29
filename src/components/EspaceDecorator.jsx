import React from "react";
import MediaUpload from "../components/MediaUpload"





function EspaceDecorator() {
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
       
      </main>
    </>
  );
}

export default EspaceDecorator;
