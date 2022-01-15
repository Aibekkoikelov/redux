import { createAction } from "@reduxjs/toolkit";
import { heroesFetching, heroesFetched, heroesFetchingError } from "../components/heroesList/heroSlice"
import { filtersFetching, filterFetched, filtersFetchingError } from "../components/heroesFilters/filterSlice";
export const fetchHeroes = (request) => (dispatch) => {
   dispatch(heroesFetching());
   request("http://localhost:3001/heroes")
     .then((data) => dispatch(heroesFetched(data)))
     .catch((e) => dispatch(heroesFetchingError()));
}

export const fetchFilter = (request) => (dispatch) => {
  dispatch(filtersFetching());
   request(`http://localhost:3001/filters`)
      .then((data) => dispatch(filterFetched(data)))
      .catch(() => dispatch(filtersFetchingError()));
}

// export const heroesFetching = createAction("HEROES_FETCHING"); // использования createAction из reduxtoolkit
// export const heroesFetched = createAction("HEROES_FETCHED"); // он сам передает зависимости только одну
// export const heroesFetchingError = createAction("HEROES_FETCHING_ERROR");
// export const heroesDelete = createAction("HEROES_DELETE");
// export const heroCreated = createAction("HERO_CREATED");
// export const filterFetched = createAction("FILTER_FETCHED");
// export const changeActiveFilter = createAction("CHANGE_ACTIVE_FILTER");
// export const filteredHeroes = createAction("FILTERED_HEROES");
// export const filtersFetching = createAction("FILTERS_FETCHING");
// export const filtersFetchingError = createAction("FILTERS_FETCHING_ERROR");

// export const heroesFetching = () => {
//     return {
//         type: 'HEROES_FETCHING'
//     }
// }
// export const heroesFetched = (heroes) => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload: heroes
//     }
// }
// export const heroesFetchingError = () => {
//   return {
//     type: "HEROES_FETCHING_ERROR",
//   };
// };
// export const heroesDelete = (id) => {
//   return {
//     type: "HEROES_DELETE",
//     payload: id,
//   };
// };
// export const filterFetched = (data) => {
//     return {
//       type: "FILTER_FETCHED",
//       payload: data
//     };
// }

// export const changeActiveFilter = (name) => {
//     return {
//       type: "CHANGE_ACTIVE_FILTER",
//       payload: name
//     };
// }
// export const heroCreated = (data) => {
//   return {
//     type: "HERO_CREATED",
//     payload: data
//   };
// };
// export const filteredHeroes = (data) => {
//   return {
//     type: "FILTERED_HEROES",
//     payload: data
//   };
// };
// export const filtersFetching = () => {
//   return {
//     type: "FILTERS_FETCHING",
//   };
// };

// export const filtersFetchingError = () => {
//   return {
//     type: "FILTERS_FETCHING_ERROR",
//   };
// };