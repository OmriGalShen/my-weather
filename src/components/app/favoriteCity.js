/* 
  This file contains support functions to the 'App' component,
  to handle favorite cities list */

export const favoritesRemove = (city, favCities, handleSetFavCities) => {
  favCities = favCities.filter(favCity => favCity.key !== city.key);
  handleSetFavCities(favCities);
};
export const favoritesAdd = (city, favCities, handleSetFavCities) => {
  let cityCopy = Object.assign({}, city);
  favCities.push(cityCopy);
  handleSetFavCities(favCities);
};
export const updateFavoriteStatus = (city, handleSetCity) => {
  city.isFavorite = !city.isFavorite;
  handleSetCity(city);
};
