import React from "react";

const Card = props => {
  const { name, description, id } = props;

  return (
    <div className="bg-light-blue dib br3 pa3 ma2 grow bw2 shadow-5">
      <img src={`https://robohash.org/${id}?200x200`} alt="profil pic" />
      <div>
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Card;
