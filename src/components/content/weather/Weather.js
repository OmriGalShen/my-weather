import React, { useState, useEffect } from "react";
import "./Weather.css";
import SearchBox from "./searcbox/SearchBox";
import CardList from "./cardlist/CardList";
import CityWeather from "./CityWeather/CityWeather";
import logo from "../../../assets/images/logo.png";

const API_KEY = "oAANJ78p2PzQFD4707OrKAwj5DPuPbQZ";
const DEFAULT_CITY_KEY = "215854";

const dayList = [
  { id: 1, name: "mondey", tempMin: "1", tempMax: "1" },
  { id: 1, name: "sunday", tempMin: "1", tempMax: "1" },
  { id: 1, name: "sunday", tempMin: "1", tempMax: "1" }
];

const getWeekDayName = date => {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  return weekday[date.getDay()];
};

const Weather = () => {
  const [searchfield, setSearchfield] = useState("");
  const [cityKey, setCityKey] = useState(DEFAULT_CITY_KEY);
  const [days, setDays] = useState(dayList);
  const [cityData, setCityData] = useState([]);
  const [isMetric, setIsMetric] = useState(true);
  // const [forecasts, setForecasts] = useState([]);

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
        forcatsToDays(res);
      })
      .catch(err => console.log);
  }

  useEffect(() => {
    getCurrentWeather();
    getDailyForecasts();
  }, []);

  const onSearchChange = event => {
    setSearchfield(event.target.value);
  };

  const forcatsToDays = data => {
    if (data.DailyForecasts) {
      const dailyForecasts = data.DailyForecasts;
      let myList = [];
      for (let i = 0; i < dailyForecasts.length; i++) {
        let dayName = new Date(dailyForecasts[i].Date);
        myList.push({
          id: i,
          image: logo,
          name: getWeekDayName(dayName),
          tempMin: dailyForecasts[i].Temperature.Minimum.Value,
          tempMax: dailyForecasts[i].Temperature.Maximum.Value
        });
      }
      setDays(myList);
    }
  };

  return (
    <div className="weather">
      <div className="weather-panel shadow-5">
        <div className="tc">
          <div className="weather-title">
            <h1>Weather</h1>
          </div>
          <SearchBox searchChange={onSearchChange} />
          <CityWeather data={cityData} isMetric={isMetric} />
          <CardList days={days} />
        </div>
      </div>
    </div>
  );
};

export default Weather;
