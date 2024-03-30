import React from "react";
import MediaUpload from "../components/MediaUpload"


function SpaceDecorator() {
  const decoratorData = JSON.parse(sessionStorage.getItem("decorator"));
  const userData = JSON.parse(sessionStorage.getItem("user"));
  return (
    <>
      <main>
        <section>
          
      {userData || decoratorData ? (
        <MediaUpload/>
      ): null}
         
        </section>
      </main>
    </>
  );
}

export default SpaceDecorator;
