import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../axiosConfig/Api";

export const fetchRecipesThunk = createAsyncThunk(
  "fetchRecipes",
  async (
    { page = 1, perPage = 12, categories = "", ingredients = "", search = "" },
    thunkAPI
  ) => {
    try {
      const { data } = await API.get("/recipes", {
        params: {
          page,
          perPage,
          categories,
          ingredients,
          search,
        },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addRecipeThunk = createAsyncThunk(
  "createRecipe",
  async (recipe, thunkAPI) => {
    try {
      const { data } = await API.post("/recipes", recipe);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchRecipeByIdThunk = createAsyncThunk(
  "fetchRecipeById",
  async (id, thunkAPI) => {
    try {
      const { data } = await API.get(`/recipes/${id}`);
      return data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return thunkAPI.rejectWithValue({
          status: 404,
          message: "Recipe not found",
        });
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchOwnRecipesThunk = createAsyncThunk(
  "fetchOwnRecipes",
  async (_, thunkAPI) => {
    try {
      const { data } = await API.get("users/own");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
