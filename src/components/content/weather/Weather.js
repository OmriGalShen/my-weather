import React, { useState, useEffect } from "react";
import "./Weather.css";
import SearchBox from "./searcbox/SearchBox";
import CardList from "./cardlist/CardList";
import CityWeather from "./CityWeather/CityWeather";
import { setCurrentWeather, setDailyForecasts, setCityInfo } from "./fetchData";
import { Grid } from "@material-ui/core";

const API_KEY = "HAlqYHjCEwSEWWecyKx02GmgGoLEavIG"; //need to be hidden on production
const DEFAULT_CITY_KEY = "215854"; // tel aviv default city

const Weather = ({ isMetric }) => {
  const [searchfield, setSearchfield] = useState("");
  const [days, setDays] = useState([]); //list of 5 days of daily Forecasts
  const [cityKey, setCityKey] = useState(DEFAULT_CITY_KEY);
  const [cityForecast, setcityForecast] = useState([]);
  const [cityName, setCityName] = useState("Tel Aviv");
  const [countryName, setCountryName] = useState("Israel");

  //called only at the start of the app
  useEffect(() => {
    setCurrentWeather(API_KEY, setcityForecast, cityKey);
    setDailyForecasts(API_KEY, setDays, cityKey);
  }, [cityKey]);

  //user submit new city
  const handleSearchSubmit = e => {
    e.preventDefault();
    setCityInfo(API_KEY, searchfield, setCityKey, setCityName, setCountryName);
    setCurrentWeather(API_KEY, setcityForecast, cityKey);
    setDailyForecasts(API_KEY, setDays, cityKey);
  };

  const onSearchChange = event => {
    setSearchfield(event.target.value);
  };

  return (
    <div className="weather">
      <div className="weather-panel shadow-5">
        <Grid container>
          <Grid item xs={12} className="header shadow-5">
            <Grid item xs={12}>
              <div className="weather-title">
                <h1>My Weather</h1>
              </div>
            </Grid>
            <Grid item xs={12}>
              <SearchBox
                handleSearchSubmit={handleSearchSubmit}
                searchChange={onSearchChange}
              />
            </Grid>
          </Grid>
          <Grid item lg={3} xs={12}>
            <CityWeather
              data={cityForecast}
              cityName={cityName}
              countryName={countryName}
              isMetric={isMetric}
            />
          </Grid>
          <Grid item lg={9} xs={12}>
            <CardList days={days} isMetric={isMetric} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Weather;
