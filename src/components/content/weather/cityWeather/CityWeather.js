import React, { useContext } from "react";
import "./CityWeather.css";
import { getWeatherImage } from "../../../weatherImages/weatherImages";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { FavoriteBorder, Favorite } from "@material-ui/icons";
import defaultSource from "../../../../assets/images/logo-01.png";
import { AppContext } from "../../../app/App";

const FavoriteButton = ({ changeFavoriteStatus, currentCity }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          style={{ display: "flex", justifyContent: "center" }}
          icon={<FavoriteBorder fontSize="large" />}
          checkedIcon={<Favorite fontSize="large" />}
          checked={currentCity.isFavorite}
          onChange={() => changeFavoriteStatus(currentCity)}
        />
      }
      label=""
      labelPlacement="top"
    />
  );
};

const CityWeather = ({ cityForecast, changeFavoriteStatus }) => {
  const { currentCity, isMetric } = useContext(AppContext);
  const unit = isMetric ? "°C" : "°F";
  let tempVal = 0;
  let weatherIcon = 0;
  //check if forecast data is vaild
  if (cityForecast.description) {
    tempVal = isMetric ? cityForecast.tempMetric : cityForecast.tempImperial;
    weatherIcon = cityForecast.iconNumber;
  }

  const addDefaultSrc = e => {
    e.target.src = defaultSource;
  };

  return (
    <div className="city-weather-wrapper">
      <div className="tc pa1">
        <FavoriteButton
          changeFavoriteStatus={changeFavoriteStatus}
          currentCity={currentCity}
        />
      </div>
      <div className="city-weather white">
        <h1>Now</h1>
        <div className="city-weather-info">
          {" "}
          <div>
            <h3 className="city-name-title">{currentCity.country},</h3>
            <h1 className="city-name-title">{currentCity.name}</h1>

            <h2>{cityForecast.description}</h2>
            <img
              className="city-weather-image"
              alt="weather"
              src={getWeatherImage(weatherIcon)}
              onError={addDefaultSrc}
            />
            <h2>
              {tempVal} {unit}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityWeather;
