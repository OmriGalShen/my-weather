import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Weather from "../content/weather/Weather";
import Favorites from "../content/favorites/Favorites";
import Settings from "../content/settings/Settings";
import Navbar from "../layout/navbar/Navbar";
import Footer from "../layout/footer/Footer";
import {
  favoritesAdd,
  favoritesRemove,
  updateFavoriteStatus
} from "./favoriteCity";
import { setCityWithLocation } from "./utility";
import { DEFAULT_CITY, DEFAULT_FAV_CITIES } from "../constants/constants";

//link list for routing
const linksList = [
  { id: "1", name: "Home", path: "/", component: Weather },
  { id: "2", name: "Favorties", path: "/favorites", component: Favorites },
  { id: "3", name: "Settings", path: "/settings", component: Settings }
];

const App = () => {
  const [isMetric, setIsMetric] = useState(true); //state of units
  const [city, setCity] = useState(DEFAULT_CITY); //current city
  const [favCities, setFavCities] = useState(DEFAULT_FAV_CITIES); //list of favorite cities

  /*
  called only on the component mount
  ask for user permission for location 
  if positon is found set current city according to geo-position
  */
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        setCityWithLocation(city, position, handleSetCity, favCities);
      });
    } else {
      console.log("didn't get location");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //user clicked to change favorite status of current city
  const handleFavoriteStatus = e => {
    if (city.isFavorite) {
      favoritesRemove(city, favCities, handleSetFavCities);
    } else {
      favoritesAdd(city, favCities, handleSetFavCities);
    }
    updateFavoriteStatus(city, handleSetCity);
  };

  //change current city
  const handleSetCity = newCity => {
    let cityCopy = Object.assign({}, newCity);
    setCity(cityCopy);
  };

  //change current favorite cities list
  const handleSetFavCities = newFavCities => {
    let favCitiesCopy = [...newFavCities];
    setFavCities(favCitiesCopy);
  };

  //user clicked to change current units
  const handleUnitChange = () => {
    setIsMetric(!isMetric);
  };

  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <Navbar linksList={linksList} />
        </div>
        <div className="main-container">
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Weather
                  {...props}
                  isMetric={isMetric}
                  city={city}
                  handleSetCity={handleSetCity}
                  handleFavoriteStatus={handleFavoriteStatus}
                  favCities={favCities}
                />
              )}
            />
            <Route
              exact
              path="/favorites"
              render={props => (
                <Favorites
                  {...props}
                  favCities={favCities}
                  handleSetFavCities={handleSetFavCities}
                  handleSetCity={handleSetCity}
                  cityKey={city.key}
                  favoritesRemove={favoritesRemove}
                />
              )}
            />
            <Route
              exact
              path="/settings"
              render={props => (
                <Settings
                  {...props}
                  isMetric={isMetric}
                  handleUnitChange={handleUnitChange}
                />
              )}
            />
          </Switch>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </Router>
    </div>
  );
};

export default App;
