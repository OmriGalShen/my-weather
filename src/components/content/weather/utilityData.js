/* This site uses the AccuWeather RESTful API at 'https://developer.accuweather.com/' 
  This file contains support functions to the 'Weather' component,
  to access the API data and return/use the needed information*/

import queryString from "query-string"; //used to convert string to get url query
import { getWeatherImage } from "../../weatherImages/weatherImages";
import {
  PROXY_URL,
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
  currentCity,
  dispatchCurrentCity,
  favorites,
  displayError
) {
  if (userInput) {
    const userInputQuery = queryString.stringify({ q: userInput });
    fetch(`${PROXY_URL + AUTOCOMPLETE_URL}?apikey=${API_KEY}&${userInputQuery}`) //api request
      .then(res => res.json())
      .then(res => {
        //city wasn't found
        if (!res[0]) throw new Error("city wasn't found");
        //city was found
        let newCity = { ...currentCity }; //make of copy of the city
        //gives the copy the new data
        newCity.id = res[0].Key;
        newCity.name = res[0].LocalizedName;
        newCity.country = res[0].Country.LocalizedName;
        newCity.isFavorite = false;
        //search if the found city is in favorites
        for (let favCity of favorites) {
          //if found city is in favorites
          if (favCity.id === res[0].Key) {
            newCity.isFavorite = true;
          }
        }
        dispatchCurrentCity({ type: "REPLACE", newCity: newCity }); // set new city
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
  setCityForecast,
  currentCity,
  displayError
) {
  fetch(
    `${PROXY_URL + CURRENT_CONDITION_URL}${
      currentCity.id
    }.json?apikey=${API_KEY}`
  ) //api request
    .then(res => res.json())
    .then(res => {
      //check for respone
      if (!res[0]) throw new Error("error: problem fetching current weather");
      let cityForecast = {
        description: res[0].WeatherText,
        iconNumber: res[0].WeatherIcon,
        tempMetric: res[0].Temperature.Metric.Value,
        tempImperial: res[0].Temperature.Imperial.Value
      };
      setCityForecast(cityForecast); //set city forecast data
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
  setDailyForecast,
  currentCity,
  displayError
) {
  fetch(`${PROXY_URL + FIVE_DAILY_URL}${currentCity.id}.json?apikey=${API_KEY}`) //api request
    .then(res => res.json())
    .then(res => {
      //check for respone
      if (!res) throw new Error("error: problem fetching daily forecasts");
      forcatsToDays(res, setDailyForecast, isMetric); // using the api data to set DailyForecast
    })
    .catch(err => {
      // console.log("Error at setDailyWeather");
      // console.log(err);
      displayError("error: problem fetching daily forecasts"); //displayed for user
    });
}

/* After daily forecast data was received this function process the data 
  and from the useful information create a list of the daily forecast  */
const forcatsToDays = (data, setDailyForecast, isMetric) => {
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
    setDailyForecast([...myList]); // set daily foracst to the new list
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
export const autoCompleteList = async (userInput, setFilteredCities) => {
  if (userInput.length > 0) {
    const userInputQuery = queryString.stringify({ q: userInput });
    fetch(`${PROXY_URL + AUTOCOMPLETE_URL}?apikey=${API_KEY}&${userInputQuery}`) //api request
      .then(res => res.json())
      .then(res => {
        //autocomplete found
        if (!res[0])
          throw new Error("error: problem fetching autocomplete list");
        let cityNameSuggestion = res.map(city => city.LocalizedName);
        cityNameSuggestion = [...new Set(cityNameSuggestion)]; //remove duplicates
        setFilteredCities(cityNameSuggestion);
      })
      .catch(err => {
        // console.log("Error at autoCompleteList");
        // console.log(err);
      });
  }
};
