import queryString from "query-string";
import { getWeatherImage } from "../../weatherImages/weatherImages";
import {
  AUTOCOMPLETE_URL,
  CURRENT_CONDITION_URL,
  FIVE_DAILY_URL,
  API_KEY
} from "../../constants/constants";

async function setCityInfo(
  cityText,
  city,
  handleSetCity,
  favCities,
  displayError
) {
  if (cityText.length > 0) {
    const cityTextQuery = queryString.stringify({ q: cityText });
    const res = await fetch(
      `${AUTOCOMPLETE_URL}?apikey=${API_KEY}&${cityTextQuery}`
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
        console.log("Error at setCityInfo");
        console.log(err);
        displayError("City wasn't found");
      });
  }
}

async function setCurrentWeather(handleSetCityForecast, cityKey, displayError) {
  const res = await fetch(
    `${CURRENT_CONDITION_URL}${cityKey}.json?apikey=${API_KEY}`
  );
  res
    .json()
    .then(res => {
      if (!res[0]) throw new Error("error: problem fatching current weather");
      handleSetCityForecast(res[0]);
    })
    .catch(err => {
      console.log("Error at setCurrentWeather");
      console.log(err);
      displayError("error: problem fatching current weather");
    });
}
async function setDailyWeather(isMetric, handleSetDays, cityKey, displayError) {
  const res = await fetch(`${FIVE_DAILY_URL}${cityKey}.json?apikey=${API_KEY}`);
  res
    .json()
    .then(res => {
      if (!res) throw new Error("error: problem fatching daily forecasts");
      forcatsToDays(res, handleSetDays, isMetric);
    })
    .catch(err => {
      console.log("Error at setDailyWeather");
      console.log(err);
      displayError("error: problem fatching daily forecasts");
    });
}

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

const convertToCorrectUnit = (tempValue, tempUnit, isMetric) => {
  if (tempUnit === "C" && !isMetric) tempValue = celsiusToFahrenheit(tempValue);
  else if (tempUnit === "F" && isMetric)
    tempValue = fahrenheitToCelsius(tempValue);
  return tempValue;
};

const forcatsToDays = (data, handleSetDays, isMetric) => {
  if (data.DailyForecasts) {
    const dailyForecasts = data.DailyForecasts;
    let myList = [];
    for (let i = 0; i < dailyForecasts.length; i++) {
      let tempUnit = "C";
      if (dailyForecasts[i].Temperature.Maximum.Unit === "F") tempUnit = "F";
      let tempMin = dailyForecasts[i].Temperature.Minimum.Value;
      let tempMax = dailyForecasts[i].Temperature.Maximum.Value;
      tempMin = convertToCorrectUnit(tempMin, tempUnit, isMetric);
      tempMax = convertToCorrectUnit(tempMax, tempUnit, isMetric);
      let dayName = new Date(dailyForecasts[i].Date);
      myList.push({
        id: i,
        image: getWeatherImage(dailyForecasts[i].Day.Icon),
        name: getWeekDayName(dayName),
        tempMin: Math.round(tempMin),
        tempMax: Math.round(tempMax)
      });
    }
    handleSetDays(myList);
  }
};

const autoCompleteList = async (cityName, handleSetFilteredCities) => {
  if (cityName.length) {
    const cityNameQuery = queryString.stringify({ q: cityName });
    const res = await fetch(
      `${AUTOCOMPLETE_URL}?apikey=${API_KEY}&${cityNameQuery}`
    );
    res
      .json()
      .then(res => {
        //autocomplete found
        if (res[0].LocalizedName) handleSetFilteredCities(res);
      })
      .catch(err => {
        console.log("Error at autoCompleteList");
        console.log(err);
      });
  }
};

export { setCurrentWeather, setDailyWeather, setCityInfo, autoCompleteList };
