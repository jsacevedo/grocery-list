import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

// Import Components
import FormInput from '../components/FormInput';

// import Styles
import styles from '../styles/Home.module.scss';

const Home = () => {
  const [recipeName, setRecipeName] = useState({ recipe: '' });
  const [ingredientsList, setIngredientsList] = useState([{ ingredient: '' }]);

  const handleChange = (event, index) => {
    const { name, value } = event.target;

    const ingredients = [...ingredientsList];
    ingredients[index][name] = value;
    setIngredientsList(ingredients);
  };

  const recipeChange = (event) => {
    setRecipeName({ ...recipeName, [event.target.name]: event.target.value });
  };

  const removeIngredient = (index) => {
    const ingredients = [...ingredientsList];
    ingredients.splice(index, 1);
    setIngredientsList(ingredients);
  };

  const addIngredient = () => {
    setIngredientsList([...ingredientsList, { ingredient: '' }]);
  };

  const createNewRecipe = (event) => {
    event.preventDefault();

    console.log(`Recipe Name: `, recipeName);
    console.log(`Ingredients: `, ingredientsList);
  };

  return (
    <>
      <form onSubmit={createNewRecipe}>
        <div className={styles.input}>
          <label htmlFor="recipe-name">What are you cooking?</label>
          <input
            id={styles.recipeName}
            type="text"
            name="recipe"
            value={recipeName.recipe}
            onChange={recipeChange}
          />
        </div>

        {ingredientsList.map((x, index) => {
          return (
            <div className="ingredient" key={`${x}-${index}`}>
              <FormInput
                value={x.ingredient}
                onChange={(event) => handleChange(event, index)}
              />
              {ingredientsList.length !== 1 && (
                <button type="button" onClick={() => removeIngredient(index)}>
                  Remove Ingredient
                </button>
              )}
              {ingredientsList.length - 1 === index && (
                <button type="button" onClick={addIngredient}>
                  Add Ingredient
                </button>
              )}
            </div>
          );
        })}
        <button type="submit">Create Recipe</button>
      </form>
    </>
  );
};

export default Home;
