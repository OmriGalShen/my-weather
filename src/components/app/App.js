import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Weather from "../content/weather/Weather";
import Favorites from "../content/favorites/Favorites";
import Settings from "../content/settings/Settings";
import Navbar from "../layout/navbar/Navbar";
import Footer from "../layout/footer/Footer";

const linksList = [
  { id: "1", name: "Home", path: "/", component: Weather },
  { id: "2", name: "Favorties", path: "/favorites", component: Favorites },
  { id: "3", name: "Settings", path: "/settings", component: Settings }
];

// tel aviv default city
const DEFAULT_CITY = {
  key: "215854",
  name: "Tel Aviv",
  country: "Israel",
  isFavorite: true
};

const DEFAULT_FAV_CITIES = [
  DEFAULT_CITY,
  {
    key: "213225",
    name: "Jerusalem",
    country: "Israel",
    isFavorite: true
  }
];

const App = () => {
  const [isMetric, setIsMetric] = useState(true);
  const [city, setCity] = useState(DEFAULT_CITY);
  const [favCities, setFavCities] = useState(DEFAULT_FAV_CITIES);

  const handleFavorite = e => {
    let favCitiesCopy = favCities.slice();
    let cityCopy = Object.assign({}, city);
    // remove city from favorites
    if (city.isFavorite) {
      favCitiesCopy = favCitiesCopy.filter(favCity => favCity.key !== city.key);
    }
    // add city to favorites
    else {
      favCitiesCopy.push(cityCopy);
    }
    setFavCities(favCitiesCopy);
    // update city's Favorite property
    cityCopy.isFavorite = !city.isFavorite;
    setCity(cityCopy);
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
                  setCity={setCity}
                  handleFavorite={handleFavorite}
                  favCities={favCities}
                />
              )}
            />
            <Route
              exact
              path="/favorites"
              render={props => <Favorites {...props} isMetric={isMetric} />}
            />
            <Route
              exact
              path="/settings"
              render={props => (
                <Settings {...props} setIsMetric={setIsMetric} />
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
