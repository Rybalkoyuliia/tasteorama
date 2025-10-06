export const selectRecipesIsLoading = (state) => state.recipes.isLoading;
export const selectRecipesError = (state) => state.recipes.error;
export const selectRecipes = (state) => state.recipes.recipesList;
export const selectRecipeDetails = (state) => state.recipes.recipeDetails;
export const selectFilters = (state) => state.recipes.filters;
export const selectOwnRecipes = (state) => state.recipes.ownRecipes;
export const selectMetaPag = (state) => state.recipes.meta;
