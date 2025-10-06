import RecipeCard from "../RecipeCard/RecipeCard";
import css from "./RecipesList.module.css";

const RecipesList = ({ recipes: propRecipes }) => {
  return (
    <>
      <ul className={css.recipe_list}>
        {propRecipes.map((recipe) => (
          <li key={recipe._id}>
            <RecipeCard recipe={recipe} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default RecipesList;
