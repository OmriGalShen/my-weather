/* This site uses the AccuWeather RESTful API at 'https://developer.accuweather.com/' 
  This file contains support functions to the 'App' component,
  to access the API data and return/use the needed information*/

import queryString from "query-string"; //used to convert string to get url query

import {
  API_KEY,
  GEOPOSITION_SEARCH_URL,
  CITY_NEIGHBORS_URL
} from "../constants/constants";

/* Using the AccuWeather API and the geo position given as a parameter
  set the current city to the closest city */
export async function setCityWithLocation(
  city,
  position,
  handleSetCity,
  favCities
) {
  //basic check if postion is vaild
  if (position.coords.latitude) {
    const positionQuery = queryString.stringify({
      q: position.coords.latitude + "," + position.coords.longitude
    });
    fetch(`${GEOPOSITION_SEARCH_URL}?apikey=${API_KEY}&${positionQuery}`) //api request
      .then(res => res.json())
      .then(res => {
        //city wasn't found
        if (!res.Key) throw new Error("city wasn't found");
        //city was found set city as a neighbor city
        getNeighborByKey(city, res.Key, handleSetCity, favCities); //support function
      })
      .catch(err => {
        console.log("Error at setCityWithLocation");
        console.log(err);
      });
  }
}

/* Using the AccuWeather API and the location key given as a parameter
  set the current city of the app to the closest city */
async function getNeighborByKey(city, locationKey, handleSetCity, favCities) {
  //check for vaild location
  if (locationKey) {
    fetch(`${CITY_NEIGHBORS_URL + locationKey}?apikey=${API_KEY}`) //api request
      .then(res => res.json())
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
