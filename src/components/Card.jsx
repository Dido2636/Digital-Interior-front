import React from "react";

function Card({ mediaType, title, description, viewUrl }) {
  return (
    <>
      <img className="card-img" src={mediaType} />
      <h4 className="card-title">{title}</h4>
      <p className="card-description">{description}</p>
      <button href={viewUrl} className="btn-view">
        View 360°
      </button>
    </>
  );
}

export default Card;
