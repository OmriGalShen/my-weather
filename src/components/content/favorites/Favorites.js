import React from "react";
import "./Favorites.css";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton
} from "@material-ui/core";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import DeleteIcon from "@material-ui/icons/Delete";
import FavoriteIcon from "@material-ui/icons/Favorite";

const Favorites = props => {
  const {
    favCities,
    handleSetFavCities,
    handleSetCity,
    cityKey,
    favoritesRemove
  } = props;
  return (
    <div className="favorites shaodw-5">
      <div className="favorites-panel shadow-5">
        <div className="favorites-header">
          <FavoriteIcon fontSize="large" />
          <h1 className="favorites-title">Favorites</h1>
        </div>

        <p className="favorites-description">
          View and manage your favorite cities!
        </p>
        <List component="nav" aria-label="favorite cities">
          {favCities.map((favCity, index) => {
            let itemText = favCity.country + ", " + favCity.name;
            return (
              <ListItem
                button
                key={index}
                onClick={() => handleSetCity(favCity)}
                selected={favCity.key === cityKey}
              >
                <ListItemIcon>
                  <LocationCityIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={itemText} style={{ color: "white" }} />

                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() =>
                    favoritesRemove(favCity, favCities, handleSetFavCities)
                  }
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            );
          })}
        </List>
      </div>
    </div>
  );
};

export default Favorites;
