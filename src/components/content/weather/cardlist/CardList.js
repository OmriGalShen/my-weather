import React from "react";
import Card from "./card/Card";
import "./CardList.css";

const CardList = ({ dailyForecast }) => {
  return (
    <div className="card-list shadow-5 white pa4">
      <h1 className="card-list-title">Next 5 days Forecasts </h1>
      <div className="card-list-grid">
        {dailyForecast.map((day, ind) => {
          return (
            <Card
              key={ind}
              id={day.id}
              name={day.name}
              tempMin={day.tempMin}
              tempMax={day.tempMax}
              image={day.image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CardList;
