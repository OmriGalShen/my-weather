import React, { useState, useEffect, createContext, useReducer } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Weather from "../content/weather/Weather";
import Favorites from "../content/favorites/Favorites";
import Settings from "../content/settings/Settings";
import Navbar from "../layout/navbar/Navbar";
import Footer from "../layout/footer/Footer";
import { setCityWithLocation } from "./utility";
import { DEFAULT_CITY, DEFAULT_FAV_CITIES } from "../../constants/constants";
import { favoritesReducer, currentCityReducer } from "./reducers";

export const AppContext = createContext();

//link list for routing
const linksList = [
  { id: "1", name: "Home", path: "/", component: Weather },
  { id: "2", name: "Favorties", path: "/favorites", component: Favorites },
  { id: "3", name: "Settings", path: "/settings", component: Settings }
];

const App = () => {
  const [isMetric, setIsMetric] = useState(true); //state of units
  const [currentCity, dispatchCurrentCity] = useReducer(
    currentCityReducer,
    DEFAULT_CITY
  );
  const [favorites, dispatchFavorites] = useReducer(
    favoritesReducer,
    DEFAULT_FAV_CITIES
  ); //list of favorite cities

  /*
  called only on the component mount
  ask for user permission for location 
  if positon is found, set currentCity according to geo-position
  */
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        setCityWithLocation(
          currentCity,
          position,
          dispatchCurrentCity,
          favorites
        );
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //user clicked to change favorite status of currentCity
  const changeFavoriteStatus = city => {
    if (city.isFavorite) {
      dispatchFavorites({
        type: "REMOVE_FAV",
        city: city
      });
      if (city.id === currentCity.id) {
        dispatchCurrentCity({ type: "UNMAKE_FAV" });
      }
    } else {
      dispatchFavorites({
        type: "ADD_FAV",
        city: city
      });
      if (city.id === currentCity.id) dispatchCurrentCity({ type: "MAKE_FAV" });
    }
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
          <AppContext.Provider
            value={{
              currentCity,
              isMetric,
              favorites,
              dispatchFavorites,
              dispatchCurrentCity,
              changeFavoriteStatus
            }}
          >
            <Switch>
              <Route exact path="/" render={props => <Weather {...props} />} />
              <Route
                exact
                path="/favorites"
                render={props => <Favorites {...props} />}
              />
              <Route
                exact
                path="/settings"
                render={props => (
                  <Settings {...props} handleUnitChange={handleUnitChange} />
                )}
              />
            </Switch>
          </AppContext.Provider>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </Router>
    </div>
  );
};

export default App;
