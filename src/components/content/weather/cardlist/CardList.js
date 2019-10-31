import React from "react";
import Card from "../card/Card.js";
import "./CardList.css";

const CardList = ({ robots }) => {
  return (
    <div className="card-list">
      {robots.map((user, ind) => {
        return (
          <Card
            key={ind}
            id={robots[ind].id}
            name={robots[ind].name}
            email={robots[ind].email}
          />
        );
      })}
    </div>
  );
};

export default CardList;
