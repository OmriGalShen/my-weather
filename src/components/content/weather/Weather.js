import React, { useState, useEffect } from "react";
import "./Weather.css";
import SearchBox from "./searcbox/SearchBox";
import CardList from "./cardlist/CardList";
import CityWeather from "./CityWeather/CityWeather";
import uuid4 from "uuid/v4";

const API_KEY = "oAANJ78p2PzQFD4707OrKAwj5DPuPbQZ";
const DEFAULT_CITY_KEY = "215854";

const dayList = [
  { id: 1, name: "sunday", tempMin: "1", tempMax: "1" },
  { id: 1, name: "sunday", tempMin: "1", tempMax: "1" },
  { id: 1, name: "sunday", tempMin: "1", tempMax: "1" }
];

const Weather = () => {
  const [searchfield, setSearchfield] = useState("");
  const [cityKey, setCityKey] = useState(DEFAULT_CITY_KEY);
  const [days, setDays] = useState(dayList);
  const [cityData, setCityData] = useState([]);
  const [isMetric, setIsMetric] = useState(true);
  const [forecasts, setForecasts] = useState([]);

  async function getCurrentWeather() {
    const res = await fetch(
      `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}.json?apikey=${API_KEY}`
    );
    res
      .json()
      .then(res => {
        setCityData(res[0]);
      })
      .catch(err => console.log);
  }
  async function getDailyForecasts() {
    const res = await fetch(
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}.json?apikey=${API_KEY}`
    );
    res
      .json()
      .then(res => {
        setForecasts(res);
      })
      .catch(err => console.log);
  }

  useEffect(() => {
    getCurrentWeather();
    getDailyForecasts();
  }, [cityKey]);

  const onSearchChange = event => {
    setSearchfield(event.target.value);
  };

  const fiveDayForecasts = () => {
    if (forecasts) {
      console.log(forecasts.DailyForecasts);
      console.log("hey");
      let myList = [];
      for (let day in forecasts.DailyForecasts) {
        console.log("hey");
        days.push({
          id: uuid4(),
          name: day.Date,
          temp: day.Temperature.Minimum.Value
        });
      }
      setDays(myList);
    }
  };

  return (
    <div className="weather">
      <div className="weather-panel shadow-5">
        <div className="tc">
          <h1 className="weather-title">Weather</h1>
          <SearchBox searchChange={onSearchChange} />
          <CityWeather data={cityData} isMetric={isMetric} />
          <CardList days={days} />
        </div>
      </div>
    </div>
  );
};

export default Weather;
