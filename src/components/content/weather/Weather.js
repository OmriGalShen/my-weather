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
    handleFavoriteStatus,
    favCities
  } = props;
  const [searchfield, setSearchfield] = useState(""); // searchfield text
  const [dailyForecast, setDailyForecasts] = useState([]); //list  of daily Forecasts
  const [cityForecast, setcityForecast] = useState([]); // current city forecast data
  const [openToast, setOpenToast] = useState(false); // boolean of displaying toast message
  const [errorMessage, setErrorMessage] = useState(""); //toast messsage text
  const [filteredCities, setFilteredCities] = useState([]); //searchbox filtered city list

  //update current and daily weather info
  const updateWeatherCallback = useCallback(() => {
    setCurrentWeather(handleSetCityForecast, city.key, displayError);
    setDailyWeather(isMetric, handleSetDailyForecast, city.key, displayError);
  }, [city, isMetric]);

  //called at the start of the app
  useEffect(() => updateWeatherCallback(), [updateWeatherCallback]);

  //user submited a new city search
  const handleSearchSubmit = e => {
    if (e.target[0]) {
      setSearchfield(e.target[0].value);
      let userInput = e.target[0].value; // this is searchbox value text
      e.preventDefault();
      setCityInfo(userInput, city, handleSetCity, favCities, displayError); //update to new city
      updateWeatherCallback(); //update displayed weather
    }
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
    if (searchfield.length) {
      //update autocomplete list on  searchbox
      autoCompleteList(searchfield, handleSetFilteredCities);
    }
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
              handleSearchSubmit={handleSearchSubmit}
              onSearchChange={onSearchChange}
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
            handleFavoriteStatus={handleFavoriteStatus}
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
