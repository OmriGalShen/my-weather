import React from "react";
import "./CityWeather.css";
import { getWeatherImage } from "../../../weatherImages/weatherImages";

const CityWeather = ({ data, isMetric, city }) => {
  const unit = isMetric ? "°C" : "°F";
  let information = "";
  if (data.Temperature) {
    const tempVal = isMetric
      ? data.Temperature.Metric.Value
      : data.Temperature.Imperial.Value;
    information = (
      <div>
        <h3 className="city-name-title">{city.country},</h3>
        <h1 className="city-name-title">{city.name}</h1>
        <h2>{data.WeatherText}</h2>
        <img alt="weather" src={getWeatherImage(1)} />
        <h2>
          {tempVal} {unit}
        </h2>
      </div>
    );
  }
  return (
    <div className="city-weather shadow-5 white">
      <h1>Now</h1>
      <div className="city-weather-info">{information}</div>
    </div>
  );
};

export default CityWeather;
