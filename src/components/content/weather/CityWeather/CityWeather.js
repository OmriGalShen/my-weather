import React from "react";
import "./CityWeather.css";
import logo from "../../../../assets/images/logo.png";

const CityWeather = ({ data, isMetric }) => {
  const unit = isMetric ? "°C" : "°F";
  let information = "";
  if (data.Temperature) {
    const tempVal = isMetric
      ? data.Temperature.Metric.Value
      : data.Temperature.Imperial.Value;
    information = (
      <div>
        <h2>{data.WeatherText}</h2>
        <img alt="weather" src={logo} />
        <h2>
          {tempVal} {unit}
        </h2>
      </div>
    );
  }
  return <div className="city-weather shadow-5 white">{information}</div>;
};

export default CityWeather;
