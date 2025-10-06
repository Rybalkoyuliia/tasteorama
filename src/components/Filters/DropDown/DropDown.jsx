import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { selectCategories } from "../../../redux/selectors/categoriesSelector";
import { selectIngredients } from "../../../redux/selectors/ingredientsSelector";
import { useOptions } from "../../../hooks/useOptions";
import {
  resetFilters,
  setCategory,
  setIngredient,
} from "../../../redux/slices/recipesSlice";
import { selectFilters } from "../../../redux/selectors/recipesSelector";

const DropDown = () => {
  const categoriesList = useSelector(selectCategories);
  const ingredientsList = useSelector(selectIngredients);

  const { categories, ingredients } = useSelector(selectFilters);

  const dispatch = useDispatch();

  const categoryOptions = useOptions(categoriesList);
  const ingredientOptions = useOptions(ingredientsList);

  const handleChange = (action) => (option) => {
    dispatch(action(option.value));
  };

  const handleReset = (e) => {
    e.preventDefault();
    dispatch(resetFilters());
  };

  return (
    <div>
      <Select
        options={categoryOptions}
        placeholder="Category"
        value={categoryOptions.find((opt) => opt.value === categories) || null}
        onChange={handleChange(setCategory)}
      />
      <Select
        options={ingredientOptions}
        placeholder="Ingredient"
        value={
          ingredientOptions.find((opt) => opt.value === ingredients) || null
        }
        onChange={handleChange(setIngredient)}
      />
      <button onClick={handleReset}> Reset filters</button>
    </div>
  );
};

export default DropDown;
