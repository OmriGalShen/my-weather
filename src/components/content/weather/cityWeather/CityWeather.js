import React, { useContext } from "react";
import "./CityWeather.css";
import { getWeatherImage } from "../../../weatherImages/weatherImages";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { FavoriteBorder, Favorite } from "@material-ui/icons";
import defaultSource from "../../../../assets/images/logo-01.png";
import { AppContext } from "../../../app/App";

const FavoriteButton = ({ checked, handleFavoriteStatus }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          style={{ display: "flex", justifyContent: "center" }}
          icon={<FavoriteBorder fontSize="large" />}
          checkedIcon={<Favorite fontSize="large" />}
          value={true}
          checked={checked}
          onChange={handleFavoriteStatus}
        />
      }
      label=""
      labelPlacement="top"
    />
  );
};

const CityWeather = ({ data, handleFavoriteStatus }) => {
  const { city, isMetric } = useContext(AppContext);
  const unit = isMetric ? "°C" : "°F";
  let tempVal = 0;
  if (data.Temperature) {
    tempVal = isMetric
      ? data.Temperature.Metric.Value
      : data.Temperature.Imperial.Value;
  }
  let weatherIcon = 0;
  if (data.WeatherIcon) {
    weatherIcon = data.WeatherIcon;
  }

  const addDefaultSrc = e => {
    e.target.src = defaultSource;
  };

  return (
    <div className="city-weather-wrapper">
      <div className="tc pa1">
        <FavoriteButton
          checked={city.isFavorite}
          handleFavoriteStatus={handleFavoriteStatus}
        />
      </div>
      <div className="city-weather white">
        <h1>Now</h1>
        <div className="city-weather-info">
          {" "}
          <div>
            <h3 className="city-name-title">{city.country},</h3>
            <h1 className="city-name-title">{city.name}</h1>

            <h2>{data.WeatherText}</h2>
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
