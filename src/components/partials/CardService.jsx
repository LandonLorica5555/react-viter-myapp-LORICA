import React from "react";

const CardService = ({imageUrl, alt, title, description, aText}) => {
  return (
    <>
      <div className="card">
        <img
          src={imageUrl}
          alt={alt}
        />
        <h3>{title}</h3>
        <p>
          {description}
        </p>
        <a href="#">{aText} &rarr;</a>
      </div>
    </>
  );
};

export default CardService;
