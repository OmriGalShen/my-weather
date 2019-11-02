import React from "react";
import "./Card.css";

const Card = props => {
  const { name, tempMin, tempMax, image, isMetric } = props;

  let symbol = isMetric ? "°C" : "°F";

  return (
    <div className="card bg-light-blue dib br3 pa2 ma2 grow bw2 shadow-5">
      <img src={image} alt="profil pic" />
      <div>
        <h2>{name}</h2>
        <p>
          {tempMin + symbol}-{tempMax + symbol}
        </p>
      </div>
    </div>
  );
};

export default Card;
