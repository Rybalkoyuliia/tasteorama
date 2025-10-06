import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchIngredientsThunk } from "../../redux/operations/ingredientsOperations";
import {
  selectIngredients,
  selectIngredientsIsLoading,
  selectIngredientsError,
} from "../../redux/selectors/ingredientsSelector";
import { toast } from "react-toastify";
import s from "./IngredientList.module.css";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";

const IngredientList = ({ ingredients }) => {
  const dispatch = useDispatch();
  const allIngredients = useSelector(selectIngredients);
  const isLoading = useSelector(selectIngredientsIsLoading);
  const error = useSelector(selectIngredientsError);

  console.log(ingredients);

  useEffect(() => {
    if (!allIngredients?.length && !isLoading && !error) {
      dispatch(fetchIngredientsThunk());
    }
  }, [dispatch, allIngredients, isLoading, error]);

  useEffect(() => {
    if (error) {
      toast.error(`Failed to load ingredients: ${error}`);
    }
  }, [error]);

  if (isLoading) {
    return <p className={s.loading}>Loading ingredients...</p>;
  }

  if (error) {
    return <p className={s.error}>Error loading ingredients: {error}</p>;
  }

  return (
    <ul className={s.ingredientsContainer}>
      {ingredients.length > 0 ? (
        ingredients.map((ingredient, index) => (
          <li key={index} className={s.ingredientsItem}>
            <RiCheckboxBlankCircleFill className={s.ingredientsIcon} />
            {ingredient.id.name} - {ingredient.measure}
          </li>
        ))
      ) : (
        <li className={s.noIngredients}>No matching ingredients found</li>
      )}
    </ul>
  );
};

export default IngredientList;
