import React from "react";
import Card from "../card/Card.js";
import "./CardList.css";

const CardList = ({ days }) => {
  return (
    <div className="card-list shadow-5 white pa4">
      <h1 className="card-list-title">Next 5 days Forecasts </h1>
      <div className="card-list-grid">
        {days.map((user, ind) => {
          return (
            <Card
              key={ind}
              id={days[ind].id}
              name={days[ind].name}
              tempMin={days[ind].tempMin}
              tempMax={days[ind].tempMax}
              image={days[ind].image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CardList;
