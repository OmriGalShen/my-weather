import React from "react";
import LogoImage from "../../assets/images/logo.png";
import "./Logo.css";

const Logo = ({ width }) => {
  return (
    <div className="logo grow">
      <img
        alt="logo"
        src={LogoImage}
        className="logo-img"
        style={{ width: width }}
      />
      <p className="logo-title">MyWeather</p>
    </div>
  );
};

export default Logo;
