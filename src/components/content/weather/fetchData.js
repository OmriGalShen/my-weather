import queryString from "query-string";
import { getWeatherImage } from "../../weatherImages/weatherImages";

async function setCityInfo(API_KEY, cityText, setCity) {
  if (cityText) {
    const cityTextQuery = queryString.stringify({ q: cityText });
    const res = await fetch(
      `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&${cityTextQuery}`
    );
    res
      .json()
      .then(res => {
        const newCity = {
          key: res[0].Key,
          name: res[0].LocalizedName,
          country: res[0].Country.LocalizedName
        };
        setCity(newCity);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

async function setCurrentWeather(API_KEY, setCityData, cityKey) {
  const res = await fetch(
    `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}.json?apikey=${API_KEY}`
  );
  res
    .json()
    .then(res => {
      setCityData(res[0]);
    })
    .catch(err => console.log);
}
async function setDailyForecasts(API_KEY, setDays, cityKey) {
  const res = await fetch(
    `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}.json?apikey=${API_KEY}`
  );
  res
    .json()
    .then(res => {
      forcatsToDays(res, setDays);
    })
    .catch(err => console.log);
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

const forcatsToDays = (data, setDays) => {
  if (data.DailyForecasts) {
    const dailyForecasts = data.DailyForecasts;
    let myList = [];
    for (let i = 0; i < dailyForecasts.length; i++) {
      let dayName = new Date(dailyForecasts[i].Date);
      myList.push({
        id: i,
        image: getWeatherImage(dailyForecasts[i].Day.Icon),
        name: getWeekDayName(dayName),
        tempMin: dailyForecasts[i].Temperature.Minimum.Value,
        tempMax: dailyForecasts[i].Temperature.Maximum.Value
      });
    }
    setDays(myList);
  }
};

export { setDailyForecasts, setCurrentWeather, setCityInfo };
