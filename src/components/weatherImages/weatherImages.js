import defaultImage from "../../assets/images/logo-01.png";

const getWeatherImage = iconNumber => {
  let source = defaultImage;
  if (iconNumber >= 1 && iconNumber <= 9)
    source = `https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/0${iconNumber}-s.png`;
  else if (iconNumber >= 10 && iconNumber <= 44)
    source = `https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/${iconNumber}-s.png`;
  return source;
};

export { getWeatherImage };
