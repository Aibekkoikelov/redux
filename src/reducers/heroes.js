import { createReducer } from "@reduxjs/toolkit";
import { heroesFetching, heroesFetched, heroesFetchingError, heroCreated, heroesDelete } from "../actions";


const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
};

const heroes = createReducer(initialState, builder => {   // новый вариант использования редюсера который использует разные библиотеки
  builder
    .addCase(heroesFetching, state => {
     state.heroesLoadingStatus = "loading"
    })
    .addCase(heroesFetched, (state, action) => {
      state.heroesLoadingStatus = "idle"
      state.heroes = action.payload;
    })
    .addCase(heroesFetchingError, state => {
       state.heroesLoadingStatus = "error"              // данный вариант работает только с redux toolkit и если используется createAction
  })
    .addCase(heroCreated, (state, action) => {
      state.heroes.push(action.payload);
    })
    .addCase(heroesDelete, (state, action) => {
      state.heroes = state.heroes.filter((item) => item.id !== action.payload);
    })
    .addDefaultCase(() => {})
})

// const heroes = (state = initialState, action) => {
//   switch (action.type) {
//     case "HEROES_FETCHING":
//       return {
//         ...state,
//         heroesLoadingStatus: "loading",
//       };  
//     case "HEROES_FETCHED":
//       return {
//         ...state,
//         heroes: action.payload,
//         heroesLoadingStatus: "idle",
//       };
//     case "HEROES_FETCHING_ERROR":           // данный вариант написания без redux toolkit
//       return {
//         ...state,
//         heroesLoadingStatus: "error",
//       };
//     case "HEROES_DELETE":
//       return {
//         ...state,
//         heroes: state.heroes.filter((item) => item.id !== action.payload),
//       };
//     case "HERO_CREATED":
//       const newItemHeroes = [...state.heroes, action.payload];
//       return {
//         ...state,
//         heroes: newItemHeroes,
//       };
//     default:
//       return state;
//   }
// };

export default heroes;
