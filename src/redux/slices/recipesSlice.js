import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  addRecipeThunk,
  fetchOwnRecipesThunk,
  fetchRecipeByIdThunk,
  fetchRecipesThunk,
} from "../operations/recipesOperation";

const initialState = {
  recipesList: [],
  filters: {
    categories: "",
    ingredients: "",
    search: "",
  },
  recipeDetails: null,
  ownRecipes: [],
  isLoading: false,
  error: null,

  meta: {
    totalItems: 0,
    page: 1,
    perPage: 12,
    hasMore: true,
  },
};

const recipesReducer = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setCategory: (state, { payload }) => {
      state.filters.categories = payload;
    },
    setIngredient: (state, { payload }) => {
      state.filters.ingredients = payload;
    },
    setSearch: (state, { payload }) => {
      state.filters.search = payload;
    },
    resetFilters: (state) => {
      state.filters.categories = "";
      state.filters.ingredients = "";
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(addRecipeThunk.fulfilled, (state, { payload }) => {
        state.recipes.push(payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchRecipeByIdThunk.fulfilled, (state, { payload }) => {
        state.recipeDetails = payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchOwnRecipesThunk.fulfilled, (state, { payload }) => {
        state.ownRecipes = payload.items;
        state.meta.totalItems = payload.totalItems;
        state.meta.page = payload.page;
        state.meta.hasMore = payload.data.items.length === state.perPage;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchRecipesThunk.fulfilled, (state, { payload }) => {
        state.recipesList = payload.data.items;
        state.meta = {
          totalItems: payload.data.totalItems,
          page: payload.data.page,
          perPage: payload.data.perPage,
          hasMore: payload.data.hasNextPage,
        };
        state.isLoading = false;
        state.error = false;
      })
      .addMatcher(
        isAnyOf(
          fetchRecipesThunk.pending,
          addRecipeThunk.pending,
          fetchRecipeByIdThunk.pending,
          fetchOwnRecipesThunk.pending
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchRecipesThunk.rejected,
          addRecipeThunk.rejected,
          fetchRecipeByIdThunk.rejected,
          fetchOwnRecipesThunk.rejected
        ),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        }
      ),
});

export const { setCategory, setIngredient, setSearch, resetFilters } =
  recipesReducer.actions;
export default recipesReducer.reducer;
