import React from "react";
import "./CityWeather.css";
import logo from "../../../../assets/images/logo.png";

const CityWeather = ({ data, isMetric }) => {
  const unit = isMetric ? "°C" : "°F";
  let information = "";
  if (data.Temperature) {
    information = (
      <div>
        <h2>{data.WeatherText}</h2>
        <img alt="weather" src={logo} />
        <h2>{data.Temperature.Metric.Value}</h2>
        <h2>{unit}</h2>
      </div>
    );
  }
  return <div className="city-weather shadow-5">{information}</div>;
};

export default CityWeather;
