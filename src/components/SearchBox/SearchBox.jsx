import { useState } from "react";
import css from "../SearchBox/SearchBox.module.css";
import { setSearch } from "../../redux/slices/recipesSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectFilters } from "../../redux/selectors/recipesSelector";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const { search } = useSelector(selectFilters);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      dispatch(setSearch(""));
    }

    dispatch(setSearch(query.trim()));
    setQuery("");
  };

  return (
    <form className={css.search} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search recipes"
        value={query}
        onChange={handleInputChange}
        className={css.inputSearchBox}
      />
      {search === "" ? (
        <button type="submit" className={css.buttonSearchBox}>
          Search
        </button>
      ) : (
        <button type="submit" className={css.buttonSearchBox}>
          Reset search
        </button>
      )}
    </form>
  );
};

export default SearchBox;
