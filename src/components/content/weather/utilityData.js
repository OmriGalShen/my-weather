import queryString from "query-string";
import { getWeatherImage } from "../../weatherImages/weatherImages";

async function setCityInfo(
  API_KEY,
  cityText,
  city,
  handleSetCity,
  favCities,
  displayError
) {
  if (cityText.length > 0) {
    const cityTextQuery = queryString.stringify({ q: cityText });
    const res = await fetch(
      `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&${cityTextQuery}`
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
        console.log(err);
        displayError("City wasn't found");
      });
  }
}

async function setCurrentWeather(
  API_KEY,
  handleSetCityForecast,
  cityKey,
  displayError
) {
  const res = await fetch(
    `https://dataservice.accuweather.com/currentconditions/v1/${cityKey}.json?apikey=${API_KEY}`
  );
  res
    .json()
    .then(res => {
      if (!res[0]) throw new Error("error: problem fatching current weather");
      handleSetCityForecast(res[0]);
    })
    .catch(err => {
      displayError("error: problem fatching current weather");
      console.log(err);
    });
}
async function setDailyWeather(
  API_KEY,
  isMetric,
  handleSetDays,
  cityKey,
  displayError
) {
  const res = await fetch(
    `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}.json?apikey=${API_KEY}`
  );
  res
    .json()
    .then(res => {
      if (!res) throw new Error("error: problem fatching daily forecasts");
      forcatsToDays(res, handleSetDays, isMetric);
    })
    .catch(err => {
      displayError("error: problem fatching daily forecasts");
      console.log(err);
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

const forcatsToDays = (data, handleSetDays, isMetric) => {
  if (data.DailyForecasts) {
    const dailyForecasts = data.DailyForecasts;
    let myList = [];
    for (let i = 0; i < dailyForecasts.length; i++) {
      let tempMin, tempMax;
      if (dailyForecasts[i].Temperature.Maximum.Unit === "F") {
        tempMin = dailyForecasts[i].Temperature.Minimum.Value;
        tempMax = dailyForecasts[i].Temperature.Maximum.Value;
        if (isMetric) {
          tempMin = fahrenheitToCelsius(tempMin);
          tempMax = fahrenheitToCelsius(tempMax);
        }
      } else {
        tempMin = dailyForecasts[i].Temperature.Minimum.Value;
        tempMax = dailyForecasts[i].Temperature.Maximum.Value;
        if (!isMetric) {
          tempMin = celsiusToFahrenheit(tempMin);
          tempMax = celsiusToFahrenheit(tempMax);
        }
      }
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

const autoCompleteList = async (API_KEY, cityName, handleSetFilteredCities) => {
  if (cityName.length) {
    const cityNameQuery = queryString.stringify({ q: cityName });
    const res = await fetch(
      `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&${cityNameQuery}`
    );
    res
      .json()
      .then(res => {
        //autocomplete found
        if (res[0].LocalizedName) handleSetFilteredCities(res);
      })
      .catch(err => {
        console.log("autoCompleteList:" + err);
      });
  }
};

export { setCurrentWeather, setDailyWeather, setCityInfo, autoCompleteList };
