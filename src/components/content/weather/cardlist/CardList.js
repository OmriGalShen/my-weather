import React from "react";
import Card from "../card/Card.js";
import "./CardList.css";

const CardList = ({ days }) => {
  return (
    <div className="card-list">
      {days.map((user, ind) => {
        return (
          <Card
            key={ind}
            id={days[ind].id}
            name={days[ind].name}
            description={days[ind].description}
          />
        );
      })}
    </div>
  );
};

export default CardList;
