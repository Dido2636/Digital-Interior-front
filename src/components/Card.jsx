import React from "react";

function Card({ title, description, commentaire, imageMedia }) {
  return (
    <>
      <img className="img-card" src={`http://localhost:6789/${imageMedia}`} />
      <div className="box-infos">
        <h4 className="card-title">{title}</h4>
        <p className="card-description">{description}</p>
        <p className="card-description">{commentaire}</p>
        
      </div>
    </>
  );
}

export default Card;


