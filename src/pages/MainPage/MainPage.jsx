import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipesThunk } from "../../redux/operations/recipesOperation";

import RecipesList from "../../components/RecipesList/RecipesList";
import Banner from "../../components/Banner/Banner";
import css from "./MainPage.module.css";
import {
  selectFilters,
  selectMetaPag,
  selectRecipes,
} from "../../redux/selectors/recipesSelector";
import Filters from "../../components/Filters/Filters";
import { selectRecipesIsLoading } from "../../redux/selectors/recipesSelector";
import Loading from "../../components/Loading/Loading";
import NoRecipes from "../../components/NoRecipes/NoRecipes";
import { fetchCategoriesThunk } from "../../redux/operations/categoriesOperations";
import {
  fetchIngredientsThunk,
  fetchUsedIngredientsThunk,
} from "../../redux/operations/ingredientsOperations";
import Pagination from "../../components/Pagination/Pagination";

export default function MainPage() {
  const dispatch = useDispatch();
  const recipes = useSelector(selectRecipes);
  const isLoading = useSelector(selectRecipesIsLoading);
  const filters = useSelector(selectFilters);
  const meta = useSelector(selectMetaPag);

  useEffect(() => {
    dispatch(fetchRecipesThunk({ page: 1, perPage: 12, ...filters }));
  }, [dispatch, filters]);

  useEffect(() => {
    dispatch(fetchCategoriesThunk());
  }, [dispatch]);

  useEffect(() => {
    if (filters.categories !== "") {
      dispatch(fetchUsedIngredientsThunk(filters.categories));
    } else {
      dispatch(fetchIngredientsThunk());
    }
  }, [dispatch, filters.categories]);

  if (isLoading) return <Loading />;

  return (
    <div className={css.main}>
      <Banner />
      <Filters />
      {recipes.length && !isLoading ? (
        <RecipesList recipes={recipes} />
      ) : (
        <NoRecipes />
      )}
      <Pagination total={meta} filters={filters} />
    </div>
  );
}
