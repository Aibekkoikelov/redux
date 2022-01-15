import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
  filters: [],
  activeFilter: "all",
  filtersLoadingStatus: "idle",
};

export const fetchFilter = createAsyncThunk(
   "filter/fetchFilter",
    () => {
  const { request } = useHttp();
   return request(`http://localhost:3001/filters`)
});

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
   //   filtersFetching: (state) => {
   //     state.filtersLoadingStatus = "loading";
   //   },
   //   filterFetched: (state, action) => {
   //     state.filters = action.payload;
   //     state.filtersLoadingStatus = "idle";
   //   },
   //   filtersFetchingError: (state) => {
   //     state.filtersLoadingStatus = "error";
   //   },
    changeActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilter.pending, (state) => {
        state.filtersLoadingStatus = "loading";
      })
      .addCase(fetchFilter.fulfilled, (state, action) => {
        state.filtersLoadingStatus = "idle";
        state.filters = action.payload;
      })
      .addCase(fetchFilter.rejected, (state) => {
        state.filtersLoadingStatus = "error";
      })
      .addDefaultCase(() => {});
  },
});
const { actions, reducer } = filterSlice;

export default reducer;
export const {
   filtersFetching,
   filterFetched,
   filtersFetchingError,
   changeActiveFilter
} = actions;