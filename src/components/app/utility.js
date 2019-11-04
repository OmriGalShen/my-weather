import queryString from "query-string";
import {
  API_KEY,
  GEOPOSITION_SEARCH_URL,
  CITY_NEIGHBORS_URL
} from "../constants/constants";

export async function setCityWithLocation(
  city,
  position,
  handleSetCity,
  favCities
) {
  if (position.coords.latitude) {
    const positionQuery = queryString.stringify({
      q: position.coords.latitude + "," + position.coords.longitude
    });
    const res = await fetch(
      `${GEOPOSITION_SEARCH_URL}?apikey=${API_KEY}&${positionQuery}`
    );
    res
      .json()
      .then(res => {
        //city wasn't found
        if (!res.Key) throw new Error("city wasn't found");
        //city was found
        getNeighborByKey(city, res.Key, handleSetCity, favCities);
      })
      .catch(err => {
        console.log("Error at setCityWithLocation");
        console.log(err);
      });
  }
}
export async function getNeighborByKey(
  city,
  cityKey,
  handleSetCity,
  favCities
) {
  if (cityKey) {
    const res = await fetch(
      `${CITY_NEIGHBORS_URL + cityKey}?apikey=${API_KEY}`
    );
    res
      .json()
      .then(res => {
        //city wasn't found
        if (!res[0]) throw new Error("city wasn't found");
        //city was found
        let newCity = Object.assign({}, city); //make of copy of the city
        //gives the copy the new data
        newCity.key = res[0].Key;
        newCity.name = res[0].LocalizedName;
        newCity.country = res[0].Country.LocalizedName;
        newCity.isFavorite = false;
        //search if the found city is in favorites
        for (let favCity of favCities) {
          //if found city is in favorites
          if (favCity.key === res[0].Key) {
            newCity.isFavorite = true;
          }
        }
        handleSetCity(newCity);
      })
      .catch(err => {
        console.log("Error at getNeighborByKey");
        console.log(err);
      });
  }
}
