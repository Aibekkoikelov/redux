import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";
const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
};
const heroesAdapter = createEntityAdapter();


export const fetchHeroes = createAsyncThunk("heroes/fetchHeroes",  async () => {
        const {request} = useHttp();
        return await request("http://localhost:3001/heroes");
    }
);


const heroSlice = createSlice({
  // данный метод позволяет соеденить actioncreator и reducer и не беспокоится о мутабельности данных
  name: "heroes",
  initialState,
  reducers: {
    heroesFetching: (state) => {
      state.heroesLoadingStatus = "loading";
    },
    heroesFetched: (state, action) => {
      state.heroesLoadingStatus = "idle";
      state.heroes = action.payload;
    },
    heroesFetchingError: (state) => {
      state.heroesLoadingStatus = "error";
    },
    heroCreated: (state, action) => {
      state.heroes.push(action.payload);
    },
    heroesDelete: (state, action) => {
      state.heroes = state.heroes.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, (state) => {
        state.heroesLoadingStatus = "loading";
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.heroesLoadingStatus = "idle";
        state.heroes = action.payload;
      })
      .addCase(fetchHeroes.rejected, (state) => {
        state.heroesLoadingStatus = "error";
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = heroSlice;
export default reducer;
export const { heroesFetching,
   heroesFetched,heroesFetchingError,heroCreated,heroesDelete
} = actions