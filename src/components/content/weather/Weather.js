import React, { useState, useEffect } from "react";
import "./Weather.css";
import SearchBox from "./searcbox/SearchBox";
import CardList from "./cardlist/CardList";
import CityWeather from "./CityWeather/CityWeather";
// import logo from "../../../assets/images/logo.png";
import { getCurrentWeather, getDailyForecasts, getCityInfo } from "./fetchData";
import { Grid } from "@material-ui/core";

const API_KEY = "4cYUpfCtkmKMiXocQeCSiF4GRgHVsXHw";
const DEFAULT_CITY_KEY = "215854";

// const dayList = [
//   { id: 1, name: "mondey", tempMin: "1", tempMax: "1" },
//   { id: 1, name: "sunday", tempMin: "1", tempMax: "1" },
//   { id: 1, name: "sunday", tempMin: "1", tempMax: "1" }
// ];

const Weather = () => {
  const [searchfield, setSearchfield] = useState("");
  const [cityKey, setCityKey] = useState(DEFAULT_CITY_KEY);
  const [days, setDays] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [cityName, setCityName] = useState("Tel-Aviv");
  const [isMetric, setIsMetric] = useState(true);

  useEffect(() => {
    getCurrentWeather(API_KEY, setCityData, cityKey);
    getDailyForecasts(API_KEY, setDays, cityKey);
  }, []);

  // useEffect(() => {
  //   getCityKey(API_KEY, searchfield, setCityKey);
  // }, [searchfield]);

  const onSearchChange = event => {
    setSearchfield(event.target.value);
    getCityInfo(API_KEY, searchfield, setCityKey, setCityName);
    getCurrentWeather(API_KEY, setCityData, cityKey);
    getDailyForecasts(API_KEY, setDays, cityKey);
  };

  return (
    <div className="weather">
      <div className="weather-panel shadow-5">
        <Grid container>
          {/* <div className="header shadow-5"> */}
          <Grid item xs={12} className="header shadow-5">
            <Grid item xs={12}>
              <div className="weather-title">
                <h1>My Weather</h1>
              </div>
            </Grid>
            <Grid item xs={12}>
              <SearchBox searchChange={onSearchChange} />
            </Grid>
          </Grid>
          <Grid item lg={3} xs={12}>
            <CityWeather
              data={cityData}
              cityName={cityName}
              isMetric={isMetric}
            />
          </Grid>
          <Grid item lg={9} xs={12}>
            <CardList days={days} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Weather;
