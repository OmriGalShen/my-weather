const favoritesRemove = (city, favCities, setFavCities) => {
  let favCitiesCopy = favCities.slice();
  favCitiesCopy = favCitiesCopy.filter(favCity => favCity.key !== city.key);
  setFavCities(favCitiesCopy);
};
const favoritesAdd = (city, favCities, setFavCities) => {
  let favCitiesCopy = favCities.slice();
  let cityCopy = Object.assign({}, city);
  favCitiesCopy.push(cityCopy);
  setFavCities(favCitiesCopy);
};
const updateFavoriteStatus = (city, setCity) => {
  let cityCopy = Object.assign({}, city);
  cityCopy.isFavorite = !city.isFavorite;
  setCity(cityCopy);
};

export { favoritesAdd, favoritesRemove, updateFavoriteStatus };
