import React, { useState, useEffect } from "react";
import "./Weather.css";
import SearchBox from "./searcbox/SearchBox";
import CardList from "./cardlist/CardList";
import CityWeather from "./CityWeather/CityWeather";
import { setCurrentWeather, setDailyForecasts, setCityInfo } from "./fetchData";
import { Grid } from "@material-ui/core";
import Logo from "../../logo/Logo";

const API_KEY = "ukNB5zcIFeb6lFYAHPPeZbxZZNbnWuq4"; //need to be hidden on production

const Weather = props => {
  const { isMetric, city, setCity, handleFavorite, favCities } = props;
  const [searchfield, setSearchfield] = useState("");
  const [days, setDays] = useState([]); //list of 5 days of daily Forecasts
  const [cityForecast, setcityForecast] = useState([]);

  //called only at the start of the app
  useEffect(() => {
    setCurrentWeather(API_KEY, setcityForecast, city.key);
    setDailyForecasts(API_KEY, setDays, city.key);
  }, [city]);

  //user submit new city
  const handleSearchSubmit = e => {
    e.preventDefault();
    setCityInfo(API_KEY, searchfield, city, setCity, favCities);
    setCurrentWeather(API_KEY, setcityForecast, city.key);
    setDailyForecasts(API_KEY, setDays, city.key);
  };

  const onSearchChange = event => {
    setSearchfield(event.target.value);
  };

  return (
    <div className="weather-panel shadow-5">
      <Grid container>
        <Grid item xs={12} className="header shadow-5">
          <Grid item xs={12}>
            <Logo width={150} />
            <p className="weather-description">
              A simple and elegant weather app!
            </p>
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
            city={city}
            isMetric={isMetric}
            handleFavorite={handleFavorite}
          />
        </Grid>
        <Grid item lg={9} xs={12}>
          <CardList days={days} isMetric={isMetric} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Weather;
