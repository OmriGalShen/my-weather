export const favoritesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_FAV":
      let cityToAdd = { ...action.city, isFavorite: true };
      return [...state, cityToAdd];
    case "REMOVE_FAV":
      return state.filter(favCity => favCity.id !== action.city.id);
    default:
      throw new Error();
  }
};

export const currentCityReducer = (state, action) => {
  switch (action.type) {
    case "REPLACE":
      return { ...action.newCity };
    case "MAKE_FAV":
      return { ...state, isFavorite: true };
    case "UNMAKE_FAV":
      return { ...state, isFavorite: false };
    default:
      throw new Error();
  }
};
