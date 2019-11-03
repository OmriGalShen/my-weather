const favoritesRemove = (city, favCities, handleSetFavCities) => {
  favCities = favCities.filter(favCity => favCity.key !== city.key);
  handleSetFavCities(favCities);
};
const favoritesAdd = (city, favCities, handleSetFavCities) => {
  let cityCopy = Object.assign({}, city);
  favCities.push(cityCopy);
  handleSetFavCities(favCities);
};
const updateFavoriteStatus = (city, handleSetCity) => {
  city.isFavorite = !city.isFavorite;
  handleSetCity(city);
};

export { favoritesAdd, favoritesRemove, updateFavoriteStatus };
