import React, { useContext } from "react";
import "./Card.css";
import defaultSource from "../../../../../assets/images/logo-01.png";
import { AppContext } from "../../../../app/App";

const Card = props => {
  const { name, tempMin, tempMax, image } = props;
  const { isMetric } = useContext(AppContext);

  let symbol = isMetric ? "°C" : "°F";

  const addDefaultSrc = ev => {
    ev.target.src = defaultSource;
  };

  return (
    <div className="card dib br3 pa2 ma2 grow bw2 shadow-5">
      <img
        className="card-image"
        src={image}
        alt="profil pic"
        onError={addDefaultSrc}
      />
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
