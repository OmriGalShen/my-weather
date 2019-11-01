import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
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

const App = () => {
  const [isMetric, setIsMetric] = useState(true);

  return (
    <div className="App">
      <Grid container>
        <Router>
          <Grid item xs={12}>
            <div className="navbar">
              <Navbar linksList={linksList} />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="main-container">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={props => <Weather {...props} isMetric={isMetric} />}
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
          </Grid>
          <Grid item xs={12}>
            <Footer />
          </Grid>
        </Router>
      </Grid>
    </div>
  );
};

export default App;
