const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
  filters: [],
  activeFilter: "all",
  filteredHeroes: [],
  filtersLoadingStatus: "idle"
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "HEROES_FETCHING":
        return {
          ...state,
          heroesLoadingStatus: "loading",
        };
      case "HEROES_FETCHED":
        return {
          ...state,
          heroes: action.payload,
          heroesLoadingStatus: "idle",
        };
      case "HEROES_FETCHING_ERROR":
        return {
          ...state,
          heroesLoadingStatus: "error",
        };
      case "HEROES_DELETE":
        
        return {
          ...state,
          heroes: state.heroes.filter((item) => item.id !== action.payload)
         
        };
      case "FILTER_FETCHED":
        return {
          ...state,
          filters: action.payload,
          filtersLoadingStatus: "idle"
        };
      case "CHANGE_ACTIVE_FILTER":
        return {
          ...state,
          activeFilter: action.payload,
        };
      case "HERO_CREATED":
        const newItemHeroes = [...state.heroes, action.payload];
        return {
          ...state,
          heroes: newItemHeroes
        };
      case "FILTERS_FETCHING":
        return {
          ...state,
          filtersLoadingStatus: "loading",
        };
      case "FILTERS_FETCHING_ERROR":
        return {
          ...state,
          filtersLoadingStatus: "error",
        };

      default:
        return state;
    }
}

export default reducer;