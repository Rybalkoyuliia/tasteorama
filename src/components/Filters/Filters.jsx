import React, { useState } from "react";
import s from "./Filters.module.css";
import { useSelector } from "react-redux";
import {
  selectFilters,
  selectMetaPag,
} from "../../redux/selectors/recipesSelector";
import DropDown from "./DropDown/DropDown";

const Filters = () => {
  const meta = useSelector(selectMetaPag);
  const { search } = useSelector(selectFilters);
  const [activeDrop, setActiveDrop] = useState(false);
  const togleDrop = () => {
    setActiveDrop((prev) => !prev);
  };
  const formatSearchText = (text) => {
    return text
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const formatedSearch = formatSearchText(search);

  return (
    <div className={s.filter_container}>
      {search === "" ? (
        <h2 className={s.title}>Recipes</h2>
      ) : (
        <h2 className={s.title}>Search Results for “{formatedSearch}”</h2>
      )}
      <div className={s.submain_container}>
        <p className={s.recipes_count}>
          <span>{meta.totalItems}</span>
          {meta.totalItems === 1 ? " recipe" : " recipes"}
        </p>
        <button className={s.filter_button} onClick={togleDrop}>
          <span>Filters</span>
          {activeDrop ? (
            <svg width="24" height="24" fill="none" stroke="black">
              <use href="/sprite.svg#icon-close" />
            </svg>
          ) : (
            <svg width="24" height="24" fill="none" stroke="black">
              <use href="/sprite.svg#icon-filter" />
            </svg>
          )}
        </button>
      </div>
      {activeDrop && <DropDown />}
    </div>
  );
};

export default Filters;
