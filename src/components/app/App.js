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

export const AppContext = createContext();

//link list for routing
const linksList = [
  { id: "1", name: "Home", path: "/", component: Weather },
  { id: "2", name: "Favorties", path: "/favorites", component: Favorites },
  { id: "3", name: "Settings", path: "/settings", component: Settings }
];

const favoritesReducer = (state, action) => {
  switch (action.type) {
    case "FAV_ADD":
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: true };
        } else {
          return todo;
        }
      });
    case "FAV_REMOVE":
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: false };
        } else {
          return todo;
        }
      });
    default:
      throw new Error();
  }
};

const App = () => {
  const [isMetric, setIsMetric] = useState(true); //state of units
  const [city, setCity] = useState(DEFAULT_CITY); //current city
  const [favCities, setFavCities] = useState(DEFAULT_FAV_CITIES); //list of favorite cities
  const [favorites, dispatchFavorites] = useReducer(
    favoritesReducer,
    DEFAULT_FAV_CITIES
  ); //list of favorite cities

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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //user clicked to change favorite status of current city
  const handleFavoriteStatus = e => {
    if (city.isFavorite) {
      favoritesRemove(city);
    } else {
      favoritesAdd(city);
    }
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

  //add city to favorite cities list
  const favoritesRemove = cityToRemove => {
    let favCitiesCopy = [...favCities];
    favCitiesCopy = favCitiesCopy.filter(
      favCity => favCity.id !== cityToRemove.id
    );
    handleSetFavCities(favCitiesCopy); //update favorite cities list
    if (cityToRemove.id === city.id) {
      city.isFavorite = false;
      handleSetCity(city); //update current city
    }
  };
  //remove city to favorite cities list
  const favoritesAdd = cityToAdd => {
    let cityCopy = Object.assign({}, cityToAdd);
    favCities.push(cityCopy);
    handleSetFavCities(favCities); //update favorite cities list
    if (cityToAdd.id === city.id) {
      city.isFavorite = true;
      handleSetCity(city); //update current city
    }
  };

  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <Navbar linksList={linksList} />
        </div>
        <div className="main-container">
          <AppContext.Provider value={{ city, isMetric, favCities }}>
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Weather
                    {...props}
                    handleSetCity={handleSetCity}
                    handleFavoriteStatus={handleFavoriteStatus}
                  />
                )}
              />
              <Route
                exact
                path="/favorites"
                render={props => (
                  <Favorites
                    {...props}
                    handleSetCity={handleSetCity}
                    favoritesRemove={favoritesRemove}
                  />
                )}
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
