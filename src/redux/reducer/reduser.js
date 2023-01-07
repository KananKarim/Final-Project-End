const initialState = {
  favorites: [],
  value: "",
};

export default function reducer(state = initialState, action) {
  let favorites = [];
  switch (action.type) {
    case "ADD_TO_FAVORITES":
      favorites = [...state.favorites, action.payload.data];

      return {
        ...state,
        favorites: favorites,
      };
    case "SET_ACC":
      return {
        ...state,
        value: action.payload.value,
      };
    default:
      return initialState;
  }
} 