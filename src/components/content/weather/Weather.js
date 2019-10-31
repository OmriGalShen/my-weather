import React, { useState, useEffect } from "react";
import "./Weather.css";
import SearchBox from "./searcbox/SearchBox";
import CardList from "./cardlist/CardList";

const Weather = () => {
  const [searchfield, setSearchfield] = useState("");
  const [robots, setRobots] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(respone => respone.json())
      .then(users => setRobots(users))
      .catch(console.log);
  }, []);

  const onSearchChange = event => {
    setSearchfield(event.target.value);
  };

  const filteredRobots = robots.filter(robot => {
    return robot.name.toLowerCase().includes(searchfield.toLowerCase());
  });

  return (
    <div className="weather">
      <div className="weather-panel shadow-5">
        <div className="tc">
          <h1 className="weather-title">Weather</h1>
          <SearchBox searchChange={onSearchChange} />
          <CardList robots={filteredRobots} />
        </div>
      </div>
    </div>
  );
};

export default Weather;
