const initialState = {
  filters: [],
  activeFilter: "all",
  filtersLoadingStatus: "idle",
};

const filter = (state = initialState, action) => {
  switch (action.type) {
    case "FILTER_FETCHED":
      return {
        ...state,
        filters: action.payload,
        filtersLoadingStatus: "idle",
      };
    case "CHANGE_ACTIVE_FILTER":
      return {
        ...state,
        activeFilter: action.payload,
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
};

export default filter;
