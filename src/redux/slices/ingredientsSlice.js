import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  fetchIngredientsThunk,
  fetchUsedIngredientsThunk,
} from "../operations/ingredientsOperations";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const ingredientsReducer = createSlice({
  name: "ingredients",
  initialState,
  extraReducers: (builder) =>
    builder
      .addMatcher(
        isAnyOf(
          fetchIngredientsThunk.pending,
          fetchUsedIngredientsThunk.pending
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchIngredientsThunk.fulfilled,
          fetchUsedIngredientsThunk.fulfilled
        ),
        (state, { payload }) => {
          state.items = payload;
          state.isLoading = false;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchIngredientsThunk.rejected,
          fetchUsedIngredientsThunk.rejected
        ),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        }
      ),
});

export default ingredientsReducer.reducer;
