import React from "react";
import { useDispatch } from "react-redux";
import { resetFilters, setSearch } from "../../redux/slices/recipesSlice";
import s from "./NoRecipes.module.css";

const NoRecipes = () => {
  const dispatch = useDispatch();
  const onReset = () => {
    dispatch(resetFilters());
    dispatch(setSearch(""));
  };
  return (
    <div className={s.container}>
      <h2 className={s.reset_message}>
        We’re sorry! We were not able to find a match.
      </h2>
      <button className={s.reset_button} type="button" onClick={onReset}>
        Reset search and filters
      </button>
    </div>
  );
};

export default NoRecipes;
