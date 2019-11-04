import React from "react";
import LogoImage from "../../assets/images/logo.png";
import "./Logo.css";

const Logo = ({ width }) => {
  return (
    <div className="logo">
      <img
        alt="logo"
        src={LogoImage}
        className="logo-img"
        style={{ width: width }}
      />
    </div>
  );
};

export default Logo;
