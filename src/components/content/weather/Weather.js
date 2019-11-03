import React, { useState, useEffect, useCallback } from "react";
import "./Weather.css";
import SearchBox from "./searcbox/SearchBox";
import CardList from "./cardlist/CardList";
import CityWeather from "./cityWeather/CityWeather";
import {
  setCurrentWeather,
  setDailyWeather,
  setCityInfo,
  autoCompleteList
} from "./utilityData";
import { Grid } from "@material-ui/core";
import Logo from "../../logo/Logo";
import { Snackbar } from "@material-ui/core";

const Weather = props => {
  const {
    isMetric,
    city,
    handleSetCity,
    handleFavorite,
    favCities,
    API_KEY
  } = props;
  const [searchfield, setSearchfield] = useState(""); // searchfield test
  const [dailyForecast, setDailyForecasts] = useState([]); //list of 5 days of daily Forecasts
  const [cityForecast, setcityForecast] = useState([]); // current city forecast data
  const [openToast, setOpenToast] = useState(false); // boolean of displaying toast message
  const [errorMessage, setErrorMessage] = useState(""); //toast messsage text
  const [filteredCities, setFilteredCities] = useState([]);

  //update current and daily weather info
  const updateWeatherCallback = useCallback(() => {
    setCurrentWeather(API_KEY, handleSetCityForecast, city.key, displayError);
    setDailyWeather(API_KEY, handleSetDailyForecast, city.key, displayError);
  }, [city, API_KEY]);

  //called only at the start of the app
  useEffect(() => updateWeatherCallback(), [updateWeatherCallback]);

  //user submit new city
  const handleSearchSubmit = e => {
    e.preventDefault();
    setCityInfo(
      API_KEY,
      searchfield,
      city,
      handleSetCity,
      favCities,
      displayError
    );
    updateWeatherCallback();
  };

  //change daily forecast list
  const handleSetDailyForecast = dailyForecast => {
    let dailyForecastCopy = [...dailyForecast];
    setDailyForecasts(dailyForecastCopy);
  };

  //change current city forecast
  const handleSetCityForecast = newCityForecast => {
    let cityForecastCopy = Object.assign({}, newCityForecast);
    setcityForecast(cityForecastCopy);
  };
  //display toast with error message
  const displayError = message => {
    setErrorMessage(message);
    setOpenToast(true);
  };
  //handle toast message close
  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenToast(false);
  };
  //search field input changed
  const onSearchChange = event => {
    setSearchfield(event.target.value);
    if (searchfield.length)
      autoCompleteList(API_KEY, searchfield, handleSetFilteredCities);
  };

  //change filtered cities list
  const handleSetFilteredCities = newFilteredCities => {
    let filteredCitiesCopy = [...newFilteredCities];
    setFilteredCities(filteredCitiesCopy);
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
              API_KEY={API_KEY}
              handleSearchSubmit={handleSearchSubmit}
              searchChange={onSearchChange}
              searchfield={searchfield}
              filteredCities={filteredCities}
            />
          </Grid>
        </Grid>
        <Grid item md={3} xs={12}>
          <CityWeather
            data={cityForecast}
            city={city}
            isMetric={isMetric}
            handleFavorite={handleFavorite}
          />
        </Grid>
        <Grid item md={9} xs={12}>
          <CardList dailyForecast={dailyForecast} isMetric={isMetric} />
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        open={openToast}
        autoHideDuration={3000}
        onClose={handleToastClose}
        message={<p>{errorMessage}</p>}
      />
    </div>
  );
};

export default Weather;
