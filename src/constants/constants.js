/* This site uses the AccuWeather RESTful API at 'https://developer.accuweather.com/'  */

export const API_KEY = "iDXWugGSFTTMGB6edlzafPA0GuLh4fYo"; //need to be hidden on production

// api urls
export const AUTOCOMPLETE_URL =
  "https://dataservice.accuweather.com/locations/v1/cities/autocomplete";
export const CURRENT_CONDITION_URL =
  "https://dataservice.accuweather.com/currentconditions/v1/";
export const FIVE_DAILY_URL =
  "https://dataservice.accuweather.com/forecasts/v1/daily/5day/";
export const GEOPOSITION_SEARCH_URL =
  "https://dataservice.accuweather.com/locations/v1/cities/geoposition/search";
export const CITY_NEIGHBORS_URL =
  "https://dataservice.accuweather.com/locations/v1/cities/neighbors/";
//CORS proxy to get around “No Access-Control-Allow-Origin header”
export const PROXY_URL = "https://omri-cors-everywhere.herokuapp.com/";

// default city - tel aviv
export const DEFAULT_CITY = {
  id: "215854",
  name: "Tel Aviv",
  country: "Israel",
  isFavorite: true
};

//default favorite cities list
export const DEFAULT_FAV_CITIES = [
  DEFAULT_CITY,
  {
    id: "213225",
    name: "Jerusalem",
    country: "Israel",
    isFavorite: true
  }
];
