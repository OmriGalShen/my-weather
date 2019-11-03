import queryString from "query-string";

export async function setCityWithLocation(
  API_KEY,
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
      `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&${positionQuery}`
    );
    res
      .json()
      .then(res => {
        //city wasn't found
        if (!res.Key) throw new Error("city wasn't found");
        //city was found
        getNeighborByKey(API_KEY, city, res.Key, handleSetCity, favCities);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
export async function getNeighborByKey(
  API_KEY,
  city,
  cityKey,
  handleSetCity,
  favCities
) {
  if (cityKey) {
    const res = await fetch(
      `https://dataservice.accuweather.com/locations/v1/cities/neighbors/${cityKey}?apikey=${API_KEY}`
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
        newCity.name = res[0].EnglishName;
        newCity.country = res[0].Country.EnglishName;
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
      });
  }
}
