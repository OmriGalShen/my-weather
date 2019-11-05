/* This site uses the AccuWeather RESTful API at 'https://developer.accuweather.com/' 
  This file contains support functions to the 'Weather' component,
  to access the API data and return/use the needed information*/

import queryString from "query-string"; //used to convert string to get url query
import { getWeatherImage } from "../../weatherImages/weatherImages";
import {
  AUTOCOMPLETE_URL,
  CURRENT_CONDITION_URL,
  FIVE_DAILY_URL,
  API_KEY
} from "../../../constants/constants";

/* Using the AccuWeather API and the user input given as a parameter
  autocomplete to find the city and
  set the current city of the app */
export async function setCityInfo(
  userInput,
  city,
  handleSetCity,
  favCities,
  displayError
) {
  if (userInput) {
    const userInputQuery = queryString.stringify({ q: userInput });
    fetch(`${AUTOCOMPLETE_URL}?apikey=${API_KEY}&${userInputQuery}`) //api request
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
        handleSetCity(newCity); // set new city
      })
      .catch(err => {
        // console.log("Error at setCityInfo");
        // console.log(err);
        displayError("City wasn't found"); //displayed for user
      });
  }
}

/* Using the AccuWeather API and the city key given as a parameter
  set city current forecast  */
export async function setCurrentWeather(
  handleSetCityForecast,
  cityKey,
  displayError
) {
  fetch(`${CURRENT_CONDITION_URL}${cityKey}.json?apikey=${API_KEY}`) //api request
    .then(res => res.json())
    .then(res => {
      //check for respone
      if (!res[0]) throw new Error("error: problem fetching current weather");
      handleSetCityForecast(res[0]); //set city forecast data
    })
    .catch(err => {
      // console.log("Error at setCurrentWeather");
      // console.log(err);
      displayError("error: problem fetching current weather"); //displayed for user
    });
}

/* Using the AccuWeather API and the city key given as a parameter
  set 5 days forecast  */
export async function setDailyWeather(
  isMetric,
  handleSetDailyForecast,
  cityKey,
  displayError
) {
  fetch(`${FIVE_DAILY_URL}${cityKey}.json?apikey=${API_KEY}`) //api request
    .then(res => res.json())
    .then(res => {
      //check for respone
      if (!res) throw new Error("error: problem fetching daily forecasts");
      forcatsToDays(res, handleSetDailyForecast, isMetric); // using the api data to set DailyForecast
    })
    .catch(err => {
      // console.log("Error at setDailyWeather");
      // console.log(err);
      displayError("error: problem fetching daily forecasts"); //displayed for user
    });
}

/* After daily forecast data was received this function process the data 
  and from the useful information create a list of the daily forecast  */
const forcatsToDays = (data, handleSetDailyForecast, isMetric) => {
  //check for vaild data
  if (data.DailyForecasts) {
    const dailyForecasts = data.DailyForecasts;
    let myList = []; // initite the retured list
    for (let i = 0; i < dailyForecasts.length; i++) {
      let tempUnit = "C";
      if (dailyForecasts[i].Temperature.Maximum.Unit === "F") tempUnit = "F";
      let tempMin = dailyForecasts[i].Temperature.Minimum.Value;
      let tempMax = dailyForecasts[i].Temperature.Maximum.Value;
      //correct temp to correct unit (celsius/Fahrenheit)
      tempMin = correctTempUnit(tempMin, tempUnit, isMetric);
      tempMax = correctTempUnit(tempMax, tempUnit, isMetric);
      //the data Date proprty is string this converst it to date object
      let dayName = new Date(dailyForecasts[i].Date);
      myList.push({
        id: i,
        image: getWeatherImage(dailyForecasts[i].Day.Icon),
        name: getWeekDayName(dayName),
        tempMin: Math.round(tempMin),
        tempMax: Math.round(tempMax)
      });
    }
    handleSetDailyForecast(myList); // set daily foracst to the new list
  }
};

/* Given Date object returns a string repressing the name of the day of the week */
const getWeekDayName = date => {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  return weekday[date.getDay()];
};

const celsiusToFahrenheit = celsius => {
  return (celsius * 9) / 5 + 32;
};
const fahrenheitToCelsius = fahrenheit => {
  return ((fahrenheit - 32) * 5) / 9;
};

const correctTempUnit = (tempValue, tempUnit, isMetric) => {
  if (tempUnit === "C" && !isMetric) tempValue = celsiusToFahrenheit(tempValue);
  else if (tempUnit === "F" && isMetric)
    tempValue = fahrenheitToCelsius(tempValue);
  return tempValue;
};

/* Using the AccuWeather API and the user input given as a parameter
  get as a response a list of autocomplete cities and set filtered cities */
export const autoCompleteList = async (userInput, handleSetFilteredCities) => {
  if (userInput.length > 0) {
    const userInputQuery = queryString.stringify({ q: userInput });
    fetch(`${AUTOCOMPLETE_URL}?apikey=${API_KEY}&${userInputQuery}`) //api request
      .then(res => res.json())
      .then(res => {
        //autocomplete found
        if (!res[0])
          throw new Error("error: problem fetching autocomplete list");
        handleSetFilteredCities(res);
      })
      .catch(err => {
        // console.log("Error at autoCompleteList");
        // console.log(err);
      });
  }
};
