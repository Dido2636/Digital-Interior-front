import React from "react";

function Card({ mediaType, title, description }) {
  return (
    <>
      <img className="img-card" src={`http://localhost:6789/${mediaType}`} />
<div className="box-infos"> 
      <h4 className="card-title">{title}</h4>
      <p className="card-description">{description}</p></div>
    </>
  );
}

export default Card;
