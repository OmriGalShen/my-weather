import React from "react";
import "./CityWeather.css";
import { getWeatherImage } from "../../../weatherImages/weatherImages";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { FavoriteBorder, Favorite } from "@material-ui/icons";

const FavoriteButton = ({ checked, handleFavorite }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          style={{ display: "flex", justifyContent: "center" }}
          icon={<FavoriteBorder fontSize="large" />}
          checkedIcon={<Favorite fontSize="large" />}
          value={true}
          checked={checked}
          onChange={handleFavorite}
        />
      }
      label=""
      labelPlacement="top"
    />
  );
};

const CityWeather = ({ data, isMetric, city, handleFavorite }) => {
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
  return (
    <div className="city-weather-wrapper">
      <div className="tc pa1">
        <FavoriteButton
          checked={city.isFavorite}
          handleFavorite={handleFavorite}
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
